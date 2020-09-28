import { CabinetMakerListComponent } from './../../components/cabinet-maker-list/cabinet-maker-list.component';
import { CabinetMakerSearchFilterValues } from './../../_models/commons/CabinetMakerSearchFilterValues';
import { ItemList } from './../../_models/commons/ItemList';
import { DialogService } from 'src/app/_services/dialog.service';
import { CustomerService } from './../../_services/customer.service';
import { AuthService } from 'src/app/_services/auth.service';
import { CabinetMakerDto } from './../../_models/customer/CabinetMakerDto';
import { LayoutService } from 'src/app/_services/layout.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { classToClassFromExist } from 'class-transformer';

@Component({
  selector: 'app-cabinet-maker-list-page',
  templateUrl: 'cabinet-maker-list-page.component.html',
})
export class CabinetMakerListPageComponent implements OnInit {
  @ViewChild('cabinetMakerList') cabinetMakerList: CabinetMakerListComponent;

  selectedCabinetMaker: CabinetMakerDto = null;

  showCabinetMakerForm = false;

  constructor(private layout: LayoutService, private dialog: DialogService) {}

  ngOnInit() {}

  onAddNewClick = () => {
    this.selectedCabinetMaker = null;
    this.showCabinetMakerForm = true;
  };

  onSelectMaker = (maker: CabinetMakerDto) => {
    this.selectedCabinetMaker = maker;
    this.showCabinetMakerForm = true;
  };

  onSubmitMakerForm = (maker: CabinetMakerDto) => {
    this.showCabinetMakerForm = false;
    this.cabinetMakerList.loadCabinetMakerList();
  };
}
