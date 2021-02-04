import { DuraformComponentService } from './../../_services/duraform-component.service';
import { ComponentType } from './../../_enums/ComponentType';
import { DuraformDoorCartItemComponent } from './../duraform-door-cart-item/duraform-door-cart-item.component';
import { DuraformDoorDto } from './../../_models/duraform-component/DuraformDoorDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { FormGroup, AbstractControl } from '@angular/forms';
import { DialogService } from 'src/app/_services/dialog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';

@Component({
  selector: 'app-duraform-door-tab',
  templateUrl: 'duraform-door-tab.component.html',
})
export class DuraformDoorTabComponent implements OnInit {
  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private dialog: DialogService,
    private componentService: DuraformComponentService
  ) {}

  ngOnInit() {}

  onAddDoor = (formGroup: FormGroup) => {
    if (formGroup.invalid) {
      return;
    }

    const door = this.componentService.generateComponent(
      ComponentType.DuraformDoor
    );
    this.componentService.updateComponent(door, formGroup.value);

    this.order.addComponent(door);

    this.dialog.success('New Door Added.');
  };

  onRemoveDoor = (door: DuraformDoorDto) => {
    this.dialog.confirm('Remove Door', 'Are you sure?', () => {
      this.order.removeComponent(door);
    });
  };
}
