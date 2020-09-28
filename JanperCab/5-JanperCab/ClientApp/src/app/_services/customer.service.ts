import { CabinetMakerSearchFilterValues } from './../_models/commons/CabinetMakerSearchFilterValues';
import { DistributorDto } from './../_models/customer/DistributorDto';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { CabinetMakerDto } from './../_models/customer/CabinetMakerDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemList } from '../_models/commons/ItemList';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getCabinetMaker = (id: number): Observable<CabinetMakerDto> => {
    return this.http
      .get<CabinetMakerDto>(
        `${environment.baseUrl}/Customers/CabinetMakers/${id}`
      )
      .pipe(
        map((response) => {
          return plainToClass(CabinetMakerDto, response);
        })
      );
  };

  getDistributor = (id: number): Observable<DistributorDto> => {
    return this.http
      .get<DistributorDto>(
        `${environment.baseUrl}/Customers/Distributors/${id}`
      )
      .pipe(
        map((response) => {
          return plainToClass(DistributorDto, response);
        })
      );
  };

  getDistributorList = () => {
    return this.http
      .get<DistributorDto[]>(`${environment.baseUrl}/Customers/Distributors`)
      .pipe(
        map((response) => {
          return plainToClass(DistributorDto, response);
        })
      );
  };

  getCabinetMakerList = (
    filter: CabinetMakerSearchFilterValues
  ): Observable<ItemList<CabinetMakerDto>> => {
    let url = `${environment.baseUrl}/Customers/CabinetMakers?sortBy=${filter.sortBy}&direction=${filter.direction}&page=${filter.page}&take=${filter.take}`;

    if (filter.search.length > 0) {
      url += `&search=${filter.search}`;
    }

    return this.http.get<ItemList<CabinetMakerDto>>(url);
  };

  createCabinetMaker = (cabinetMaker: CabinetMakerDto) => {
    cabinetMaker.distributorId = this.auth.customer.id;

    return this.http
      .post<CabinetMakerDto>(
        `${environment.baseUrl}/Customers/CabinetMakers`,
        cabinetMaker
      )
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
        `${environment.baseUrl}/Customers/CabinetMakers/${id}`,
        cabinetMaker
      )
      .pipe(
        map((response) => {
          return plainToClass(CabinetMakerDto, response);
        })
      );
  };
}
