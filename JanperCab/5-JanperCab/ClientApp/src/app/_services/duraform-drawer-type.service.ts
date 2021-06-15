import { DuraformDrawerTypeDto } from './../_models/duraform-drawer-type/DuraformDrawerTypeDto';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DuraformDrawerTypeService {
  constructor(private http: HttpClient) {}

  getAllActive = () => {
    return this.http.get<DuraformDrawerTypeDto[]>(
      `${environment.baseUrl}/DuraformDrawerTypes`
    );
  };
}
