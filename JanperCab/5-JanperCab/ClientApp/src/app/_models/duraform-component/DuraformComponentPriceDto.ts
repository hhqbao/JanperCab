import { DuraformComponentDto } from 'src/app/_models/duraform-component/DuraformComponentDto';
export class DuraformComponentPriceDto {
  id: number;

  unitPrice: number;
  subTotal: number;
  totalDiscount: number;
  totalPrice: number;

  constructor(duraformComponent: DuraformComponentDto) {
    this.id = duraformComponent.id;
    this.unitPrice = duraformComponent.unitPrice;
    this.subTotal = duraformComponent.subTotal;
    this.totalDiscount = duraformComponent.totalDiscount;
    this.totalPrice = duraformComponent.totalPrice;
  }
}
