import { LeadingPipe } from '../../_pipes/leading.pipe';
import { DialogService } from 'src/app/_services/dialog.service';
import { MachineService } from '../../_services/machine.service';
import { LayoutService } from 'src/app/_services/layout.service';
import { Component } from '@angular/core';
import { MachineProcessControllerDirective } from '../machine-process-controller/machine-process-controller.component';
import { MachineProdutionCurrentProcessDto } from 'src/app/_models/machine/MachineProdutionCurrentProcessDto';

@Component({
  selector: 'app-machine-packing-controller',
  templateUrl: 'machine-packing-controller.component.html',
})
export class MachinePackingControllerComponent extends MachineProcessControllerDirective {
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
    if (this.isScannerBusy) {
      return;
    }

    this.isLoading = true;
    this.isScannerBusy = true;
    this.layoutService.showLoadingPanel();

    const enquiryId = Number(sCode);
    this.machineService.startPacking(this.machine.id, enquiryId).subscribe(
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
        this.dialogService.alert('Cannot Process Packing', error, () => {
          this.isLoading = false;
          this.isScannerBusy = false;
        });
      }
    );
  };

  onComplete = () => {
    this.dialogService.confirm('Complete Packing', 'Are you sure?', () => {
      this.showControlBox = false;
      this.isLoading = true;
      this.layoutService.showLoadingPanel();
      this.machineService
        .finishPacking(this.currentProcess.enquiryId)
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
              'Complete Packing',
              'Order has been packed',
              null
            );
          },
          (error) => {
            this.isLoading = false;
            this.layoutService.closeLoadingPanel();
            this.dialogService.alert('Complete Packing Failed', error, () => {
              this.showControlBox = true;
            });
          }
        );
    });
  };
}
