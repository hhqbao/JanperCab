import { PantryDoorChairRailTypeDto } from './../_models/pantry-door-chair-rail-type/PantryDoorChairRailTypeDto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PantryDoorChairRailTypeService {
  constructor(private http: HttpClient) {}

  getAllActive = () => {
    return this.http.get<PantryDoorChairRailTypeDto[]>(
      `${environment.baseUrl}/PantryDoorChairRailTypes`
    );
  };
}
