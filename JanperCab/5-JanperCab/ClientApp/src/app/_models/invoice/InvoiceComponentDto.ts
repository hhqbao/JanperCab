export class InvoiceComponentDto {
  id: number;
  invoiceId: string;
  quantity: number;
  description: string;
  unitPrice: number;
  subTotal: number;
  totalDiscount: number;
  totalPrice: number;
}
