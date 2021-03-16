import { DuraformAllPriceModel } from './../_models/duraform-price/DuraformAllPriceModel';
import { DuraformPriceGridDto } from 'src/app/_models/duraform-price/DuraformPriceGridDto';
import { DuraformWrapPriceGridDto } from './../_models/duraform-price/DuraformWrapPriceGridDto';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DuraformRouteOnlyPriceGridDto } from '../_models/duraform-price/DuraformRouteOnlyPriceGridDto';
import { DuraformMiscPriceDto } from '../_models/duraform-misc-price/DuraformMiscPriceDto';
import { DuraformMiscPriceModel } from '../_models/duraform-price/DuraformMiscPriceModel';

@Injectable({ providedIn: 'root' })
export class DuraformPriceService {
  constructor(private http: HttpClient) {}

  getAllGriPrices = (): Observable<DuraformAllPriceModel> => {
    return this.http
      .get<DuraformAllPriceModel>(`${environment.baseUrl}/DuraformPrices/Grids`)
      .pipe(
        map((response) => {
          return plainToClass(DuraformAllPriceModel, response);
        })
      );
  };

  getAllMiscPrices = (): Observable<DuraformMiscPriceModel> => {
    return this.http
      .get<DuraformMiscPriceModel>(
        `${environment.baseUrl}/DuraformPrices/Miscs`
      )
      .pipe(
        map((response) => {
          return plainToClass(DuraformMiscPriceModel, response);
        })
      );
  };

  getPressPriceGrid = (
    finishId: number,
    serieId: number
  ): Observable<DuraformWrapPriceGridDto[]> => {
    return this.http
      .get<DuraformWrapPriceGridDto[]>(
        `${environment.baseUrl}/DuraformPrices/Grids/${finishId}/${serieId}`
      )
      .pipe(
        map((response) => {
          return plainToClass(DuraformWrapPriceGridDto, response);
        })
      );
  };

  getRouteOnlyPriceGrid = (
    serieId: number
  ): Observable<DuraformRouteOnlyPriceGridDto[]> => {
    return this.http
      .get<DuraformRouteOnlyPriceGridDto[]>(
        `${environment.baseUrl}/DuraformPrices/Grids/${serieId}`
      )
      .pipe(
        map((response) => {
          return plainToClass(DuraformRouteOnlyPriceGridDto, response);
        })
      );
  };

  savePriceGrid = (
    priceGrids: DuraformPriceGridDto[]
  ): Observable<DuraformPriceGridDto[]> => {
    return this.http
      .post<DuraformPriceGridDto[]>(
        `${environment.baseUrl}/DuraformPrices/Grids`,
        priceGrids
      )
      .pipe(
        map((response) => {
          return plainToClass(DuraformPriceGridDto as any, response);
        })
      );
  };
}
