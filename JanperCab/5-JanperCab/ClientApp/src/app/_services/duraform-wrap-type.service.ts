import { environment } from 'src/environments/environment';
import { DuraformWrapTypeForSelection } from './../_models/duraform-wrap-type/DuraformWrapTypeForSelection';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DuraformWrapTypeService {
  constructor(private http: HttpClient) {}

  getAll = () => {
    return this.http.get<DuraformWrapTypeForSelection[]>(
      `${environment.baseUrl}/DuraformWrapTypes`
    );
  };

  getForDesign = (designId: number) => {
    return this.http.get<DuraformWrapTypeForSelection[]>(
      `${environment.baseUrl}/DuraformWrapTypes/ForDesign/${designId}`
    );
  };
}
