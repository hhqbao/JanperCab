import { Observable } from 'rxjs';
import { DuraformEdgeProfileDto } from './../_models/duraform-edge-profile/DuraformEdgeProfileDto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DuraformEdgeProfileService {
  constructor(private http: HttpClient) {}

  get = (id: number): Observable<DuraformEdgeProfileDto> => {
    return this.http.get<DuraformEdgeProfileDto>(
      `${environment.baseUrl}/DuraformEdgeProfiles/${id}`
    );
  };

  getAll = () => {
    return this.http.get<DuraformEdgeProfileDto[]>(
      `${environment.baseUrl}/DuraformEdgeProfiles`
    );
  };
}
