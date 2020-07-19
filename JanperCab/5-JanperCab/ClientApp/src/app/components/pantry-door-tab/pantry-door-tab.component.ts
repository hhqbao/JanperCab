import { DuraformPantryDoorDto } from './../../_models/duraform-component/DuraformPantryDoorDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { FormGroup } from '@angular/forms';
import { DialogService } from 'src/app/_services/dialog.service';
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

    const pantryDoor = this.asset.generatePantryDoor();
    pantryDoor.updateWithOption(
      formGroup.value,
      this.asset.duraformOptionTypes
    );

    this.order.addComponent(pantryDoor);

    this.dialog.success('New Pantry Door Added.');
  };

  onRemovePantryDoor = (pantryDoor: DuraformPantryDoorDto) => {
    this.order.removeComponent(pantryDoor);
  };
}
