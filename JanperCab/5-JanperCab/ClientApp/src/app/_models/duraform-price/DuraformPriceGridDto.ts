export abstract class DuraformPriceGridDto {
  $type: string =
    '_3_Application.Dtos.DuraformPriceGrid.DuraformPriceGridDto, 3-Application, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null';
  id: number = 0;
  duraformSerieId: number;
  minHeight: number;
  maxHeight: number;
  minWidth: number;
  maxWidth: number;
  price: number;
  tempPrice: number;
}
