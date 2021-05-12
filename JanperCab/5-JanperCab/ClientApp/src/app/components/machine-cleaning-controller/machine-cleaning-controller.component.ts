import { MachineProdutionCurrentProcessDto } from './../../_models/machine/MachineProdutionCurrentProcessDto';
import { LeadingPipe } from '../../_pipes/leading.pipe';
import { DialogService } from 'src/app/_services/dialog.service';
import { MachineService } from '../../_services/machine.service';
import { LayoutService } from 'src/app/_services/layout.service';
import { Component } from '@angular/core';
import { MachineProcessControllerDirective } from '../machine-process-controller/machine-process-controller.component';

@Component({
  selector: 'app-machine-cleaning-controller',
  templateUrl: 'machine-cleaning-controller.component.html',
})
export class MachineCleaningControllerComponent extends MachineProcessControllerDirective {
  currentProcess: MachineProdutionCurrentProcessDto = null;
  showControlBox = false;

  constructor(
    public dialogService: DialogService,
    public leadingPipe: LeadingPipe,
    public layoutService: LayoutService,
    public machineService: MachineService
  ) {
    super();
  }

  onScan = (sCode: any, iQty: any): void => {
    if (this.isScannerBusy || this.showControlBox || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.isScannerBusy = true;
    this.layoutService.showLoadingPanel();

    const enquiryId = Number(sCode);
    this.machineService.startCleaning(this.machine.id, enquiryId).subscribe(
      (response) => {
        if (
          !this.machine.currentProcesses.some(
            (x) => x.enquiryId === response.enquiryId
          )
        ) {
          this.machine.currentProcesses.push(response);
        }

        this.isLoading = false;
        this.isScannerBusy = false;

        this.currentProcess = response;
        this.showControlBox = true;

        this.layoutService.closeLoadingPanel();
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.alert('Cannot Process Cleaning', error, () => {
          this.isLoading = false;
          this.isScannerBusy = false;
        });
      }
    );
  };

  onComplete = () => {
    this.dialogService.confirm('Complete Cleaning', 'Are you sure?', () => {
      this.showControlBox = false;
      this.isLoading = true;
      this.layoutService.showLoadingPanel();
      this.machineService
        .finishCleaning(this.currentProcess.enquiryId)
        .subscribe(
          (response) => {
            this.machine.currentProcesses = this.machine.currentProcesses.filter(
              (x) => x.processId !== response.processId
            );

            this.currentProcess = null;
            this.showControlBox = false;
            this.isLoading = false;
            this.layoutService.closeLoadingPanel();
            this.dialogService.alert(
              'Complete Cleaning',
              'Order has been cleaned',
              null
            );
          },
          (error) => {
            this.isLoading = false;
            this.layoutService.closeLoadingPanel();
            this.dialogService.alert('Complete Cleaning Failed', error, () => {
              this.showControlBox = true;
            });
          }
        );
    });
  };
}
