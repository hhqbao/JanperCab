import { MiscItemDto } from './../_models/duraform-misc/MiscItemDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MiscItemService {
  constructor(private http: HttpClient) {}

  getAllActive = () => {
    return this.http.get<MiscItemDto[]>(
      `${environment.baseUrl}/MiscItems/GetAllActive`
    );
  };
}
