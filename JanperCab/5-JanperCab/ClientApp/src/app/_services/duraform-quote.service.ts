import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DuraformQuoteService {
  constructor() {}

  // get = (id: string): Observable<DuraformQuoteDto> => {
  //   const url = `${environment.baseUrl}/DuraformQuotes/${id}`;

  //   return this.http.get<DuraformQuoteDto>(url).pipe(
  //     map((response) => {
  //       const quote = plainToClass(DuraformQuoteDto, response);

  //       return quote;
  //     })
  //   );
  // };
}
