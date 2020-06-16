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
  @Input() duraformOptionTypes: DuraformOptionType[] = [];

  constructor(
    public order: DuraformOrderService,
    private dialog: DialogService
  ) {}

  ngOnInit() {}

  onAddDoor = (formGroup: FormGroup) => {
    if (formGroup.invalid) {
      return;
    }

    const door = new DuraformDoorForCart();
    door.update(formGroup.value, this.duraformOptionTypes);

    this.order.doors.unshift(door);

    this.dialog.success('New Door Added.');
  };

  onRemoveDoor = (door: DuraformDoorForCart) => {
    this.order.removeDoor(door);
  };
}
