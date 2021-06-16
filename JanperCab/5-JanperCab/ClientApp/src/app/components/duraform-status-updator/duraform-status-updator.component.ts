import { ProcessDeliveringDto } from '../../_models/process/ProcessDeliveringDto';
import { ProcessTypeEnum } from './../../_enums/ProcessTypeEnum';
import { ProcessPackingDto } from '../../_models/process/ProcessPackingDto';
import { ProcessRoutingDto } from '../../_models/process/ProcessRoutingDto';
import { DialogService } from './../../_services/dialog.service';
import { AuthService } from './../../_services/auth.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { ProcessPressingDto } from 'src/app/_models/process/ProcessPressingDto';
import { ProcessCleaningDto } from 'src/app/_models/process/ProcessCleaningDto';
import { EnquiryDto } from 'src/app/_models/enquiry/EnquiryDto';

@Component({
  selector: 'app-duraform-status-updator',
  templateUrl: 'duraform-status-updator.component.html',
})
export class DuraformStatusUpdatorComponent implements OnInit, OnDestroy {
  @Input() enquiry: EnquiryDto;

  eventSource: any;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    console.log('Order Status Updator Initialized');
    this.eventSource = new EventSourcePolyfill(
      `SSE/ProcessEvent/${this.enquiry.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );

    this.eventSource.onmessage = (event: any) => {
      const processes = JSON.parse(event.data) as any[];

      if (this.enquiry.currentStatus) {
        if (
          this.enquiry.currentStatus.processType !== ProcessTypeEnum.PreRoute &&
          this.enquiry.isDeclineable
        ) {
          this.enquiry.isDeclineable = false;
        }
      }

      processes.forEach((newProcess) => {
        const enquiryProcess = this.enquiry.processes.find(
          (x) => x.id === newProcess.id
        );

        if (enquiryProcess) {
          enquiryProcess.isCurrent = newProcess.isCurrent;
          enquiryProcess.startTime = newProcess.startTime;
          enquiryProcess.endTime = newProcess.endTime;
          enquiryProcess.onHoldComponents = newProcess.onHoldComponents;

          switch (enquiryProcess.processType) {
            case ProcessTypeEnum.Routing:
              const routingProcess = enquiryProcess as ProcessRoutingDto;
              routingProcess.machineId = newProcess.machineId;
              routingProcess.machineRouter = newProcess.machineRouter;
              break;
            case ProcessTypeEnum.Pressing:
              const pressingProcess = enquiryProcess as ProcessPressingDto;
              pressingProcess.machineId = newProcess.machineId;
              pressingProcess.machinePresser = newProcess.machinePresser;
              break;
            case ProcessTypeEnum.Cleaning:
              const cleaningProcess = enquiryProcess as ProcessCleaningDto;
              cleaningProcess.machineId = newProcess.machineId;
              cleaningProcess.machineCleaning = newProcess.machineCleaning;
              break;
            case ProcessTypeEnum.Packing:
              const packingProcess = enquiryProcess as ProcessPackingDto;
              packingProcess.machineId = newProcess.machineId;
              packingProcess.machinePacking = newProcess.machinePacking;
              break;
            case ProcessTypeEnum.Delivering:
              const deliveringProcess = enquiryProcess as ProcessDeliveringDto;
              deliveringProcess.deliverySheetId = newProcess.deliverySheetId;
              deliveringProcess.deliverySheet = newProcess.deliverySheet;
              break;
          }
        }
      });
    };

    this.eventSource.onerror = (event: any) => {
      if (event.error) {
        this.dialogService.error('Status Updator Error: ' + event.error);
      }
    };
  }

  ngOnDestroy(): void {
    console.log('Order Status Updator Closed');
    this.eventSource.close();
  }
}
