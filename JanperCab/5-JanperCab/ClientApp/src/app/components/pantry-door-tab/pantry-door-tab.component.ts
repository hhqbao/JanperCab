import { FormGroup } from '@angular/forms';
import { DialogService } from 'src/app/_services/dialog.service';
import { PantryDoorChairRailTypeForList } from 'src/app/_models/pantry-door-chair-rail-type/PantryDoorChairRailTypeForList';
import { PantryDoorForCart } from './../../_models/pantry-door/PantryDoorForCart';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pantry-door-tab',
  templateUrl: 'pantry-door-tab.component.html',
})
export class PantryDoorTabComponent implements OnInit {
  @Input() pantryDoorChairRailTypes: PantryDoorChairRailTypeForList[] = [];

  constructor(
    public order: DuraformOrderService,
    private dialog: DialogService
  ) {}

  ngOnInit() {}

  onAddPantryDoor = (formGroup: FormGroup) => {
    if (formGroup.invalid) {
      return;
    }

    const formValue = formGroup.value;

    const pantryDoor = new PantryDoorForCart();
    pantryDoor.update(formValue, this.pantryDoorChairRailTypes);

    this.order.pantryDoors.push(pantryDoor);

    this.dialog.success('New Pantry Door Added.');
  };

  onRemovePantryDoor = (pantryDoor: PantryDoorForCart) => {
    this.order.removePantryDoor(pantryDoor);
  };
}
