import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { DuraformPriceGridDto } from './../_models/duraform-price/DuraformPriceGridDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DuraformPriceService {
  constructor(private http: HttpClient) {}

  getPriceGrid = (
    finishId: number,
    serieId: number
  ): Observable<DuraformPriceGridDto[]> => {
    return this.http
      .get<DuraformPriceGridDto[]>(
        `${environment.baseUrl}/DuraformPrices/${finishId}/${serieId}`
      )
      .pipe(
        map((response) => {
          return plainToClass(DuraformPriceGridDto, response);
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
          return plainToClass(DuraformPriceGridDto, response);
        })
      );
  };
}
