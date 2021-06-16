export class EnquiryForSheetDto {
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

  getFullAddress = (): string => {
    return `${this.address}, ${this.suburb} ${this.state} ${this.postcode}`;
  };
}
