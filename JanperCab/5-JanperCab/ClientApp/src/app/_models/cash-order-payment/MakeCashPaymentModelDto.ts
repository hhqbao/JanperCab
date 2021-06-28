export class MakeCashPaymentModelDto {
  enquiryId: number;
  amount: number;

  constructor(enquiryId: number, amount: number) {
    this.enquiryId = enquiryId;
    this.amount = amount;
  }
}
