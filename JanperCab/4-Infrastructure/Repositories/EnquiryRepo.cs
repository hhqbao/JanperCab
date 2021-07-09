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
            var enquiry = await _dbSet.FindAsync(id);

            if (enquiry == null) return null;

            switch (customer)
            {
                case CabinetMaker cabinetMaker:
                    return enquiry.CustomerId == cabinetMaker.Id ? enquiry : null;
                case Distributor distributor:
                    return enquiry.CustomerId == distributor.Id || enquiry.ManagerId == distributor.Id ? enquiry : null;
                case Manufacturer _:
                    return enquiry;
                default:
                    return null;
            }
        }

        public async Task<List<Enquiry>> GetEnquiriesForInvoicingAsync()
        {
            var enquiries = new List<Enquiry>();

            var duraforms = await _dbSet.OfType<DuraformEnquiry>()
                .Where(x => x.Processes.Any(y => y.ProcessType == ProcessTypeEnum.Delivering && y.EndTime.HasValue))
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

        public async Task<ItemList<Enquiry>> GetOrdersAsync(int? searchCustomerId, ApplicationUser currentUser, ProcessTypeEnum? status, string search, string sortBy, string direction, int page, int take)
        {
            var query = _dbSet.Where(x => x.EnquiryType == EnquiryTypeEnum.Order && x.OrderedDate.HasValue);

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
                case ProcessTypeEnum.Ordered:
                    query = query.Where(x => !x.ApprovedDate.HasValue);
                    break;
                case ProcessTypeEnum.PreRoute:
                    query = query.Where(x => x.Processes.OfType<ProcessPreRoute>().Any(y => y.IsCurrent));
                    break;
                case ProcessTypeEnum.Routed:
                    query = query.Where(x => x.Processes.OfType<ProcessRouting>().Any(y => y.IsCurrent && y.EndTime.HasValue));
                    break;
                case ProcessTypeEnum.Pressed:
                    query = query.Where(x => x.Processes.OfType<ProcessPressing>().Any(y => y.IsCurrent && y.EndTime.HasValue));
                    break;
                case ProcessTypeEnum.Cleaned:
                    query = query.Where(x => x.Processes.OfType<ProcessCleaning>().Any(y => y.IsCurrent && y.EndTime.HasValue));
                    break;
                case ProcessTypeEnum.Packed:
                    query = query.Where(x => x.Processes.OfType<ProcessPacking>().Any(y => y.IsCurrent && y.EndTime.HasValue));
                    break;
                case ProcessTypeEnum.PickedUp:
                    query = query.Where(x => x.Processes.OfType<ProcessDelivering>().Any(y => y.IsCurrent &&
                                                                                              y.EndTime.HasValue &&
                                                                                              y.DeliverySheet.DeliveryMethod == DeliveryMethodEnum.PickUp));
                    query = query.Where(x => x.Invoice == null);
                    break;
                case ProcessTypeEnum.PickingUp:
                    query = query.Where(x => x.Processes.OfType<ProcessDelivering>().Any(y => y.IsCurrent &&
                                                                                              !y.EndTime.HasValue &&
                                                                                              y.DeliverySheet.DeliveryMethod == DeliveryMethodEnum.PickUp));
                    break;
                case ProcessTypeEnum.Delivered:
                    query = query.Where(x => x.Processes.OfType<ProcessDelivering>().Any(y => y.IsCurrent &&
                                                                                              y.EndTime.HasValue &&
                                                                                              y.DeliverySheet.DeliveryMethod == DeliveryMethodEnum.Shipping));
                    query = query.Where(x => x.Invoice == null);
                    break;
                case ProcessTypeEnum.Delivering:
                    query = query.Where(x => x.Processes.OfType<ProcessDelivering>().Any(y => y.IsCurrent &&
                                                                                              !y.EndTime.HasValue &&
                                                                                              y.DeliverySheet.DeliveryMethod == DeliveryMethodEnum.Shipping));
                    break;
                case ProcessTypeEnum.Invoiced:
                    query = query.Where(x => x.Invoice != null);
                    break;
                default:
                    query = query.Where(x => x.Processes.Any(y => y.IsCurrent && !y.EndTime.HasValue && y.ProcessType == status));
                    break;
            }

            return await GetSortedEnquiryListAsync(search, sortBy, direction, page, take, query);
        }

        private static async Task<ItemList<Enquiry>> GetSortedEnquiryListAsync(string search, string sortBy, string direction, int page, int take,
            IQueryable<Enquiry> query)
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
                        ? query.OrderBy(x => x.JobType)
                        : query.OrderByDescending(x => x.JobType);
                    break;
                case "customer":
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.Customer.Name)
                        : query.OrderByDescending(x => x.Customer.Name);
                    break;
                case "description":
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.DoorType)
                        : query.OrderByDescending(x => x.DoorType);
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

            var itemList = new ItemList<Enquiry>
            {
                Items = orders,
                TotalItemCount = totalCount
            };

            return itemList;
        }
    }
}