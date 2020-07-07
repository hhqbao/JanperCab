import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DuraformOptionTypeDto } from '../_models/duraform-option/DuraformOptionTypeDto';

@Injectable({ providedIn: 'root' })
export class DuraformOptionTypeService {
  constructor(private http: HttpClient) {}

  getAll = () => {
    return this.http.get<DuraformOptionTypeDto[]>(
      `${environment.baseUrl}/DuraformOptionTypes`
    );
  };
}
