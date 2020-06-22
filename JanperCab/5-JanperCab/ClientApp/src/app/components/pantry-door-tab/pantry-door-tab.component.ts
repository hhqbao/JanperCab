import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { FormGroup } from '@angular/forms';
import { DialogService } from 'src/app/_services/dialog.service';
import { PantryDoorForCart } from './../../_models/pantry-door/PantryDoorForCart';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pantry-door-tab',
  templateUrl: 'pantry-door-tab.component.html',
})
export class PantryDoorTabComponent implements OnInit {
  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private dialog: DialogService
  ) {}

  ngOnInit() {}

  onAddPantryDoor = (formGroup: FormGroup) => {
    if (formGroup.invalid) {
      return;
    }

    const pantryDoor = new PantryDoorForCart();
    pantryDoor.update(
      formGroup.value,
      this.asset.pantryDoorChairRailTypes,
      this.asset.duraformOptionTypes
    );

    this.order.pantryDoors.unshift(pantryDoor);

    this.dialog.success('New Pantry Door Added.');
  };

  onRemovePantryDoor = (pantryDoor: PantryDoorForCart) => {
    this.order.removePantryDoor(pantryDoor);
  };
}
