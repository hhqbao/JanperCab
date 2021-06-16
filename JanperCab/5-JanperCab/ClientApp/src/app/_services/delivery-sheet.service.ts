import { DeliverySheetDto } from 'src/app/_models/delivery-sheet/DeliverySheetDto';
import { ShippingSheetDto } from './../_models/delivery-sheet/ShippingSheetDto';
import { TruckDto } from '../_models/truck/TruckDto';
import { DriverDto } from '../_models/driver/DriverDto';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { DeliveryMethodEnum } from '../_enums/DeliveryMethodEnum';
import { PickUpSheetDto } from '../_models/delivery-sheet/PickUpSheetDto';

@Injectable({ providedIn: 'root' })
export class DeliverySheetService {
  constructor(private http: HttpClient) {}

  getSheet = (id: number): Observable<DeliverySheetDto> => {
    return this.http
      .get<DeliverySheetDto>(`${environment.baseUrl}/DeliverySheets/${id}`)
      .pipe(
        map((response) => {
          switch (response.deliveryMethod) {
            case DeliveryMethodEnum.Shipping:
              return plainToClass(ShippingSheetDto, response);
            case DeliveryMethodEnum.PickUp:
              return plainToClass(PickUpSheetDto, response);
          }
        })
      );
  };

  getSheets = (): Observable<DeliverySheetDto[]> => {
    return this.http
      .get<DeliverySheetDto[]>(`${environment.baseUrl}/DeliverySheets`)
      .pipe(
        map((response) => {
          const sheets: DeliverySheetDto[] = [];
          response.forEach((x) => {
            switch (x.deliveryMethod) {
              case DeliveryMethodEnum.Shipping:
                sheets.push(plainToClass(ShippingSheetDto, x));
                break;
              case DeliveryMethodEnum.PickUp:
                sheets.push(plainToClass(PickUpSheetDto, x));
                break;
            }
          });
          return sheets;
        })
      );
  };

  createSheet = (
    deliverySheet: DeliverySheetDto
  ): Observable<DeliverySheetDto> => {
    return this.http
      .post<DeliverySheetDto>(
        `${environment.baseUrl}/DeliverySheets`,
        deliverySheet
      )
      .pipe(
        map((response) => {
          switch (response.deliveryMethod) {
            case DeliveryMethodEnum.Shipping:
              return plainToClass(ShippingSheetDto, response);
            case DeliveryMethodEnum.PickUp:
              return plainToClass(PickUpSheetDto, response);
          }
        })
      );
  };

  updateSheet = (id: number, deliverySheet: DeliverySheetDto) => {
    return this.http
      .put<DeliverySheetDto>(
        `${environment.baseUrl}/DeliverySheets/${id}`,
        deliverySheet
      )
      .pipe(
        map((response) => {
          switch (response.deliveryMethod) {
            case DeliveryMethodEnum.Shipping:
              return plainToClass(ShippingSheetDto, response);
            case DeliveryMethodEnum.PickUp:
              return plainToClass(PickUpSheetDto, response);
          }
        })
      );
  };

  deleteSheet = (id: number) => {
    return this.http.delete(`${environment.baseUrl}/DeliverySheets/${id}`);
  };

  lockSheet = (sheetId: number): Observable<Date> => {
    return this.http.put<Date>(
      `${environment.baseUrl}/DeliverySheets/Lock/${sheetId}`,
      null
    );
  };

  completeSheet = (sheetId: number): Observable<Date> => {
    return this.http.put<Date>(
      `${environment.baseUrl}/DeliverySheets/Complete/${sheetId}`,
      null
    );
  };
}
