import { CustomerCategoryCBDDto } from './../_models/customer-category/CustomerCategoryCBDDto';
import { CustomerCategoryAccountDto } from './../_models/customer-category/CustomerCategoryAccountDto';
import { ItemList } from 'src/app/_models/commons/ItemList';
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
import { CustomerDto } from '../_models/customer/CustomerDto';
import { CustomerType } from '../_enums/CustomerType';
import { CustomerCategoryDto } from '../_models/customer-category/CustomerCategoryDto';
import { CustomerCategoryType } from '../_enums/CustomerCategoryType';

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

    return this.http.get<ItemList<CustomerDto>>(url).pipe(
      map((response) => {
        const mappedList = new ItemList<CustomerDto>();
        mappedList.totalItemCount = response.totalItemCount;

        response.items.forEach((customer) => {
          switch (customer.customerType) {
            case CustomerType.CabinetMaker:
              mappedList.items.push(plainToClass(CabinetMakerDto, customer));
              break;
            case CustomerType.Distributor:
              mappedList.items.push(plainToClass(DistributorDto, customer));
              break;
            case CustomerType.Manufacturer:
              mappedList.items.push(plainToClass(ManufacturerDto, customer));
              break;
          }
        });

        return mappedList;
      })
    );
  };

  getCustomerCategoryList = (): Observable<CustomerCategoryDto[]> => {
    return this.http
      .get<CustomerCategoryDto[]>(`${environment.baseUrl}/CustomerCategories`)
      .pipe(
        map((response) => {
          const mappedList: CustomerCategoryDto[] = [];

          response.forEach((x) => {
            switch (x.categoryType) {
              case CustomerCategoryType.Account:
                mappedList.push(plainToClass(CustomerCategoryAccountDto, x));
                break;
              case CustomerCategoryType.CBD:
                mappedList.push(plainToClass(CustomerCategoryCBDDto, x));
                break;
            }
          });

          return mappedList;
        })
      );
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
