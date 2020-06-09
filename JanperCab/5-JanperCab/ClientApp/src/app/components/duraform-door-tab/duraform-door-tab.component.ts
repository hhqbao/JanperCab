import { DialogService } from 'src/app/_services/dialog.service';
import { Component, OnInit, Input } from '@angular/core';
import { DuraformDoorOptionForList } from 'src/app/_models/duraform-door-option/DuraformDoorOptionForList';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformDoorForCart } from 'src/app/_models/duraform-door/DuraformDoorForCart';

@Component({
  selector: 'app-duraform-door-tab',
  templateUrl: 'duraform-door-tab.component.html',
})
export class DuraformDoorTabComponent implements OnInit {
  @Input() doorOptions: DuraformDoorOptionForList[] = [];

  constructor(
    public order: DuraformOrderService,
    private dialog: DialogService
  ) {}

  ngOnInit() {}

  onAddDoor = (door: DuraformDoorForCart) => {
    this.order.addDoor(door);

    this.dialog.success('New Door Added.');
  };

  onRemoveDoor = (door: DuraformDoorForCart) => {
    this.order.removeDoor(door);
  };
}
