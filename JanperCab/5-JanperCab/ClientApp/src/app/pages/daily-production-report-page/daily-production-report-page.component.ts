import { ProcessTypeEnum } from './../../_enums/ProcessTypeEnum';
import { DailyProductionReportDto } from './../../_models/reports/DailyProductionReportDto';
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

  statusEnums = ProcessTypeEnum;

  displayStages: ProcessTypeEnum[] = [];
  selectedStages: ProcessTypeEnum[] = [];

  constructor(
    private reportService: ReportService,
    private layoutService: LayoutService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    const keys = Object.keys(ProcessTypeEnum).filter(
      (x) =>
        !isNaN(ProcessTypeEnum[x]) &&
        ProcessTypeEnum[x] !== ProcessTypeEnum.PickingUp &&
        ProcessTypeEnum[x] !== ProcessTypeEnum.PickedUp &&
        ProcessTypeEnum[x] !== ProcessTypeEnum.Delivering &&
        ProcessTypeEnum[x] !== ProcessTypeEnum.Delivered &&
        ProcessTypeEnum[x] !== ProcessTypeEnum.Invoiced
    );

    keys.forEach((key) => {
      this.displayStages.push(ProcessTypeEnum[key]);
    });
  }

  onSelectStage = (stage: ProcessTypeEnum) => {
    if (this.isLoading) {
      return;
    }

    if (this.selectedStages.some((x) => x === stage)) {
      this.selectedStages = this.selectedStages.filter((x) => x !== stage);

      if (this.selectedStages.length === 0) {
        this.dailyProductions = [];
        return;
      }
    } else {
      this.selectedStages.push(stage);
    }

    this.loadReport();
  };

  loadReport = () => {
    this.isLoading = true;
    this.layoutService.showLoadingPanel();
    this.reportService.getDailyProductionReport(this.selectedStages).subscribe(
      (response) => {
        this.dailyProductions = response;

        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
      },
      (error) => {
        this.isLoading = false;
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
      .getDailyProductionReportExcel(this.selectedStages)
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
