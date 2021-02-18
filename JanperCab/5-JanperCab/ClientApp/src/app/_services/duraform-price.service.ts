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

@Injectable({ providedIn: 'root' })
export class DuraformPriceService {
  constructor(private http: HttpClient) {}

  getAllPrices = () => {
    return this.http
      .get<DuraformAllPriceModel>(
        `${environment.baseUrl}/DuraformPrices/GetAll`
      )
      .pipe(
        map((response) => {
          return plainToClass(DuraformAllPriceModel, response);
        })
      );
  };

  getPressPriceGrid = (
    finishId: number,
    serieId: number
  ): Observable<DuraformWrapPriceGridDto[]> => {
    return this.http
      .get<DuraformWrapPriceGridDto[]>(
        `${environment.baseUrl}/DuraformPrices/${finishId}/${serieId}`
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
        `${environment.baseUrl}/DuraformPrices/${serieId}`
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
        `${environment.baseUrl}/DuraformPrices/SavePriceGrids`,
        priceGrids
      )
      .pipe(
        map((response) => {
          return plainToClass(DuraformPriceGridDto as any, response);
        })
      );
  };
}
