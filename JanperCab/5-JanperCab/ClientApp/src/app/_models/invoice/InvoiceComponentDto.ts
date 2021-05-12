export class InvoiceComponentDto {
  id: number;
  invoiceId: number;
  quantity: number;
  description: string;
  unitPrice: number;
  subTotal: number;
  totalDiscount: number;
  totalPrice: number;
}
