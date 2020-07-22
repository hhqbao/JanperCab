import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  countDraft = () => {
    return this.http.get<number>(`${environment.baseUrl}/DuraformDrafts/Count`);
  };
}
