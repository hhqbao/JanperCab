export class EnquiryForInvoicingDto {
  id: number;
  jobType: string;
  deliveredTime: Date;
  customerName: string;
  gstRate: number;
  discountRate: number;
  subTotal: number;
  totalGst: number;
  totalPrice: number;
}
