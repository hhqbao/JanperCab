import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { DuraformOrderDto } from './../_models/duraform-order/DuraformOrderDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DuraformJobService {
  constructor(private http: HttpClient) {}

  get = (id: string): Observable<DuraformOrderDto> => {
    return this.http
      .get<DuraformOrderDto>(`${environment.baseUrl}/DuraformOrders/${id}`)
      .pipe(
        map((response) => {
          return plainToClass(DuraformOrderDto, response);
        })
      );
  };

  create = (orderDto: DuraformOrderDto): Observable<DuraformOrderDto> => {
    return this.http
      .post<DuraformOrderDto>(`${environment.baseUrl}/DuraformOrders`, orderDto)
      .pipe(
        map((response) => {
          return plainToClass(DuraformOrderDto, response);
        })
      );
  };
}
