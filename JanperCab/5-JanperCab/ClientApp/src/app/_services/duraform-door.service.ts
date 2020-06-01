import { DuraformDoorForOrderMenu } from './../_models/duraform-door/DuraformDoorForOrderMenu';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DuraformDoorService {
  constructor(private http: HttpClient) {}

  getForOrderMenu = () => {
    return this.http.get<DuraformDoorForOrderMenu[]>(
      `${environment.baseUrl}/DuraformDoors/GetForOrderMenu`
    );
  };
}
