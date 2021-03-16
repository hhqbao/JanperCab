using _1_Domain;
using _1_Domain.Enum;
using _3_Application.Dtos.Common;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
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

            switch (customer)
            {
                case CabinetMaker cabinetMaker:
                    return duraformEnquiry.CabinetMakerId == cabinetMaker.Id ? duraformEnquiry : null;
                case Distributor distributor:
                    return duraformEnquiry.DistributorId == distributor.Id ? duraformEnquiry : null;
                case Manufacturer _:
                    return duraformEnquiry;
                default:
                    return null;
            }
        }

        public async Task<List<DuraformEnquiry>> GetDuraformDraftListAsync(ApplicationUser creator)
        {
            return await _dbSet.OfType<DuraformEnquiry>()
                .Where(x => x.EnquiryType == EnquiryTypeEnum.Draft && x.CreatorId == creator.Id).ToListAsync();
        }

        public async Task<ItemList<DuraformEnquiry>> GetDuraformOrderListAsync(int? cabinetMakerId, int? distributorId, DuraformProcessEnum? status, string search, string sortBy, string direction, int page, int take)
        {
            var query = _dbSet.OfType<DuraformEnquiry>().Where(x => x.EnquiryType == EnquiryTypeEnum.Order && x.OrderedDate.HasValue);

            if (distributorId.HasValue)
                query = query.Where(x => x.DistributorId == distributorId);

            if (cabinetMakerId.HasValue)
                query = query.Where(x => x.CabinetMakerId == cabinetMakerId);

            if (status.HasValue)
                query = query.Where(x =>
                    x.DuraformProcesses.Any(y => y.CompletedDate.HasValue && y.Process == status));

            return await GetSortedDuraformEnquiryListAsync(search, sortBy, direction, page, take, query);
        }

        public void Approve(DuraformEnquiry enquiry)
        {
            enquiry.ApprovedDate = DateTime.Now;
            enquiry.DuraformProcesses.Clear();

            enquiry.DuraformProcesses.Add(new DuraformProcess(DuraformProcessEnum.PreRoute, DateTime.Now));
            enquiry.DuraformProcesses.Add(new DuraformProcess(DuraformProcessEnum.Routing, null));
            enquiry.DuraformProcesses.Add(new DuraformProcess(DuraformProcessEnum.Routed, null));

            if (enquiry.IsRoutingOnly)
            {
                enquiry.DuraformProcesses.Add(new DuraformProcess(DuraformProcessEnum.Packed, null));
            }
            else
            {
                enquiry.DuraformProcesses.Add(new DuraformProcess(DuraformProcessEnum.Pressing, null));
                enquiry.DuraformProcesses.Add(new DuraformProcess(DuraformProcessEnum.Pressed, null));
                enquiry.DuraformProcesses.Add(new DuraformProcess(DuraformProcessEnum.Cleaned, null));
                enquiry.DuraformProcesses.Add(new DuraformProcess(DuraformProcessEnum.Packed, null));
            }
        }

        private static async Task<ItemList<DuraformEnquiry>> GetSortedDuraformEnquiryListAsync(string search, string sortBy, string direction, int page, int take,
            IQueryable<DuraformEnquiry> query)
        {
            if (!string.IsNullOrEmpty(search))
                query = query.Where(x => x.CustomerReference.Contains(search) || x.CabinetMaker.Name.Contains(search) || x.Distributor.Name.Contains(search));

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
                        ? query.OrderBy(x => x.CabinetMaker.Name)
                        : query.OrderByDescending(x => x.CabinetMaker.Name);
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