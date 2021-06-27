using _1_Domain;
using System;
using System.Collections.Generic;
using System.Linq;

namespace _3_Application.Dtos.Reports
{
    public class MonthlyTallyReportDto
    {
        public DateTime Date { get; set; }

        public int OrderCount { get; set; }

        public int OrderedDuraformParts { get; set; }

        public decimal OrderedDuraformPrice { get; set; }

        public int OrderedJanperEdgeParts { get; set; }

        public decimal OrderedJanperEdgePrice { get; set; }

        public int OrderedRouteOnlyParts { get; set; }

        public decimal OrderedRouteOnlyPrice { get; set; }

        public int OrderedFlatpackParts { get; set; }

        public decimal OrderedFlatpackPrice { get; set; }

        public decimal TotalOrderedPrice { get; set; }

        public int InvoiceCount { get; set; }

        public int InvoicedDuraformParts { get; set; }

        public decimal InvoicedDuraformPrice { get; set; }

        public int InvoicedJanperEdgeParts { get; set; }

        public decimal InvoicedJanperEdgePrice { get; set; }

        public int InvoicedRouteOnlyParts { get; set; }

        public decimal InvoicedRouteOnlyPrice { get; set; }

        public int InvoicedFlatpackParts { get; set; }

        public decimal InvoicedFlatpackPrice { get; set; }

        public decimal TotalInvoicedPrice { get; set; }

        public MonthlyTallyReportDto(DateTime date, IEnumerable<_1_Domain.Enquiry> orders, IReadOnlyCollection<_1_Domain.Enquiry> invoicedOrders)
        {
            Date = date;

            var dateOrders = orders.Where(x => x.CreatedDate >= Date && x.CreatedDate < Date.AddDays(1)).ToList();

            OrderCount = dateOrders.Count;
            TotalOrderedPrice = dateOrders.Sum(x => x.TotalPrice ?? 0);

            var duraformOrders = dateOrders.OfType<DuraformEnquiry>().Where(x => !x.IsRoutingOnly).ToList();
            OrderedDuraformParts = duraformOrders.Sum(x => x.PartCount);
            OrderedDuraformPrice = duraformOrders.Sum(x => x.TotalPrice ?? 0);

            var routeOnlyOrders = dateOrders.OfType<DuraformEnquiry>().Where(x => x.IsRoutingOnly).ToList();
            OrderedRouteOnlyParts = routeOnlyOrders.Sum(x => x.PartCount);
            OrderedRouteOnlyPrice = routeOnlyOrders.Sum(x => x.TotalPrice ?? 0);

            OrderedJanperEdgeParts = 0;
            OrderedJanperEdgePrice = 0;

            OrderedFlatpackParts = 0;
            OrderedFlatpackPrice = 0;


            InvoiceCount = invoicedOrders.Count;
            TotalInvoicedPrice = invoicedOrders.Sum(x => x.Invoice.TotalPrice);

            var duraformInvoices = invoicedOrders.OfType<DuraformEnquiry>().Where(x => !x.IsRoutingOnly).ToList();
            InvoicedDuraformParts = duraformInvoices.Sum(x => x.Invoice.InvoiceComponents.Sum(y => y.Quantity));
            InvoicedDuraformPrice = duraformInvoices.Sum(x => x.Invoice.TotalPrice);

            var routeOnlyInvoices = invoicedOrders.OfType<DuraformEnquiry>().Where(x => x.IsRoutingOnly).ToList();
            InvoicedRouteOnlyParts = routeOnlyInvoices.Sum(x => x.Invoice.InvoiceComponents.Sum(y => y.Quantity));
            InvoicedRouteOnlyPrice = routeOnlyInvoices.Sum(x => x.Invoice.TotalPrice);

            InvoicedJanperEdgeParts = 0;
            InvoicedJanperEdgePrice = 0;

            InvoicedFlatpackParts = 0;
            InvoicedFlatpackPrice = 0;
        }
    }
}