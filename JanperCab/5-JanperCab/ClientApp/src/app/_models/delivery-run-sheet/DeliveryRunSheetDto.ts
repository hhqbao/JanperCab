export class DeliveryRunSheetDto {
  id: number;
  driverId: number;
  createdDate: Date;

  getBarcodePrefix(): string {
    return 'RS';
  }
}
