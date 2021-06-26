import { DailyInvoiceDto } from './../../_models/reports/DailyInvoiceDto';
import { DialogService } from '../../_services/dialog.service';
import { LayoutService } from '../../_services/layout.service';
import { ReportService } from '../../_services/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-invoice-report-page',
  templateUrl: 'daily-invoice-report-page.component.html',
})
export class DailyInvoiceReportPageComponent implements OnInit {
  isLoading = false;
  dailyInvoices: DailyInvoiceDto[] = [];

  chosenDate = new Date();

  constructor(
    private reportService: ReportService,
    private layoutService: LayoutService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.onDateSelect(new Date());
  }

  loadReport = (chosenDate: Date) => {
    this.isLoading = true;
    this.layoutService.showLoadingPanel();
    this.reportService.getInvoiceReport(chosenDate).subscribe(
      (response) => {
        this.dailyInvoices = response;

        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.error(error);
      }
    );
  };

  onDateSelect = (pickedDate: Date) => {
    this.chosenDate = pickedDate;
    this.loadReport(this.chosenDate);
  };

  onDownloadExcel = () => {
    if (this.dailyInvoices.length === 0) {
      return;
    }

    this.layoutService.showLoadingPanel();
    this.reportService.getInvoiceReportExcel(this.chosenDate).subscribe(
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
