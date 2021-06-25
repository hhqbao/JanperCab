import { Type } from 'class-transformer';

export class DailyOrderDto {
  enquiryId: number;

  @Type(() => Date)
  createdDate: Date;

  type: string;
  door: string;
  colour: string;
  duraformParts: number;
  janperEdgeParts: number;
  routeOnlyParts: number;
  flatpackParts: number;
  customerName: string;
  orderReference: string;
  hasFixedPrice: boolean;
  totalPrice: number;
}
