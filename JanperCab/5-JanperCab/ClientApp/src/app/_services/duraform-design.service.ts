import { DuraformDesignDto } from './../_models/duraform-design/DuraformDesignDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DuraformDesignService {
  constructor(private http: HttpClient) {}

  getAll = () => {
    return this.http.get<DuraformDesignDto[]>(
      `${environment.baseUrl}/DuraformDesigns`
    );
  };
}
