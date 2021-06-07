using _1_Domain;
using _1_Domain.Enum;
using _3_Application.Dtos.Common;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class EnquiryRepo : BaseRepository<Enquiry>, IEnquiryRepo
    {
        public EnquiryRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Enquiry> GetEnquiryAsync(int id, Customer customer)
        {
            var duraformEnquiry = await _dbSet.FindAsync(id);

            if (duraformEnquiry == null) return null;

            switch (customer)
            {
                case CabinetMaker cabinetMaker:
                    return duraformEnquiry.CustomerId == cabinetMaker.Id ? duraformEnquiry : null;
                case Distributor distributor:
                    return duraformEnquiry.CustomerId == distributor.Id || duraformEnquiry.ManagerId == distributor.Id ? duraformEnquiry : null;
                case Manufacturer _:
                    return duraformEnquiry;
                default:
                    return null;
            }
        }

        public async Task<List<Enquiry>> GetEnquiriesForInvoicingAsync()
        {
            var enquiries = new List<Enquiry>();

            var duraforms = await _dbSet.OfType<DuraformEnquiry>()
                .Where(x => x.DuraformProcesses.Any(y => (y.DuraformProcessType == DuraformProcessEnum.Delivering || y.DuraformProcessType == DuraformProcessEnum.PickingUp) && y.EndTime.HasValue))
                .Where(x => x.Invoice == null)
                .ToListAsync();

            enquiries.AddRange(duraforms);

            return enquiries;
        }

        public async Task<List<DuraformEnquiry>> GetDuraformDraftsAsync(ApplicationUser creator)
        {
            return await _dbSet.OfType<DuraformEnquiry>()
                .Where(x => x.EnquiryType == EnquiryTypeEnum.Draft && x.CreatorId == creator.Id).ToListAsync();
        }

        public async Task<ItemList<DuraformEnquiry>> GetDuraformOrdersAsync(int? searchCustomerId, ApplicationUser currentUser, DuraformProcessEnum? status, string search, string sortBy, string direction, int page, int take)
        {
            var query = _dbSet.OfType<DuraformEnquiry>().Where(x => x.EnquiryType == EnquiryTypeEnum.Order && x.OrderedDate.HasValue);

            switch (currentUser.Customer)
            {
                case CabinetMaker cabinetMaker:
                    query = query.Where(x => x.CustomerId == cabinetMaker.Id);
                    break;
                case Distributor distributor:
                    query = searchCustomerId.HasValue ? query.Where(x => x.CustomerId == searchCustomerId.Value && x.ManagerId == distributor.Id) :
                                                        query.Where(x => x.ManagerId == distributor.Id || x.CustomerId == distributor.Id);
                    break;
                case Manufacturer _:
                    if (searchCustomerId.HasValue)
                        query = query.Where(x => x.CustomerId == searchCustomerId.Value);
                    break;
            }

            switch (status)
            {
                case null:
                    break;
                case DuraformProcessEnum.Ordered:
                    query = query.Where(x => !x.ApprovedDate.HasValue);
                    break;
                case DuraformProcessEnum.PreRoute:
                    query = query.Where(x => x.DuraformProcesses.Any(y => y.IsCurrent && y.DuraformProcessType == DuraformProcessEnum.PreRoute));
                    break;
                case DuraformProcessEnum.Routed:
                    query = query.Where(x => x.DuraformProcesses.Any(y => y.IsCurrent && y.EndTime.HasValue && y.DuraformProcessType == DuraformProcessEnum.Routing));
                    break;
                case DuraformProcessEnum.Pressed:
                    query = query.Where(x => x.DuraformProcesses.Any(y => y.IsCurrent && y.EndTime.HasValue && y.DuraformProcessType == DuraformProcessEnum.Pressing));
                    break;
                case DuraformProcessEnum.Cleaned:
                    query = query.Where(x => x.DuraformProcesses.Any(y => y.IsCurrent && y.EndTime.HasValue && y.DuraformProcessType == DuraformProcessEnum.Cleaning));
                    break;
                case DuraformProcessEnum.Packed:
                    query = query.Where(x => x.DuraformProcesses.Any(y => y.IsCurrent && y.EndTime.HasValue && y.DuraformProcessType == DuraformProcessEnum.Packing));
                    break;
                case DuraformProcessEnum.PickedUp:
                    query = query.Where(x => x.DuraformProcesses.Any(y => y.IsCurrent && y.EndTime.HasValue && y.DuraformProcessType == DuraformProcessEnum.PickingUp));
                    query = query.Where(x => x.Invoice == null);
                    break;
                case DuraformProcessEnum.Delivered:
                    query = query.Where(x => x.DuraformProcesses.Any(y => y.IsCurrent && y.EndTime.HasValue && y.DuraformProcessType == DuraformProcessEnum.Delivering));
                    query = query.Where(x => x.Invoice == null);
                    break;
                case DuraformProcessEnum.Invoiced:
                    query = query.Where(x => x.Invoice != null);
                    break;
                default:
                    query = query.Where(x => x.DuraformProcesses.Any(y => y.IsCurrent && !y.EndTime.HasValue && y.DuraformProcessType == status));
                    break;
            }

            return await GetSortedDuraformEnquiryListAsync(search, sortBy, direction, page, take, query);
        }

        private static async Task<ItemList<DuraformEnquiry>> GetSortedDuraformEnquiryListAsync(string search, string sortBy, string direction, int page, int take,
            IQueryable<DuraformEnquiry> query)
        {
            if (!string.IsNullOrEmpty(search))
                query = query.Where(x => x.CustomerReference.Contains(search) || x.Customer.Name.Contains(search));

            switch (sortBy)
            {
                case "customerReference":
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.CustomerReference)
                        : query.OrderByDescending(x => x.CustomerReference);
                    break;
                case "type":
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.IsRoutingOnly)
                        : query.OrderByDescending(x => x.IsRoutingOnly);
                    break;
                case "customer":
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.Customer.Name)
                        : query.OrderByDescending(x => x.Customer.Name);
                    break;
                case "description":
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.DuraformDesign.Name)
                        : query.OrderByDescending(x => x.DuraformDesign.Name);
                    break;
                case "orderedDate":
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.OrderedDate)
                        : query.OrderByDescending(x => x.OrderedDate);
                    break;
                default:
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.Id)
                        : query.OrderByDescending(x => x.Id);
                    break;
            }

            var totalCount = await query.CountAsync();
            var orders = await query.Skip(page * take).Take(take).ToListAsync();

            var itemList = new ItemList<DuraformEnquiry>
            {
                Items = orders,
                TotalItemCount = totalCount
            };

            return itemList;
        }
    }
}