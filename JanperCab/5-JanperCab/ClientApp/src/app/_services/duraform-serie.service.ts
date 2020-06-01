import { DuraformSerieForList } from './../_models/duraform-serie/DuraformSerieForList';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DuraformSerieService {
  constructor(private http: HttpClient) {}

  getAll = () => {
    return this.http.get<DuraformSerieForList[]>(
      `${environment.baseUrl}/DuraformSeries`
    );
  };
}
