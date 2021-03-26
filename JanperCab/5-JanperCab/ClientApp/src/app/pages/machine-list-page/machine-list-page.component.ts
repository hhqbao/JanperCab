import { MachineProdutionCurrentProcessDto } from './../../_models/machine/MachineProdutionCurrentProcessDto';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/_services/dialog.service';
import { MachineService } from '../../_services/machine.service';
import { MachineProductionListDto } from './../../_models/machine/MachineProductionListDto';
import { LayoutService } from 'src/app/_services/layout.service';
import { Component, OnInit } from '@angular/core';
import { MachineTypeEnum } from 'src/app/_enums/MachineTypeEnum';

@Component({
  selector: 'app-machine-list-page',
  templateUrl: 'machine-list-page.component.html',
})
export class MachineListPageComponent implements OnInit {
  selectedMachine: MachineProductionListDto = null;

  isLoading = true;
  machines: MachineProductionListDto[] = [];
  machineTypeEnum = MachineTypeEnum;

  constructor(
    private layoutService: LayoutService,
    private dialogService: DialogService,
    private machineService: MachineService,
    private router: Router
  ) {}

  ngOnInit() {
    this.layoutService.toggleLeftNav(true);
    this.layoutService.showLoadingPanel();
    this.machineService.getMachinesForProductionList().subscribe(
      (response) => {
        this.machines = response;
        this.layoutService.closeLoadingPanel();
        this.isLoading = false;
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.error(error);
      }
    );
  }

  getNumberOfParts = (
    processes: MachineProdutionCurrentProcessDto[]
  ): number => {
    let numberOfParts = 0;
    processes.forEach((x) => {
      numberOfParts += x.numberOfParts;
    });

    return numberOfParts;
  };

  onSelectMachine = (machine: MachineProductionListDto): void => {
    this.selectedMachine = machine;
  };
}
