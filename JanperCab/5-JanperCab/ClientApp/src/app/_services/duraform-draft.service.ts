import { DuraformDraftForSmallList } from './../_models/duraform-draft/DuraformDraftForSmallList';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DuraformDraftDto } from '../_models/duraform-order/DuraformDraftDto';

@Injectable({ providedIn: 'root' })
export class DuraformDraftService {
  constructor(private http: HttpClient) {}

  get = (id: string): Observable<DuraformDraftDto> => {
    const url = `${environment.baseUrl}/DuraformDrafts/${id}`;

    return this.http.get<DuraformDraftDto>(url);
  };

  getList = (limit: number): Observable<DuraformDraftDto[]> => {
    const url = `${environment.baseUrl}/DuraformDrafts?limit=${limit}`;

    return this.http.get<DuraformDraftDto[]>(url);
  };

  getSmallList = (): Observable<DuraformDraftForSmallList[]> => {
    const url = `${environment.baseUrl}/DuraformDrafts/GetSmallList`;

    return this.http.get<DuraformDraftForSmallList[]>(url);
  };
}
