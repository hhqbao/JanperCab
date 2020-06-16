import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DuraformOptionType } from '../_models/duraform-option/DuraformOptionType';

@Injectable({ providedIn: 'root' })
export class DuraformOptionTypeService {
  constructor(private http: HttpClient) {}

  getAll = () => {
    return this.http.get<DuraformOptionType[]>(
      `${environment.baseUrl}/DuraformOptionTypes`
    );
  };
}
