import { DuraformProcessDto } from './../_models/enquiry/DuraformProcessDto';
import { DuraformEnquiryListDto } from './../_models/enquiry/DuraformEnquiryListDto';
import { DuraformEnquiryDto } from './../_models/enquiry/DuraformEnquiryDto';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { EnquiryDto } from '../_models/enquiry/EnquiryDto';
import { ItemList } from '../_models/commons/ItemList';
import { OrderSearchFilterValues } from '../_models/commons/OrderSearchFilterValues';

@Injectable({ providedIn: 'root' })
export class EnquiryService {
  constructor(private http: HttpClient) {}

  getDuraformEnquiry = (id: number): Observable<DuraformEnquiryDto> => {
    return this.http
      .get<DuraformEnquiryDto>(
        `${environment.baseUrl}/enquiries/duraform/${id}`
      )
      .pipe(
        map((response) => {
          return plainToClass(DuraformEnquiryDto, response);
        })
      );
  };

  getDuraformDrafts = (): Observable<DuraformEnquiryListDto[]> => {
    return this.http
      .get<DuraformEnquiryListDto[]>(
        `${environment.baseUrl}/enquiries/duraform/drafts`
      )
      .pipe(
        map((response) => {
          return plainToClass(DuraformEnquiryListDto, response);
        })
      );
  };

  getDuraformOrders = (
    filterValues: OrderSearchFilterValues
  ): Observable<ItemList<DuraformEnquiryListDto>> => {
    const {
      customerId,
      search,
      status,
      sortBy,
      direction,
      page,
      take,
    } = filterValues;

    let url = `${environment.baseUrl}/Enquiries/Duraform/Orders?page=${page}&take=${take}`;
    url += `&sortBy=${sortBy}&dir=${direction}`;

    if (status && `${status}` !== 'null') {
      url += `&status=${status}`;
    }

    if (search.length > 0) {
      url += `&search=${search}`;
    }

    if (customerId) {
      url += `&cusId=${customerId}`;
    }

    return this.http.get<ItemList<DuraformEnquiryListDto>>(url);
  };

  createEnquiry = (enquiry: EnquiryDto): Observable<EnquiryDto> => {
    return this.http
      .post<EnquiryDto>(`${environment.baseUrl}/enquiries/`, enquiry)
      .pipe(
        map((response) => {
          return plainToClass(EnquiryDto as any, response);
        })
      );
  };

  updateEnquiry = (id: number, enquiry: EnquiryDto): Observable<EnquiryDto> => {
    return this.http
      .put<EnquiryDto>(`${environment.baseUrl}/enquiries/${id}`, enquiry)
      .pipe(
        map((response) => {
          return plainToClass(EnquiryDto as any, response);
        })
      );
  };

  approveEnquiry = (id: number): Observable<DuraformProcessDto> => {
    return this.http
      .put<DuraformProcessDto>(
        `${environment.baseUrl}/enquiries/approve/${id}`,
        null
      )
      .pipe(
        map((response) => {
          return plainToClass(DuraformProcessDto, response);
        })
      );
  };
}