import { DuraformDesignForOrderMenu } from '../_models/duraform-design/DuraformDesignForOrderMenu';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DuraformDesignService {
  constructor(private http: HttpClient) {}

  getForOrderMenu = () => {
    return this.http.get<DuraformDesignForOrderMenu[]>(
      `${environment.baseUrl}/DuraformDesigns/GetForOrderMenu`
    );
  };
}
