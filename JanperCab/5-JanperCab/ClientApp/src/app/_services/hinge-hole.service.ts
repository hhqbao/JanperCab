import { HingeHoleStyleDto } from './../_models/hinge-hole-option/HingeHoleStyleDto';
import { HingeHoleTypeDto } from '../_models/hinge-hole-type/HingeHoleTypeDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HingeHoleService {
  constructor(private http: HttpClient) {}

  getActiveTypes = () => {
    return this.http.get<HingeHoleTypeDto[]>(
      `${environment.baseUrl}/HingeHoles/Types`
    );
  };

  getActiveStyles = () => {
    return this.http.get<HingeHoleStyleDto[]>(
      `${environment.baseUrl}/HingeHoles/Styles`
    );
  };
}
