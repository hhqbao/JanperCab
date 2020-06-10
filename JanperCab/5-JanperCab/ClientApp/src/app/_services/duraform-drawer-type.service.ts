import { environment } from './../../environments/environment';
import { DuraformDrawerTypeForList } from './../_models/duraform-drawer-type/DuraformDrawerTypeForList';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DuraformDrawerTypeService {
  constructor(private http: HttpClient) {}

  getAllActive = () => {
    return this.http.get<DuraformDrawerTypeForList[]>(
      `${environment.baseUrl}/DuraformDrawerTypes`
    );
  };
}
