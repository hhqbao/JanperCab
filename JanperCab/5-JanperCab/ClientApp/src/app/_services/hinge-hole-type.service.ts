import { HingeHoleTypeDto } from './../_models/hinge-hole-type/HingeHoleTypeDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HingeHoleTypeService {
  constructor(private http: HttpClient) {}

  getAllActive = () => {
    return this.http.get<HingeHoleTypeDto[]>(
      `${environment.baseUrl}/HingeHoleTypes`
    );
  };
}
