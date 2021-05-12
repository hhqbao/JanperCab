import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OnHoldComponentDto } from '../_models/on-hold-detail/OnHoldComponentDto';

@Injectable({ providedIn: 'root' })
export class OnHoldComponentService {
  constructor(private http: HttpClient) {}

  getOnHoldComponents = (
    processId: number
  ): Observable<OnHoldComponentDto[]> => {
    return this.http
      .get<OnHoldComponentDto[]>(
        `${environment.baseUrl}/OnHoldComponents/get-all/${processId}`
      )
      .pipe(
        map((response) => {
          return plainToClass(OnHoldComponentDto, response);
        })
      );
  };

  addOnHoldComponents = (
    component: OnHoldComponentDto
  ): Observable<OnHoldComponentDto> => {
    return this.http
      .post<OnHoldComponentDto>(
        `${environment.baseUrl}/OnHoldComponents`,
        component
      )
      .pipe(
        map((response) => {
          return plainToClass(OnHoldComponentDto, response);
        })
      );
  };

  updateOnHoldComponents = (
    id: number,
    component: OnHoldComponentDto
  ): Observable<OnHoldComponentDto> => {
    return this.http
      .put<OnHoldComponentDto>(
        `${environment.baseUrl}/OnHoldComponents/${id}`,
        component
      )
      .pipe(
        map((response) => {
          return plainToClass(OnHoldComponentDto, response);
        })
      );
  };

  deleteOnHoldComponent = (id: number) => {
    return this.http.delete(`${environment.baseUrl}/OnHoldComponents/${id}`);
  };
}
