import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { DriverDto } from './../_models/driver/DriverDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DriverService {
  constructor(private http: HttpClient) {}

  get = (id: number): Observable<DriverDto> => {
    return this.http.get<DriverDto>(`${environment.baseUrl}/Drivers/${id}`);
  };

  getAll = (): Observable<DriverDto[]> => {
    return this.http.get<DriverDto[]>(`${environment.baseUrl}/Drivers`).pipe(
      map((response) => {
        return plainToClass(DriverDto, response);
      })
    );
  };
}
