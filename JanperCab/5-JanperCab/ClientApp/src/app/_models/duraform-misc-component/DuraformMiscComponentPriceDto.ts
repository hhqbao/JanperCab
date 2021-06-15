import { DuraformMiscComponentDto } from 'src/app/_models/duraform-misc-component/DuraformMiscComponentDto';
export class DuraformMiscComponentPriceDto {
  id: number;

  unitPrice: number;
  subTotal: number;
  totalDiscount: number;
  totalPrice: number;

  constructor(duraformMiscComponent: DuraformMiscComponentDto) {
    this.id = duraformMiscComponent.id;
    this.unitPrice = duraformMiscComponent.unitPrice;
    this.subTotal = duraformMiscComponent.subTotal;
    this.totalDiscount = duraformMiscComponent.totalDiscount;
    this.totalPrice = duraformMiscComponent.totalPrice;
  }
}
