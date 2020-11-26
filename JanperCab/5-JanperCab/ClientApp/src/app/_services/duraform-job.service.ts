import { OrderStatus } from './../_enums/OrderStatus';
import { ItemList } from './../_models/commons/ItemList';
import { DuraformOrderForListDto } from './../_models/duraform-order/DuraformOrderForListDto';
import { OrderSearchFilterValues } from './../_models/commons/OrderSearchFilterValues';
import { DuraformDraftDto } from './../_models/duraform-order/DuraformDraftDto';
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

  getCabinetMakerOrders = (filterValues: OrderSearchFilterValues) => {
    const { search, status, sortBy, direction, page, take } = filterValues;

    let url = `${environment.baseUrl}/DuraformOrders/CabinetMakerOrders`;
    url += `?sortBy=${sortBy}&direction=${direction}&page=${page}&take=${take}`;

    if (status && `${status}` !== 'null') {
      url += `&status=${status}`;
    }

    if (search.length > 0) {
      url += `&search=${search}`;
    }

    return this.http.get<ItemList<DuraformOrderForListDto>>(url);
  };

  getDistributorOrders = (filterValues: OrderSearchFilterValues) => {
    const {
      customerId,
      search,
      status,
      sortBy,
      direction,
      page,
      take,
    } = filterValues;

    let url = `${environment.baseUrl}/DuraformOrders/DistributorOrders?cabinetMakerId=${customerId}`;
    url += `&sortBy=${sortBy}&direction=${direction}&page=${page}&take=${take}`;

    if (status && `${status}` !== 'null') {
      url += `&status=${status}`;
    }

    if (search.length > 0) {
      url += `&search=${search}`;
    }

    return this.http.get<ItemList<DuraformOrderForListDto>>(url);
  };

  getManufacturerOrders = (filterValues: OrderSearchFilterValues) => {
    const {
      customerId,
      search,
      status,
      sortBy,
      direction,
      page,
      take,
    } = filterValues;

    let url = `${environment.baseUrl}/DuraformOrders/ManufacturerOrders?distributorId=${customerId}`;
    url += `&sortBy=${sortBy}&direction=${direction}&page=${page}&take=${take}`;

    if (status && `${status}` !== 'null') {
      url += `&status=${status}`;
    }

    if (search.length > 0) {
      url += `&search=${search}`;
    }

    return this.http.get<ItemList<DuraformOrderForListDto>>(url);
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

  draftToOrder = (
    draftId: string,
    draftDto: DuraformDraftDto
  ): Observable<DuraformOrderDto> => {
    return this.http
      .put<DuraformOrderDto>(
        `${environment.baseUrl}/DuraformOrders/DraftToOrder/${draftId}`,
        draftDto
      )
      .pipe(
        map((response) => {
          return plainToClass(DuraformOrderDto, response);
        })
      );
  };

  distributorApprove = (id: string): Observable<OrderStatus> => {
    return this.http.put<OrderStatus>(
      `${environment.baseUrl}/DuraformOrders/DistributorOrders/Approve/${id}`,
      null
    );
  };

  exportIcb = (id: string) => {
    return this.http.post(
      `${environment.baseUrl}/DuraformOrders/DistributorOrders/ExportIcb/${id}`,
      null
    );
  };

  // update = (
  //   orderNumber: number,
  //   orderDto: DuraformOrderDto
  // ): Observable<DuraformOrderDto> => {
  //   return this.http
  //     .put<DuraformOrderDto>(
  //       `${environment.baseUrl}/DuraformOrders/${orderNumber}`,
  //       orderDto
  //     )
  //     .pipe(
  //       map((response) => {
  //         return plainToClass(DuraformOrderDto, response);
  //       })
  //     );
  // };
}
