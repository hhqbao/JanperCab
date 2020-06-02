import { DuraformWrapColorForSelection } from './../_models/duraform-wrap-color/DuraformWrapColorForSelection';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DuraformWrapColorService {
  constructor(private http: HttpClient) {}

  getAll = () => {
    return this.http.get<DuraformWrapColorForSelection[]>(
      `${environment.baseUrl}/DuraformWrapColors`
    );
  };

  getForDoor = (doorId: number) => {
    return this.http.get<DuraformWrapColorForSelection[]>(
      `${environment.baseUrl}/DuraformWrapColors/ForDoor/${doorId}`
    );
  };
}
