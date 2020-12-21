import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MachineFileService {
  constructor(private http: HttpClient) {}

  exportIcb = (id: string) => {
    return this.http.post(
      `${environment.baseUrl}/Machine/ExportIcb/${id}`,
      null
    );
  };
}
