import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MachineProductionListDto } from '../_models/machine/MachineProductionListDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MachineProdutionCurrentProcessDto } from '../_models/machine/MachineProdutionCurrentProcessDto';

@Injectable({ providedIn: 'root' })
export class MachineService {
  constructor(private http: HttpClient) {}

  getMachinesForProductionList = (): Observable<MachineProductionListDto[]> => {
    return this.http.get<MachineProductionListDto[]>(
      `${environment.baseUrl}/Machines/Productions`
    );
  };

  processRouting = (
    routerId: number,
    enquiryId: number
  ): Observable<MachineProdutionCurrentProcessDto> => {
    return this.http
      .put<MachineProdutionCurrentProcessDto>(
        `${environment.baseUrl}/Machines/Process-Routing/${routerId}/${enquiryId}`,
        null
      )
      .pipe(
        map((response) => {
          return plainToClass(MachineProdutionCurrentProcessDto, response);
        })
      );
  };

  processPressing = (
    routerId: number,
    enquiryId: number
  ): Observable<MachineProdutionCurrentProcessDto> => {
    return this.http
      .put<MachineProdutionCurrentProcessDto>(
        `${environment.baseUrl}/Machines/Process-Pressing/${routerId}/${enquiryId}`,
        null
      )
      .pipe(
        map((response) => {
          return plainToClass(MachineProdutionCurrentProcessDto, response);
        })
      );
  };
}
