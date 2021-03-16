import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MachineFileService {
  constructor(private http: HttpClient) {}

  exportDuraformIcb = (enquiryId: number) => {
    return this.http.post(
      `${environment.baseUrl}/machine/icb/duraform/${enquiryId}`,
      null
    );
  };
}
