import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { TruckDto } from './../_models/truck/TruckDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TruckService {
  constructor(private http: HttpClient) {}

  getAll = (): Observable<TruckDto[]> => {
    return this.http.get<TruckDto[]>(`${environment.baseUrl}/Trucks`).pipe(
      map((response) => {
        return plainToClass(TruckDto, response);
      })
    );
  };
}
