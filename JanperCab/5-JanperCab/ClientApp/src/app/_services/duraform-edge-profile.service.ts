import { environment } from 'src/environments/environment';
import { DuraformEdgeProfileForList } from './../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DuraformEdgeProfileService {
  constructor(private http: HttpClient) {}

  getAll = () => {
    return this.http.get<DuraformEdgeProfileForList[]>(
      `${environment.baseUrl}/DuraformEdgeProfiles`
    );
  };
}
