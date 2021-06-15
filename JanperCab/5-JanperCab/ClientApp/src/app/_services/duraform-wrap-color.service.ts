import { DuraformWrapColorDto } from './../_models/duraform-wrap-color/DuraformWrapColorDto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DuraformWrapColorService {
  constructor(private http: HttpClient) {}

  getAll = () => {
    return this.http.get<DuraformWrapColorDto[]>(
      `${environment.baseUrl}/DuraformWrapColors`
    );
  };

  getForDesign = (designId: number) => {
    return this.http.get<DuraformWrapColorDto[]>(
      `${environment.baseUrl}/DuraformWrapColors/ForDesign/${designId}`
    );
  };
}
