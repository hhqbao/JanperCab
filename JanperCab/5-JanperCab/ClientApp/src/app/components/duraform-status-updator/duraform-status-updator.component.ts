import { DuraformProcessPackingDto } from './../../_models/DuraformProcess/DuraformProcessPackingDto';
import { DuraformProcessRoutingDto } from './../../_models/DuraformProcess/DuraformProcessRoutingDto';
import { DialogService } from './../../_services/dialog.service';
import { AuthService } from './../../_services/auth.service';
import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { DuraformProcessEnum } from 'src/app/_enums/DuraformProcessEnum';
import { DuraformProcessPressingDto } from 'src/app/_models/DuraformProcess/DuraformProcessPressingDto';
import { DuraformProcessCleaningDto } from 'src/app/_models/DuraformProcess/DuraformProcessCleaningDto';

@Component({
  selector: 'app-duraform-status-updator',
  templateUrl: 'duraform-status-updator.component.html',
})
export class DuraformStatusUpdatorComponent implements OnInit, OnDestroy {
  @Input() duraformEnquiry: DuraformEnquiryDto;

  eventSource: any;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    console.log('Duraform Order Status Updator Initialized');
    this.eventSource = new EventSourcePolyfill(
      `SSE/ProcessEvent/Duraform/${this.duraformEnquiry.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );

    this.eventSource.onmessage = (event: any) => {
      const processes = JSON.parse(event.data) as any[];

      processes.forEach((newProcess) => {
        const enquiryProcess = this.duraformEnquiry.duraformProcesses.find(
          (x) => x.id === newProcess.id
        );

        if (enquiryProcess) {
          enquiryProcess.isCurrent = newProcess.isCurrent;
          enquiryProcess.startTime = newProcess.startTime;
          enquiryProcess.endTime = newProcess.endTime;

          switch (enquiryProcess.duraformProcessType) {
            case DuraformProcessEnum.Routing:
              const routingProcess = enquiryProcess as DuraformProcessRoutingDto;
              routingProcess.machineId = newProcess.machineId;
              routingProcess.machineRouter = newProcess.machineRouter;
              break;
            case DuraformProcessEnum.Pressing:
              const pressingProcess = enquiryProcess as DuraformProcessPressingDto;
              pressingProcess.machineId = newProcess.machineId;
              pressingProcess.machinePresser = newProcess.machinePresser;
              break;
            case DuraformProcessEnum.Cleaning:
              const cleaningProcess = enquiryProcess as DuraformProcessCleaningDto;
              cleaningProcess.machineId = newProcess.machineId;
              cleaningProcess.machineCleaning = newProcess.machineCleaning;
              break;
            case DuraformProcessEnum.Packing:
              const packingProcess = enquiryProcess as DuraformProcessPackingDto;
              packingProcess.machineId = newProcess.machineId;
              packingProcess.machinePacking = newProcess.machinePacking;
              break;
          }
        }
      });
    };

    this.eventSource.onerror = (event: any) => {
      if (event.error) {
        this.dialogService.error(
          'Duraform Status Updator Error: ' + event.error
        );
      }
    };
  }

  ngOnDestroy(): void {
    console.log('Duraform Order Status Updator Closed');
    this.eventSource.close();
  }
}
