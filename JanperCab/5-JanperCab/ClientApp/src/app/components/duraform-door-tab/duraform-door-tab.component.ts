import { DuraformComponentService } from './../../_services/duraform-component.service';
import { ComponentType } from './../../_enums/ComponentType';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { FormGroup } from '@angular/forms';
import { DialogService } from 'src/app/_services/dialog.service';
import { Component, OnInit } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformTabComponent } from '../duraform-tab/duraform-tab.component';

@Component({
  selector: 'app-duraform-door-tab',
  templateUrl: 'duraform-door-tab.component.html',
})
export class DuraformDoorTabComponent
  extends DuraformTabComponent
  implements OnInit {
  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    public dialog: DialogService,
    private componentService: DuraformComponentService
  ) {
    super(dialog, order);
  }

  ngOnInit() {}

  onAddComponent(formGroup: FormGroup): void {
    const door = this.componentService.generateComponent(
      ComponentType.DuraformDoor
    );
    this.componentService.updateComponent(door, formGroup.value);

    this.order.addComponent(door);

    this.dialog.success('New Door Added.');
  }
}
