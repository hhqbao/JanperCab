using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class DuraformOrderRepo : BaseRepository<DuraformForm>, IDuraformOrderRepo
    {
        public DuraformOrderRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task AddAsync(DuraformForm duraformForm, Distributor distributor, ApplicationUser user)
        {
            switch (duraformForm)
            {
                case DuraformDraft draft:
                    break;
                case DuraformQuote quote:
                    var latestQuote = await _dbSet.OfType<DuraformQuote>()
                        .Where(x => x.DistributorId == distributor.Id)
                        .OrderByDescending(x => x.QuoteNumber)
                        .FirstOrDefaultAsync();

                    quote.QuoteNumber = latestQuote?.QuoteNumber + 1 ?? 1;
                    quote.QuoteStatus = QuoteStatus.Pending;
                    quote.NotEditable = true;
                    break;
                case DuraformOrder order:
                    var latestOrder = await _dbSet.OfType<DuraformOrder>()
                        .Where(x => x.DistributorId == distributor.Id)
                        .OrderByDescending(x => x.OrderNumber)
                        .FirstOrDefaultAsync();

                    order.OrderNumber = latestOrder?.OrderNumber + 1 ?? 1;
                    order.OrderStatus = OrderStatus.Pending;
                    order.NotEditable = true;
                    break;
                default:
                    throw new NotImplementedException();
            }

            duraformForm.CreatedByUserId = user.Id;

            Add(duraformForm);
        }

        public async Task<List<DuraformDraft>> GetDraftsAsync()
        {
            return await _dbSet.OfType<DuraformDraft>().ToListAsync();
        }

        public async Task<DuraformDraft> GetDraftAsync(Guid draftId)
        {
            return await _dbSet.OfType<DuraformDraft>()
                .Include(x => x.DuraformComponents)
                .FirstOrDefaultAsync(x => x.Id.Equals(draftId));
        }

        public async Task UpdateDraftAsync(DuraformDraft draftInDb, DuraformDraft newDraft)
        {
            newDraft.Id = draftInDb.Id;
            newDraft.CreatedDate = draftInDb.CreatedDate;
            newDraft.LastUpdated = DateTime.Now;
            newDraft.CreatedByUserId = draftInDb.CreatedByUserId;

            _dbSet.Remove(draftInDb);
            await _dbContext.SaveChangesAsync();

            _dbSet.Add(newDraft);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<int> CountDraftAsync(string userId)
        {
            var count = await _dbSet.CountAsync(x =>
                x.OrderType == DuraformOrderType.Draft && x.CreatedByUserId.Equals(userId));

            return count;
        }

        public async Task<int> CountFinalizedQuoteAsync(int customerId)
        {
            var count = await _dbSet.OfType<DuraformQuote>().CountAsync(x => x.QuoteStatus == QuoteStatus.Finalized);

            return count;
        }

        public async Task<DuraformQuote> GetQuoteAsync(Guid quoteId, int customerId)
        {
            throw new NotImplementedException();
            //return await _dbSet.OfType<DuraformQuote>()
            //    .FirstOrDefaultAsync(x => x.Id == quoteId && x.CustomerId == customerId);
        }

        public async Task<DuraformOrder> GetOrderAsync(Guid orderId, Customer customer)
        {
            var queryableOrders = _dbSet.OfType<DuraformOrder>();

            switch (customer)
            {
                case CabinetMaker cabinetMaker:
                    return await queryableOrders.SingleOrDefaultAsync(x =>
                        x.Id.Equals(orderId) && x.CabinetMakerId.Equals(cabinetMaker.Id));
                case Distributor distributor:
                    return await queryableOrders.SingleOrDefaultAsync(x =>
                        x.Id.Equals(orderId) && x.DistributorId.Equals(distributor.Id));
                case Manufacturer manufacturer:
                    return await queryableOrders.SingleOrDefaultAsync(x => x.Id.Equals(orderId));
                default:
                    throw new NotImplementedException();
            }
        }
    }
}