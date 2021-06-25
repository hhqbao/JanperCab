import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { DailyOrderDto } from '../_models/reports/DailyOrderDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: HttpClient) {}

  getOrderReport = (chosenDate: Date): Observable<DailyOrderDto[]> => {
    return this.http
      .get<DailyOrderDto[]>(
        `${environment.baseUrl}/Reports/daily-orders?chosenDate=${moment(
          chosenDate
        ).format('MM/DD/yyyy')}`
      )
      .pipe(
        map((response) => {
          return plainToClass(DailyOrderDto, response);
        })
      );
  };

  getOrderReportExcel = (chosenDate: Date): Observable<void> => {
    return this.http
      .get(
        `${environment.baseUrl}/Reports/Excel/daily-orders?chosenDate=${moment(
          chosenDate
        ).format('MM/DD/yyyy')}`,
        {
          responseType: 'blob',
        }
      )
      .pipe(
        map((response) => {
          const blob = new Blob([response], {
            type: response.type,
          });

          FileSaver.saveAs(
            blob,
            `Orders_${moment(chosenDate).format('DD-MM-yyyy')}.xlsx`
          );
        })
      );
  };
}
