import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { InvoiceDto } from './../_models/invoice/InvoiceDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private http: HttpClient) {}

  createInvoice = (
    enquiryId: number,
    invoiceId: string
  ): Observable<InvoiceDto> => {
    return this.http
      .post<InvoiceDto>(
        `${environment.baseUrl}/Invoices/${enquiryId}/${invoiceId}`,
        null
      )
      .pipe(
        map((response) => {
          return plainToClass(InvoiceDto, response);
        })
      );
  };
}
