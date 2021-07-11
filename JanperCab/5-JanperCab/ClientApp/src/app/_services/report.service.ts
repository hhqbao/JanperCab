import { DailyProductionReportDto } from './../_models/reports/DailyProductionReportDto';
import { ProcessTypeEnum } from './../_enums/ProcessTypeEnum';
import { DailyInvoiceDto } from './../_models/reports/DailyInvoiceDto';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { DailyOrderDto } from '../_models/reports/DailyOrderDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import { MonthlyTallyReportDto } from '../_models/reports/MonthlyTallyReportDto';

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

  getInvoiceReport = (chosenDate: Date): Observable<DailyInvoiceDto[]> => {
    return this.http
      .get<DailyInvoiceDto[]>(
        `${environment.baseUrl}/Reports/daily-invoices?chosenDate=${moment(
          chosenDate
        ).format('MM/DD/yyyy')}`
      )
      .pipe(
        map((response) => {
          return plainToClass(DailyInvoiceDto, response);
        })
      );
  };

  getInvoiceReportExcel = (chosenDate: Date): Observable<void> => {
    return this.http
      .get(
        `${
          environment.baseUrl
        }/Reports/Excel/daily-invoices?chosenDate=${moment(chosenDate).format(
          'MM/DD/yyyy'
        )}`,
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
            `Invoices_${moment(chosenDate).format('DD-MM-yyyy')}.xlsx`
          );
        })
      );
  };

  getMonthlyTallyReport = (
    year: number,
    month: number
  ): Observable<MonthlyTallyReportDto[]> => {
    return this.http
      .get<MonthlyTallyReportDto[]>(
        `${environment.baseUrl}/Reports/monthly-tally/${year}/${month}`
      )
      .pipe(
        map((response) => {
          return plainToClass(MonthlyTallyReportDto, response);
        })
      );
  };

  getMonthlyTallyReportExcel = (
    year: number,
    month: number
  ): Observable<void> => {
    return this.http
      .get(
        `${environment.baseUrl}/Reports/excel/monthly-tally/${year}/${month}`,
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
            `MonthlyTally_${moment(new Date(year, month)).format(
              'MMM-yyyy'
            )}.xlsx`
          );
        })
      );
  };

  getDailyProductionReport = (
    stages: ProcessTypeEnum[]
  ): Observable<DailyProductionReportDto[]> => {
    let param = `stages=${stages[0]}`;

    for (let i = 1; i < stages.length; i++) {
      param += `&stages=${stages[i]}`;
    }

    return this.http
      .get<DailyProductionReportDto[]>(
        `${environment.baseUrl}/Reports/daily-production?${param}`
      )
      .pipe(
        map((response) => {
          return plainToClass(DailyProductionReportDto, response);
        })
      );
  };

  getDailyProductionReportExcel = (
    stages: ProcessTypeEnum[]
  ): Observable<void> => {
    let param = `stages=${stages[0]}`;

    for (let i = 1; i < stages.length; i++) {
      param += `&stages=${stages[i]}`;
    }

    return this.http
      .get(`${environment.baseUrl}/Reports/excel/daily-production?${param}`, {
        responseType: 'blob',
      })
      .pipe(
        map((response) => {
          const blob = new Blob([response], {
            type: response.type,
          });

          FileSaver.saveAs(
            blob,
            `Production-Report_${moment(new Date()).format('DD-MM-yyyy')}.xlsx`
          );
        })
      );
  };
}
