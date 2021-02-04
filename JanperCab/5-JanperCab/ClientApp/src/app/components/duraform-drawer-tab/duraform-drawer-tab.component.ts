import { DuraformComponentService } from './../../_services/duraform-component.service';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformDrawerDto } from './../../_models/duraform-component/DuraformDrawerDto';
import { FormGroup } from '@angular/forms';
import { DialogService } from './../../_services/dialog.service';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { Component, OnInit } from '@angular/core';
import { ComponentType } from 'src/app/_enums/ComponentType';

@Component({
  selector: 'app-duraform-drawer-tab',
  templateUrl: 'duraform-drawer-tab.component.html',
})
export class DuraformDrawerTabComponent implements OnInit {
  constructor(
    private asset: DuraformAssetService,
    public order: DuraformOrderService,
    private dialog: DialogService,
    private componentService: DuraformComponentService
  ) {}

  ngOnInit() {}

  onAddDrawer = (formGroup: FormGroup) => {
    if (formGroup.invalid) {
      return;
    }

    const drawer = this.componentService.generateComponent(
      ComponentType.DuraformDrawer
    );
    this.componentService.updateComponent(drawer, formGroup.value);

    this.order.addComponent(drawer);

    this.dialog.success('New Drawer Added.');
  };

  onRemoveDrawer = (drawer: DuraformDrawerDto) => {
    this.order.removeComponent(drawer);
  };
}
