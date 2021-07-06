import { FormControl, FormBuilder } from '@angular/forms';
import { ProcessTypeEnum } from './../../_enums/ProcessTypeEnum';
import { DailyProductionReportDto } from './../../_models/reports/DailyProductionReportDto';
import { DailyOrderDto } from '../../_models/reports/DailyOrderDto';
import { DialogService } from '../../_services/dialog.service';
import { LayoutService } from '../../_services/layout.service';
import { ReportService } from '../../_services/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-production-report-page',
  templateUrl: 'daily-production-report-page.component.html',
})
export class DailyProductionReportPageComponent implements OnInit {
  isLoading = false;
  dailyProductions: DailyProductionReportDto[] = [];

  chosenStage: ProcessTypeEnum = null;
  statusEnums = ProcessTypeEnum;

  constructor(
    private reportService: ReportService,
    private layoutService: LayoutService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {}

  loadReport = () => {
    if (!this.chosenStage) {
      return;
    }

    this.isLoading = true;
    this.layoutService.showLoadingPanel();
    this.reportService.getDailyProductionReport(this.chosenStage).subscribe(
      (response) => {
        this.dailyProductions = response;

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
    if (this.dailyProductions.length === 0) {
      return;
    }

    this.layoutService.showLoadingPanel();
    this.reportService
      .getDailyProductionReportExcel(this.chosenStage)
      .subscribe(
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
