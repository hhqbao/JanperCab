import { DuraformDoorDto } from './../../_models/duraform-component/DuraformDoorDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { FormGroup } from '@angular/forms';
import { DialogService } from 'src/app/_services/dialog.service';
import { Component, OnInit } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';

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
    const door = this.asset.generateDuraformDoor();
    door.updateWithOption(formValue, this.asset.duraformOptionTypes);

    this.order.addComponent(door);

    this.dialog.success('New Door Added.');
  };

  onRemoveDoor = (door: DuraformDoorDto) => {
    this.order.removeComponent(door);
  };
}
