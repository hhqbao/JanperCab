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

  onAddPantryDoor = (pantryDoor: PantryDoorForCart) => {
    this.order.addPantryDoor(pantryDoor);

    this.dialog.success('New Pantry Door Added.');
  };

  onRemovePantryDoor = (pantryDoor: PantryDoorForCart) => {
    this.order.removePantryDoor(pantryDoor);
  };
}
