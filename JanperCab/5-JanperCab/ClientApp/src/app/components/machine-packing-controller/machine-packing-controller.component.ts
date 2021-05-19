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

  scannedEnquiryId: number = null;

  showOptionBox = false;
  showPackingLabel = false;

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

    this.scannedEnquiryId = Number(sCode);
    this.isScannerBusy = true;
    this.showOptionBox = true;
  };

  onCloseOptionBox = () => {
    this.scannedEnquiryId = null;
  };

  onClosePackingLabelPdf = () => {
    this.isScannerBusy = false;
    this.showPackingLabel = false;
    this.scannedEnquiryId = null;
  };

  onProcessPacking = () => {
    this.showOptionBox = false;

    if (!this.scannedEnquiryId) {
      this.isScannerBusy = false;

      return;
    }

    this.isLoading = true;
    this.layoutService.showLoadingPanel();

    this.machineService
      .startPacking(this.machine.id, this.scannedEnquiryId)
      .subscribe(
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
      this.isLoading = true;
      this.layoutService.showLoadingPanel();
      this.machineService
        .finishPacking(this.currentProcess.enquiryId)
        .subscribe(
          (response) => {
            this.machine.currentProcesses =
              this.machine.currentProcesses.filter(
                (x) => x.processId !== response.processId
              );

            this.currentProcess = null;

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
            this.dialogService.alert('Complete Packing Failed', error, null);
          }
        );
    });
  };
}
