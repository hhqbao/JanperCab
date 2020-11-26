using _1_Domain;
using _3_Application.Dtos.Common;
using _3_Application.Interfaces.Repositories;
using IdentityServer4.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
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
                        .OrderByDescending(x => x.QuoteNumber)
                        .FirstOrDefaultAsync();

                    quote.QuoteNumber = latestQuote?.QuoteNumber + 1 ?? 1;
                    quote.QuoteStatus = QuoteStatus.Pending;
                    quote.NotEditable = true;
                    break;
                case DuraformOrder order:
                    var latestOrder = await _dbSet.OfType<DuraformOrder>()
                        .OrderByDescending(x => x.OrderNumber)
                        .FirstOrDefaultAsync();

                    order.OrderNumber = latestOrder?.OrderNumber + 1 ?? 1;
                    order.OrderStatus = OrderStatus.Submitted;
                    order.NotEditable = true;
                    break;
                default:
                    throw new NotImplementedException();
            }

            duraformForm.CreatedByUserId = user.Id;

            Add(duraformForm);
        }

        public async Task ApproveOrderAsync(DuraformOrder order)
        {
            order.OrderStatus = OrderStatus.DistributorApproved;
        }

        public async Task ExportToICBAsync(DuraformOrder order, string savePath)
        {
            const string headers = "TYPE, SHAPE_FILE$, EXTERNAL_SHAPE_FILE$, DIMX,DIMY,DIMZ,BT,BB,BL,BR,ABB,AH,EDGE_TOP,EDGE_BOTTOM,EDGE_LEFT,EDGE_RIGHT,CORNER_RADIUS,TOOLING_FILE$,TOOLING_FILE2$,EDGE_TOOLING_FILE$,DRAWER_TOOLING_FILE$,OFFT,OFFB,OFFL,OFFR,EDGETHICK,USERVAR1,USERVAR2,USERVAR3,USERVAR4,USERVAR5,USERVAR6,USERVAR7,USERVAR8,BD_MATCHING,SHAPE_FILE2$,BDH,BDBT,BDH_ADDON,NOPN,PANDIV,VAR_DIV,VARDIVSTRING$,SPLIT_PANEL,V_SPLIT_Q,H_SPLIT_Q,V_SPLIT,H_SPLIT,SPLIT_PANEL_UPPER,V_SPLIT_Q_UPPER,H_SPLIT_Q_UPPER,V_SPLIT_UPPER,H_SPLIT_UPPER,SLICE_ON,DRAW_NUM,GAP,DRAWER_NUM,DRAWER1,DRAWER2,DRAWER3,DRAWER4,DRAWER5,DRAWER6,DRAWER7,DRAWER8,SLICE_WIDTH,JOBNUMBER,ACCOUNTNUMBER,JOBNUMBERCUST,DOORFINISH,DOORCOLOR,CNCCODE,MATERIAL,CNCTYPE,QUANTITY,DESCRIPTION";
            const string content = "0,SQUARE,,940,634,18,56,56,56,56,0,0,0,0,0,0,G_CORNER_RADIUS,LATSQ,LATSQ,SQUARE,RADIUS,0,0,,0,0,0,0,0,0,0,0,0,0,0,SQUARE,0,,0,0,0,0,,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2010986,Chance  Wayne,201104,ROUTER ONLY,DSW,DOOR,SS18 MDF,DOOR,1,TESTING";

            var data = $"{headers}{Environment.NewLine}{content}";

            await File.WriteAllTextAsync($"{savePath}\\2010986.csv", data);

            //using var package = new ExcelPackage();
            //var sheet = package.Workbook.Worksheets.Add(order.OrderNumber.ToString());

            //var headers = new List<string[]>
            //{
            //    new[] {"TYPE", "SHAPE_FILE$", "EXTERNAL_SHAPE_FILE$", "DIMX","DIMY","DIMZ","BT","BB","BL","BR","ABB","AH","EDGE_TOP","EDGE_BOTTOM","EDGE_LEFT","EDGE_RIGHT","CORNER_RADIUS","TOOLING_FILE$","TOOLING_FILE2$","EDGE_TOOLING_FILE$","DRAWER_TOOLING_FILE$","OFFT","OFFB","OFFL","OFFR","EDGETHICK","USERVAR1","USERVAR2","USERVAR3","USERVAR4","USERVAR5","USERVAR6","USERVAR7","USERVAR8","BD_MATCHING","SHAPE_FILE2$","BDH","BDBT","BDH_ADDON","NOPN","PANDIV","VAR_DIV","VARDIVSTRING$","SPLIT_PANEL","V_SPLIT_Q","H_SPLIT_Q","V_SPLIT","H_SPLIT","SPLIT_PANEL_UPPER","V_SPLIT_Q_UPPER","H_SPLIT_Q_UPPER","V_SPLIT_UPPER","H_SPLIT_UPPER","SLICE_ON","DRAW_NUM","GAP","DRAWER_NUM","DRAWER1","DRAWER2","DRAWER3","DRAWER4","DRAWER5","DRAWER6","DRAWER7","DRAWER8","SLICE_WIDTH","JOBNUMBER","ACCOUNTNUMBER","JOBNUMBERCUST","DOORFINISH","DOORCOLOR","CNCCODE","MATERIAL","CNCTYPE","QUANTITY","DESCRIPTION"}
            //};
            //sheet.Cells["A1:BX1"].LoadFromArrays(headers);

            //sheet.Cells["A2"].Value = 0;
            //sheet.Cells["B2"].Value = "SQUARE";
            //sheet.Cells["C2"].Value = null;
            //sheet.Cells["D2"].Value = 940;
            //sheet.Cells["E2"].Value = 634;
            //sheet.Cells["F2"].Value = 18;
            //sheet.Cells["G2"].Value = 56;
            //sheet.Cells["H2"].Value = 56;
            //sheet.Cells["I2"].Value = 56;
            //sheet.Cells["J2"].Value = 56;
            //sheet.Cells["K2"].Value = 0;
            //sheet.Cells["L2"].Value = 0;
            //sheet.Cells["M2"].Value = 0;
            //sheet.Cells["N2"].Value = 0;
            //sheet.Cells["O2"].Value = 0;
            //sheet.Cells["P2"].Value = 0;
            //sheet.Cells["Q2"].Value = "G_CORNER_RADIUS";
            //sheet.Cells["R2"].Value = "LATSQ";
            //sheet.Cells["S2"].Value = "LATSQ";
            //sheet.Cells["T2"].Value = "SQUARE";
            //sheet.Cells["U2"].Value = "RADIUS";
            //sheet.Cells["V2"].Value = 0;
            //sheet.Cells["W2"].Value = 0;
            //sheet.Cells["X2"].Value = null;
            //sheet.Cells["Y2"].Value = 0;
            //sheet.Cells["Z2"].Value = 0;
            //sheet.Cells["AA2"].Value = 0;
            //sheet.Cells["AB2"].Value = 0;
            //sheet.Cells["AC2"].Value = 0;
            //sheet.Cells["AD2"].Value = 0;
            //sheet.Cells["AE2"].Value = 0;
            //sheet.Cells["AF2"].Value = 0;
            //sheet.Cells["AG2"].Value = 0;
            //sheet.Cells["AH2"].Value = 0;
            //sheet.Cells["AI2"].Value = 0;
            //sheet.Cells["AJ2"].Value = "SQUARE";
            //sheet.Cells["AK2"].Value = 0;
            //sheet.Cells["AL2"].Value = null;
            //sheet.Cells["AM2"].Value = 0;
            //sheet.Cells["AN2"].Value = 0;
            //sheet.Cells["AO2"].Value = 0;
            //sheet.Cells["AP2"].Value = 0;
            //sheet.Cells["AQ2"].Value = null;
            //sheet.Cells["AR2"].Value = 0;
            //sheet.Cells["AS2"].Value = 0;
            //sheet.Cells["AT2"].Value = 0;
            //sheet.Cells["AU2"].Value = 0;
            //sheet.Cells["AV2"].Value = 0;
            //sheet.Cells["AW2"].Value = 0;
            //sheet.Cells["AX2"].Value = 0;
            //sheet.Cells["AY2"].Value = 0;
            //sheet.Cells["AZ2"].Value = 0;
            //sheet.Cells["BA2"].Value = 0;
            //sheet.Cells["BB2"].Value = 0;
            //sheet.Cells["BC2"].Value = 0;
            //sheet.Cells["BD2"].Value = 0;
            //sheet.Cells["BE2"].Value = 0;
            //sheet.Cells["BF2"].Value = 0;
            //sheet.Cells["BG2"].Value = 0;
            //sheet.Cells["BH2"].Value = 0;
            //sheet.Cells["BI2"].Value = 0;
            //sheet.Cells["BJ2"].Value = 0;
            //sheet.Cells["BK2"].Value = 0;
            //sheet.Cells["BL2"].Value = 0;
            //sheet.Cells["BM2"].Value = 0;
            //sheet.Cells["BN2"].Value = 0;
            //sheet.Cells["BO2"].Value = 2010986; //order.OrderNumber
            //sheet.Cells["BP2"].Value = "Chance Wayne"; //Customer Name??
            //sheet.Cells["BQ2"].Value = 201104; //Customer reference number
            //sheet.Cells["BR2"].Value = "ROUTER ONLY";
            //sheet.Cells["BS2"].Value = "DSW";
            //sheet.Cells["BT2"].Value = "DOOR";
            //sheet.Cells["BU2"].Value = "SS18 MDF";
            //sheet.Cells["BV2"].Value = "DOOR";
            //sheet.Cells["BW2"].Value = 1;
            //sheet.Cells["BX2"].Value = "TESTING";

            //var excelFile = new FileInfo($@"{savePath}\2010986.csv");
            //await package.SaveAsAsync(excelFile);
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

        public async Task<ItemList<DuraformOrder>> GetCabinetMakerOrdersAsync(int cabinetMakerId, OrderStatus? status, string search, string sortBy = "orderNumber", string direction = "asc", int page = 0, int take = 20)
        {
            var query = _dbSet.OfType<DuraformOrder>().Where(x => x.CabinetMakerId == cabinetMakerId);

            return await GetSortedOrderListAsync(status, search, sortBy, direction, page, take, query);
        }


        public async Task<ItemList<DuraformOrder>> GetDistributorOrdersAsync(int distributorId, int cabinetMakerId, OrderStatus? status, string search, string sortBy = "orderNumber", string direction = "asc", int page = 0, int take = 20)
        {
            var query = _dbSet.OfType<DuraformOrder>().Where(x => x.DistributorId == distributorId);

            if (cabinetMakerId != 0)
                query = query.Where(x => x.CabinetMakerId == cabinetMakerId);

            return await GetSortedOrderListAsync(status, search, sortBy, direction, page, take, query);
        }


        public async Task<ItemList<DuraformOrder>> GetManufacturerOrdersAsync(int distributorId, OrderStatus? status, string search, string sortBy = "orderNumber", string direction = "asc", int page = 0, int take = 20)
        {
            var query = _dbSet.OfType<DuraformOrder>();

            if (distributorId != 0)
                query = query.Where(x => x.DistributorId == distributorId);

            return await GetSortedOrderListAsync(status, search, sortBy, direction, page, take, query);
        }

        private static async Task<ItemList<DuraformOrder>> GetSortedOrderListAsync(OrderStatus? status, string search, string sortBy, string direction, int page, int take,
            IQueryable<DuraformOrder> query)
        {
            if (status != null)
                query = query.Where(x => x.OrderStatus == status);

            if (!search.IsNullOrEmpty())
                query = query.Where(x => x.CustomerOrderNumber.Contains(search) || x.CabinetMaker.Name.Contains(search) || x.Distributor.Name.Contains(search));

            switch (sortBy)
            {
                case "orderStatus":
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.OrderStatus)
                        : query.OrderByDescending(x => x.OrderStatus);
                    break;
                case "customerOrderNumber":
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.CustomerOrderNumber)
                        : query.OrderByDescending(x => x.CustomerOrderNumber);
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
                case "createdDate":
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.CreatedDate)
                        : query.OrderByDescending(x => x.CreatedDate);
                    break;
                default:
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.OrderNumber)
                        : query.OrderByDescending(x => x.OrderNumber);
                    break;
            }

            var totalCount = await query.CountAsync();
            var orders = await query.Skip(page * take).Take(take).ToListAsync();

            var itemList = new ItemList<DuraformOrder> { Items = orders, TotalItemCount = totalCount };

            return itemList;
        }
    }
}