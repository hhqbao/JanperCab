import { DuraformPantryDoorDto } from './../../_models/duraform-component/DuraformPantryDoorDto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-delivery-docket-pantry-doors',
  templateUrl: 'delivery-docket-pantry-doors.component.html',
})
export class DeliveryDocketPantryDoorsComponent implements OnInit {
  @Input() pantryDoors: DuraformPantryDoorDto[] = [];

  constructor() {}

  ngOnInit() {}
}
