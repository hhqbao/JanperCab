import { Type } from 'class-transformer';

export class MonthlyTallyReportDto {
  @Type(() => Date)
  date: Date;

  orderCount: number;
  orderedDuraformParts: number;
  orderedDuraformPrice: number;
  orderedJanperEdgeParts: number;
  orderedJanperEdgePrice: number;
  orderedRouteOnlyParts: number;
  orderedRouteOnlyPrice: number;
  orderedFlatpackParts: number;
  orderedFlatpackPrice: number;
  totalOrderedPrice: number;
  invoiceCount: number;
  invoicedDuraformParts: number;
  invoicedDuraformPrice: number;
  invoicedJanperEdgeParts: number;
  invoicedJanperEdgePrice: number;
  invoicedRouteOnlyParts: number;
  invoicedRouteOnlyPrice: number;
  invoicedFlatpackParts: number;
  invoicedFlatpackPrice: number;
  totalInvoicedPrice: number;
}
