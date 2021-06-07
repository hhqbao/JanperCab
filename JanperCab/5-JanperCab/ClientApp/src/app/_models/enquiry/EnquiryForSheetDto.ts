export abstract class EnquiryForSheetDto {
  $type: string;
  enquiryId: number;
  customerId: number;
  customerName: string;
  customerReference: string;
  doorType: string;
  doorColor: string;
  partCount: number;
  address: string;
  suburb: string;
  state: string;
  postcode: string;

  constructor() {
    this.$type = '';
  }
}
