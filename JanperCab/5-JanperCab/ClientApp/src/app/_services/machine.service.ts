import { EnquiryForRunSheetDto } from './../_models/enquiry/EnquiryForRunSheetDto';
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

  exportDuraformIcb = (enquiryId: number) => {
    return this.http.post(
      `${environment.baseUrl}/Machines/Icb-Export/Duraform/${enquiryId}`,
      null
    );
  };

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
        `${environment.baseUrl}/Processes/Routing/${routerId}/${enquiryId}`,
        null
      )
      .pipe(
        map((response) => {
          return plainToClass(MachineProdutionCurrentProcessDto, response);
        })
      );
  };

  processPressing = (
    presserId: number,
    enquiryId: number
  ): Observable<MachineProdutionCurrentProcessDto> => {
    return this.http
      .put<MachineProdutionCurrentProcessDto>(
        `${environment.baseUrl}/Processes/Pressing/${presserId}/${enquiryId}`,
        null
      )
      .pipe(
        map((response) => {
          return plainToClass(MachineProdutionCurrentProcessDto, response);
        })
      );
  };

  processCleaning = (
    cleanerId: number,
    enquiryId: number
  ): Observable<MachineProdutionCurrentProcessDto> => {
    return this.http
      .put<MachineProdutionCurrentProcessDto>(
        `${environment.baseUrl}/Processes/Cleaning/${cleanerId}/${enquiryId}`,
        null
      )
      .pipe(
        map((response) => {
          return plainToClass(MachineProdutionCurrentProcessDto, response);
        })
      );
  };

  processPacking = (
    packerId: number,
    enquiryId: number
  ): Observable<MachineProdutionCurrentProcessDto> => {
    return this.http
      .put<MachineProdutionCurrentProcessDto>(
        `${environment.baseUrl}/Processes/Packing/${packerId}/${enquiryId}`,
        null
      )
      .pipe(
        map((response) => {
          return plainToClass(MachineProdutionCurrentProcessDto, response);
        })
      );
  };

  processDelivering = (
    sheetId: number,
    enquiryId: number
  ): Observable<EnquiryForRunSheetDto> => {
    return this.http
      .put<EnquiryForRunSheetDto>(
        `${environment.baseUrl}/Processes/Delivering/${sheetId}/${enquiryId}`,
        null
      )
      .pipe(
        map((response) => {
          return plainToClass(EnquiryForRunSheetDto, response);
        })
      );
  };

  UndoDelivering = (enquiryId: number) => {
    return this.http.put(
      `${environment.baseUrl}/Processes/undo-delivering/${enquiryId}`,
      null
    );
  };
}
