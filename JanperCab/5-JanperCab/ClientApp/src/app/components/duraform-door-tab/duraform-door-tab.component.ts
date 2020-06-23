import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { FormGroup } from '@angular/forms';
import { DialogService } from 'src/app/_services/dialog.service';
import { Component, OnInit, Input } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformDoorForCart } from 'src/app/_models/duraform-door/DuraformDoorForCart';
import { DuraformOptionType } from 'src/app/_models/duraform-option/DuraformOptionType';

@Component({
  selector: 'app-duraform-door-tab',
  templateUrl: 'duraform-door-tab.component.html',
})
export class DuraformDoorTabComponent implements OnInit {
  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private dialog: DialogService
  ) {}

  ngOnInit() {}

  onAddDoor = (formGroup: FormGroup) => {
    if (formGroup.invalid) {
      return;
    }

    const formValue = formGroup.value;
    const door = new DuraformDoorForCart();
    door.updateWithOption(formValue, this.asset.duraformOptionTypes);

    this.order.doors.unshift(door);

    this.dialog.success('New Door Added.');
  };

  onRemoveDoor = (door: DuraformDoorForCart) => {
    this.order.removeDoor(door);
  };
}
