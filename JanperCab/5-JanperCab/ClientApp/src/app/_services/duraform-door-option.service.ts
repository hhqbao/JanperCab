import { environment } from './../../environments/environment';
import { DuraformDoorOptionForList } from './../_models/duraform-door-option/DuraformDoorOptionForList';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DuraformDoorOptionService {
  constructor(private http: HttpClient) {}

  getAllActive = () => {
    return this.http.get<DuraformDoorOptionForList[]>(
      `${environment.baseUrl}/DuraformDoorOptions`
    );
  };
}
