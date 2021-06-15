import { DuraformWrapTypeDto } from './../_models/duraform-wrap-type/DuraformWrapTypeDto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DuraformWrapTypeService {
  constructor(private http: HttpClient) {}

  getAll = () => {
    return this.http.get<DuraformWrapTypeDto[]>(
      `${environment.baseUrl}/DuraformWrapTypes`
    );
  };

  getForDesign = (designId: number) => {
    return this.http.get<DuraformWrapTypeDto[]>(
      `${environment.baseUrl}/DuraformWrapTypes/ForDesign/${designId}`
    );
  };
}
