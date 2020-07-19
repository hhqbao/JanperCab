import { environment } from 'src/environments/environment';
import { DuraformComponentTypeDto } from './../_models/duraform-component/DuraformComponentType';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DuraformComponentService {
  constructor(private http: HttpClient) {}

  getComponentTypes = () => {
    return this.http.get<DuraformComponentTypeDto[]>(
      `${environment.baseUrl}/DuraformComponents/GetTypes`
    );
  };
}
