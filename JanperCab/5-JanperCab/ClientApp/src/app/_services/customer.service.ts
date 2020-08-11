import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { CabinetMakerDto } from './../_models/customer/CabinetMakerDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getCabinetMakerList = () => {
    return this.http
      .get<CabinetMakerDto[]>(`${environment.baseUrl}/Customers`)
      .pipe(
        map((response) => {
          return plainToClass(CabinetMakerDto, response);
        })
      );
  };

  createCabinetMaker = (cabinetMaker: CabinetMakerDto) => {
    cabinetMaker.distributorId = this.auth.customer.id;

    return this.http
      .post<CabinetMakerDto>(`${environment.baseUrl}/Customers`, cabinetMaker)
      .pipe(
        map((response) => {
          return plainToClass(CabinetMakerDto, response);
        })
      );
  };

  updateCabinetMaker = (id: number, cabinetMaker: CabinetMakerDto) => {
    cabinetMaker.distributorId = this.auth.customer.id;

    return this.http
      .put<CabinetMakerDto>(
        `${environment.baseUrl}/Customers/${id}`,
        cabinetMaker
      )
      .pipe(
        map((response) => {
          return plainToClass(CabinetMakerDto, response);
        })
      );
  };
}
