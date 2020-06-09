import { environment } from './../../environments/environment';
import { DuraformArchForList } from './../_models/duraform-arch/DuraformArchForList';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DuraformArchService {
  constructor(private http: HttpClient) {}

  getAll = () => {
    return this.http.get<DuraformArchForList[]>(
      `${environment.baseUrl}/DuraformArches`
    );
  };
}
