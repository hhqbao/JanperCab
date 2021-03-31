import { LeadingPipe } from '../../_pipes/leading.pipe';
import { DialogService } from 'src/app/_services/dialog.service';
import { MachineService } from '../../_services/machine.service';
import { LayoutService } from 'src/app/_services/layout.service';
import { Component } from '@angular/core';
import * as scanner from 'onscan.js';
import { MachineProcessControllerDirective } from '../machine-process-controller/machine-process-controller.component';

@Component({
  selector: 'app-machine-presser-controller',
  templateUrl: 'machine-presser-controller.component.html',
})
export class MachinePresserControllerComponent extends MachineProcessControllerDirective {
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
    this.machineService.processPressing(this.machine.id, enquiryId).subscribe(
      (response) => {
        let msg = `[${this.leadingPipe.transform(
          response.enquiryId,
          '000000'
        )}]`;
        if (response.endTime) {
          msg += ` has been pressed.`;
          this.machine.currentProcesses = this.machine.currentProcesses.filter(
            (x) => x.processId !== response.processId
          );
        } else {
          msg += ` has been added to pressing list.`;
          this.machine.currentProcesses.push(response);
        }

        this.layoutService.closeLoadingPanel();
        this.dialogService.alert('Process Pressing', msg, () => {
          this.isLoading = false;
          this.isScannerBusy = false;
        });
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.alert('Cannot Process Pressing', error, () => {
          this.isLoading = false;
          this.isScannerBusy = false;
        });
      }
    );
  };
}
