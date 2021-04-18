export class DeliveryRunSheetDto {
  id: number;
  driverId: number;
  createdDate: Date;
  lockedDate: Date;

  getBarcodePrefix(): string {
    return 'RS';
  }
}
