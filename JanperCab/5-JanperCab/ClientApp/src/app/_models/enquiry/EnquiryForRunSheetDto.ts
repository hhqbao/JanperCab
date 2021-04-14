export class EnquiryForRunSheetDto {
  deliveryRunSheetId: number;
  enquiryId: number;
  cabinetMakerId: number;
  cabinetMakerName: string;
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
