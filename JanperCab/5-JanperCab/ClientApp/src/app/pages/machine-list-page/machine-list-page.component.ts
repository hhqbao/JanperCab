import { AuthService } from './../../_services/auth.service';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { MachineProdutionCurrentProcessDto } from './../../_models/machine/MachineProdutionCurrentProcessDto';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/_services/dialog.service';
import { MachineService } from '../../_services/machine.service';
import { MachineProductionListDto } from './../../_models/machine/MachineProductionListDto';
import { LayoutService } from 'src/app/_services/layout.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MachineTypeEnum } from 'src/app/_enums/MachineTypeEnum';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-machine-list-page',
  templateUrl: 'machine-list-page.component.html',
})
export class MachineListPageComponent implements OnInit, OnDestroy {
  selectedMachine: MachineProductionListDto = null;

  isLoading = true;
  machines: MachineProductionListDto[] = [];
  machineTypeEnum = MachineTypeEnum;

  eventSource: any;

  constructor(
    private layoutService: LayoutService,
    private dialogService: DialogService,
    private machineService: MachineService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    document.title = 'Production';

    this.layoutService.toggleLeftNav(true);
    this.layoutService.showLoadingPanel();
    this.machineService.getMachinesForProductionList().subscribe(
      (response) => {
        this.machines = response;
        this.layoutService.closeLoadingPanel();
        this.isLoading = false;
        this.autoPull();
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    console.log('Machine Production List Updator Closed');
    this.eventSource.close();
  }

  autoPull = () => {
    console.log('Machine Production List Updator Initialized');
    this.eventSource = new EventSourcePolyfill(`SSE/MachineEvent/Productions`, {
      headers: {
        Authorization: `Bearer ${this.authService.token}`,
      },
    });

    this.eventSource.onmessage = (event: any) => {
      const pulledMachines = plainToClass(
        MachineProductionListDto,
        JSON.parse(event.data) as any[]
      );

      pulledMachines.forEach((pulledMachine) => {
        const existMachine = this.machines.find(
          (x) => x.id === pulledMachine.id
        );

        if (existMachine) {
          existMachine.currentProcesses = pulledMachine.currentProcesses;
        }
      });
    };

    this.eventSource.onerror = (event: any) => {
      if (event.error) {
        this.dialogService.error(
          'Machine Production List Updator Error: ' + event.error
        );
      }
    };
  };

  getNumberOfParts = (
    processes: MachineProdutionCurrentProcessDto[]
  ): number => {
    let numberOfParts = 0;
    processes.forEach((x) => {
      numberOfParts += x.numberOfParts;
    });

    return numberOfParts;
  };
}
