import { DailyOrderDto } from '../../_models/reports/DailyOrderDto';
import { DialogService } from '../../_services/dialog.service';
import { LayoutService } from '../../_services/layout.service';
import { ReportService } from '../../_services/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-order-report-page',
  templateUrl: 'daily-order-report-page.component.html',
})
export class DailyOrderReportPageComponent implements OnInit {
  isLoading = false;
  dailyOrders: DailyOrderDto[] = [];

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
    this.reportService.getOrderReport(chosenDate).subscribe(
      (response) => {
        this.dailyOrders = response;

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
    if (this.dailyOrders.length === 0) {
      return;
    }

    this.layoutService.showLoadingPanel();
    this.reportService.getOrderReportExcel(this.chosenDate).subscribe(
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
