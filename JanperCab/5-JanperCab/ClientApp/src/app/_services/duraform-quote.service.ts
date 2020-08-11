import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { DuraformQuoteDto } from './../_models/duraform-order/DuraformQuoteDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DuraformQuoteService {
  constructor(private http: HttpClient) {}

  get = (id: string): Observable<DuraformQuoteDto> => {
    const url = `${environment.baseUrl}/DuraformQuotes/${id}`;

    return this.http.get<DuraformQuoteDto>(url).pipe(
      map((response) => {
        const quote = plainToClass(DuraformQuoteDto, response);

        return quote;
      })
    );
  };
}
