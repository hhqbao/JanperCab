import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { DialogService } from '../../_services/dialog.service';
import { LayoutService } from '../../_services/layout.service';
import { ReportService } from '../../_services/report.service';
import { Component, OnInit } from '@angular/core';
import { MonthlyTallyReportDto } from 'src/app/_models/reports/MonthlyTallyReportDto';
import * as moment from 'moment';

@Component({
  selector: 'app-monthly-tally-report-page',
  templateUrl: 'monthly-tally-report-page.component.html',
})
export class MonthlyTallyReportPageComponent implements OnInit {
  isInitialized = false;
  isLoading = false;

  report: MonthlyTallyReportDto[] = [];
  formGroup: FormGroup;

  selectableYears: any[] = [];
  selectableMonths: any[] = [];

  get yearControl(): AbstractControl {
    return this.formGroup.get('year');
  }

  get monthControl(): AbstractControl {
    return this.formGroup.get('month');
  }

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private layoutService: LayoutService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    for (let i = currentYear - 5; i <= currentYear; i++) {
      this.selectableYears.push({ value: i, text: i });
    }

    for (let i = 0; i < 12; i++) {
      const date = new Date(currentYear, i);

      this.selectableMonths.push({
        value: i + 1,
        text: moment(date).format('MMMM'),
      });
    }

    this.formGroup = this.fb.group({
      year: [currentYear, [Validators.required]],
      month: [currentMonth, [Validators.required]],
    });

    this.isInitialized = true;

    this.onLoadReport();
  }

  onLoadReport = () => {
    this.isLoading = true;
    this.layoutService.showLoadingPanel();

    const { year, month } = this.formGroup.value;

    this.reportService.getMonthlyTallyReport(year, month).subscribe(
      (response) => {
        this.report = response;

        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.error(error);
      }
    );
  };

  onDownloadExcel = () => {
    if (this.report.length === 0) {
      return;
    }

    this.layoutService.showLoadingPanel();

    const { year, month } = this.formGroup.value;

    this.reportService.getMonthlyTallyReportExcel(year, month).subscribe(
      () => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.success('Download File Success');
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.error(error);
      }
    );
  };
}
