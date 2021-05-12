import { ManufacturerDto } from './../_models/customer/ManufacturerDto';
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
import { CustomerDto } from '../_models/customer/CustomerDto';
import { CustomerType } from '../_enums/CustomerType';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getCustomer = (id: number): Observable<CustomerDto> => {
    return this.http
      .get<CustomerDto>(`${environment.baseUrl}/Customers/${id}`)
      .pipe(
        map((response) => {
          switch (response.customerType) {
            case CustomerType.CabinetMaker:
              return plainToClass(CabinetMakerDto, response);
            case CustomerType.Distributor:
              return plainToClass(DistributorDto, response);
            case CustomerType.Manufacturer:
              return plainToClass(ManufacturerDto, response);
          }
        })
      );
  };

  getCustomerList = (
    filter: CabinetMakerSearchFilterValues
  ): Observable<ItemList<CustomerDto>> => {
    let url = `${environment.baseUrl}/Customers?sortBy=${filter.sortBy}&direction=${filter.direction}&page=${filter.page}&take=${filter.take}`;

    if (filter.search.length > 0) {
      url += `&search=${filter.search.replace('&', '@@@')}`;
    }

    return this.http.get<ItemList<CustomerDto>>(url);
  };

  create = (customer: CustomerDto): Observable<CustomerDto> => {
    return this.http
      .post<CustomerDto>(`${environment.baseUrl}/Customers`, customer)
      .pipe(
        map((response) => {
          switch (response.customerType) {
            case CustomerType.CabinetMaker:
              return plainToClass(CabinetMakerDto, response);
            case CustomerType.Distributor:
              return plainToClass(DistributorDto, response);
            case CustomerType.Manufacturer:
              return plainToClass(ManufacturerDto, response);
          }
        })
      );
  };

  update = (id: number, customer: CustomerDto): Observable<CustomerDto> => {
    return this.http
      .put<CustomerDto>(`${environment.baseUrl}/Customers/${id}`, customer)
      .pipe(
        map((response) => {
          switch (response.customerType) {
            case CustomerType.CabinetMaker:
              return plainToClass(CabinetMakerDto, response);
            case CustomerType.Distributor:
              return plainToClass(DistributorDto, response);
            case CustomerType.Manufacturer:
              return plainToClass(ManufacturerDto, response);
          }
        })
      );
  };
}
