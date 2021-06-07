import { CustomerDto } from 'src/app/_models/customer/CustomerDto';
import { PickUpSheetForListDto } from './../_models/pick-up-sheet/PickUpSheetForListDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DeliveryRunSheetForListDto } from '../_models/delivery-run-sheet/DeliveryRunSheetForListDto';
import { CustomerType } from '../_enums/CustomerType';
import { CabinetMakerDto } from '../_models/customer/CabinetMakerDto';
import { DistributorDto } from '../_models/customer/DistributorDto';
import { ManufacturerDto } from '../_models/customer/ManufacturerDto';

@Injectable({ providedIn: 'root' })
export class PickUpSheetService {
  constructor(private http: HttpClient) {}

  getSheet = (sheetId: number): Observable<PickUpSheetForListDto> => {
    return this.http
      .get<PickUpSheetForListDto>(
        `${environment.baseUrl}/PickUpSheets/${sheetId}`
      )
      .pipe(
        map((response) => {
          return plainToClass(PickUpSheetForListDto, response);
        })
      );
  };

  getSheets = (): Observable<PickUpSheetForListDto[]> => {
    return this.http
      .get<PickUpSheetForListDto[]>(`${environment.baseUrl}/PickUpSheets`)
      .pipe(
        map((response) => {
          return plainToClass(PickUpSheetForListDto, response);
        })
      );
  };

  createSheet = (customerId: number): Observable<PickUpSheetForListDto> => {
    return this.http
      .post<PickUpSheetForListDto>(
        `${environment.baseUrl}/PickUpSheets/${customerId}`,
        null
      )
      .pipe(
        map((response) => {
          return plainToClass(PickUpSheetForListDto, response);
        })
      );
  };

  completeSheet = (sheetId: number) => {
    return this.http.put(
      `${environment.baseUrl}/PickUpSheets/complete/${sheetId}`,
      null
    );
  };

  deleteSheet = (sheetId: number) => {
    return this.http.delete(`${environment.baseUrl}/PickUpSheets/${sheetId}`);
  };
}
