export class DeliveryRunSheetDto {
  static readonly BARCODE_PREFIX: string = 'RS';

  id: number;
  driverId: number;
  createdDate: Date;
  lockedDate: Date;
  deliveredDate: Date;

  get isEditable(): boolean {
    return !this.lockedDate && !this.deliveredDate;
  }

  getBarcodePrefix(): string {
    return DeliveryRunSheetDto.BARCODE_PREFIX;
  }
}
