import { CashOrderPaymentDto } from './../_models/cash-order-payment/CashOrderPaymentDto';
import { MakeCashPaymentModelDto } from './../_models/cash-order-payment/MakeCashPaymentModelDto';
import { DeliveryDocketDuraformDto } from './../_models/delivery-docket/DeliveryDocketDuraformDto';
import { PackingLabelDto } from './../_models/packing-label/PackingLabelDto';
import { EnquiryForInvoicingDto } from './../_models/enquiry/EnquiryForInvoicingDto';
import { EnquiryListDto } from '../_models/enquiry/EnquiryListDto';
import { DuraformEnquiryDto } from './../_models/enquiry/DuraformEnquiryDto';
import { plainToClass } from 'class-transformer';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { EnquiryDto } from '../_models/enquiry/EnquiryDto';
import { ItemList } from '../_models/commons/ItemList';
import { OrderSearchFilterValues } from '../_models/commons/OrderSearchFilterValues';
import { DeliveryDocketDto } from '../_models/delivery-docket/DeliveryDocketDto';
import { DeliveryDocketType } from '../_enums/DeliveryDocketType';
import { EnquiryPriceDto } from '../_models/enquiry/EnquiryPriceDto';

@Injectable({ providedIn: 'root' })
export class EnquiryService {
  constructor(private http: HttpClient) {}

  getDeliveryDocket = (enquiryId: number): Observable<DeliveryDocketDto> => {
    return this.http
      .get<DeliveryDocketDto>(
        `${environment.baseUrl}/DeliveryDockets/${enquiryId}`
      )
      .pipe(
        map((response) => {
          switch (response.deliveryDocketType) {
            case DeliveryDocketType.Duraform:
              return plainToClass(DeliveryDocketDuraformDto, response);
            default:
              throw new Error('Order Type Not Supported');
          }
        })
      );
  };

  getPackingLabel = (enquiryId: number): Observable<PackingLabelDto> => {
    return this.http
      .get<PackingLabelDto>(
        `${environment.baseUrl}/enquiries/packing-label/${enquiryId}`
      )
      .pipe(
        map((response) => {
          return plainToClass(PackingLabelDto, response);
        })
      );
  };

  getEnquiriesForInvoicing = (): Observable<EnquiryForInvoicingDto[]> => {
    return this.http
      .get<EnquiryForInvoicingDto[]>(
        `${environment.baseUrl}/enquiries/for-invoicing`
      )
      .pipe(
        map((response) => {
          return plainToClass(EnquiryForInvoicingDto, response);
        })
      );
  };

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

  getDrafts = (): Observable<EnquiryListDto[]> => {
    return this.http
      .get<EnquiryListDto[]>(`${environment.baseUrl}/enquiries/drafts`)
      .pipe(
        map((response) => {
          return plainToClass(EnquiryListDto, response);
        })
      );
  };

  getOrders = (
    filterValues: OrderSearchFilterValues
  ): Observable<ItemList<EnquiryListDto>> => {
    const { customerId, search, status, sortBy, direction, page, take } =
      filterValues;

    let url = `${environment.baseUrl}/Enquiries/Orders?page=${page}&take=${take}`;
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

    return this.http.get<ItemList<EnquiryListDto>>(url);
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

  updateEnquiryPriceOnly = (
    id: number,
    enquiryPrice: EnquiryPriceDto
  ): Observable<EnquiryDto> => {
    return this.http
      .put<EnquiryDto>(
        `${environment.baseUrl}/enquiries/update-price-only/${id}`,
        enquiryPrice
      )
      .pipe(
        map((response) => {
          return plainToClass(EnquiryDto as any, response);
        })
      );
  };

  approveEnquiry = (id: number): Observable<any> => {
    return this.http.put(
      `${environment.baseUrl}/enquiries/approve/${id}`,
      null
    );
  };

  declineEnquiry = (id: number): Observable<any> => {
    return this.http.put(
      `${environment.baseUrl}/enquiries/decline/${id}`,
      null
    );
  };

  makeCashPayment = (
    enquiryId: number,
    amount: number
  ): Observable<CashOrderPaymentDto> => {
    const model = new MakeCashPaymentModelDto(enquiryId, amount);

    return this.http
      .post<CashOrderPaymentDto>(
        `${environment.baseUrl}/enquiries/make-cash-payment`,
        model
      )
      .pipe(
        map((response) => {
          return plainToClass(CashOrderPaymentDto, response);
        })
      );
  };
}
