import { DuraformComponentService } from './../../_services/duraform-component.service';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformDrawerDto } from './../../_models/duraform-component/DuraformDrawerDto';
import { FormGroup } from '@angular/forms';
import { DialogService } from './../../_services/dialog.service';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { Component, OnInit } from '@angular/core';
import { ComponentType } from 'src/app/_enums/ComponentType';
import { DuraformTabComponent } from '../duraform-tab/duraform-tab.component';

@Component({
  selector: 'app-duraform-drawer-tab',
  templateUrl: 'duraform-drawer-tab.component.html',
})
export class DuraformDrawerTabComponent
  extends DuraformTabComponent
  implements OnInit {
  constructor(
    public order: DuraformOrderService,
    public dialog: DialogService,
    private componentService: DuraformComponentService
  ) {
    super(dialog, order);
  }

  ngOnInit() {}

  onAddComponent(formGroup: FormGroup): void {
    const drawer = this.componentService.generateComponent(
      ComponentType.DuraformDrawer
    );
    this.componentService.updateComponent(drawer, formGroup.value);

    this.order.addComponent(drawer);

    this.dialog.success('New Drawer Added.');
  }
}
