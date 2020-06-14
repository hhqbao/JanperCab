import { DuraformWrappingOptionForList } from './../_models/duraform-wrapping-option/DuraformWrappingOptionForList';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DuraformWrappingOptionService {
  constructor(private http: HttpClient) {}

  getAllActive = () => {
    return this.http.get<DuraformWrappingOptionForList[]>(
      `${environment.baseUrl}/DuraformWrappingOptions`
    );
  };
}
