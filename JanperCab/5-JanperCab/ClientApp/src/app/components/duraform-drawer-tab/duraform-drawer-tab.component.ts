import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformDrawerDto } from './../../_models/duraform-component/DuraformDrawerDto';
import { FormGroup } from '@angular/forms';
import { DialogService } from './../../_services/dialog.service';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duraform-drawer-tab',
  templateUrl: 'duraform-drawer-tab.component.html',
})
export class DuraformDrawerTabComponent implements OnInit {
  constructor(
    private asset: DuraformAssetService,
    public order: DuraformOrderService,
    private dialog: DialogService
  ) {}

  ngOnInit() {}

  onAddDrawer = (formGroup: FormGroup) => {
    if (formGroup.invalid) {
      return;
    }

    const formValue = formGroup.value;
    const drawer = this.asset.generateDuraformDrawer();
    drawer.update(formValue);

    this.order.addComponent(drawer);

    this.dialog.success('New Drawer Added.');
  };

  onRemoveDrawer = (drawer: DuraformDrawerDto) => {
    this.order.removeComponent(drawer);
  };
}
