import { DuraformArchDto } from './../_models/duraform-arch/DuraformArchDto';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DuraformArchService {
  constructor(private http: HttpClient) {}

  getAll = () => {
    return this.http.get<DuraformArchDto[]>(
      `${environment.baseUrl}/DuraformArches`
    );
  };
}
