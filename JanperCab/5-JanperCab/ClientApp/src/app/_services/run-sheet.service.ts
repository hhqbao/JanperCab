import { DriverDto } from './../_models/driver/DriverDto';
import { DeliveryRunSheetForListDto } from './../_models/delivery-run-sheet/DeliveryRunSheetForListDto';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RunSheetService {
  constructor(private http: HttpClient) {}

  getRunSheet = (sheetId: number): Observable<DeliveryRunSheetForListDto> => {
    return this.http
      .get<DeliveryRunSheetForListDto>(
        `${environment.baseUrl}/RunSheets/${sheetId}`
      )
      .pipe(
        map((response) => {
          return plainToClass(DeliveryRunSheetForListDto, response);
        })
      );
  };

  getRunSheets = (): Observable<DeliveryRunSheetForListDto[]> => {
    return this.http
      .get<DeliveryRunSheetForListDto[]>(`${environment.baseUrl}/RunSheets`)
      .pipe(
        map((response) => {
          return plainToClass(DeliveryRunSheetForListDto, response);
        })
      );
  };

  changeDriver = (sheetId: number, driverId: number): Observable<DriverDto> => {
    return this.http
      .put<DriverDto>(
        `${environment.baseUrl}/RunSheets/change-driver/${sheetId}/${driverId}`,
        null
      )
      .pipe(
        map((response) => {
          return plainToClass(DriverDto, response);
        })
      );
  };

  lockRunSheet = (sheetId: number): Observable<Date> => {
    return this.http.put<Date>(
      `${environment.baseUrl}/RunSheets/Lock/${sheetId}`,
      null
    );
  };

  confirmDelivery = (sheetId: number): Observable<Date> => {
    return this.http.put<Date>(
      `${environment.baseUrl}/RunSheets/confirm-delivery/${sheetId}`,
      null
    );
  };

  createRunSheet = (
    driverId: number
  ): Observable<DeliveryRunSheetForListDto> => {
    return this.http
      .post<DeliveryRunSheetForListDto>(
        `${environment.baseUrl}/RunSheets/${driverId}`,
        null
      )
      .pipe(
        map((response) => {
          return plainToClass(DeliveryRunSheetForListDto, response);
        })
      );
  };
}
