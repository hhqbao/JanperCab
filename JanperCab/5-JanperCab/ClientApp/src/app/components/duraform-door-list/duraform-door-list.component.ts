import { DuraformDoorForOrderMenu } from './../../_models/duraform-door/DuraformDoorForOrderMenu';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-duraform-door-list',
  templateUrl: 'duraform-door-list.component.html',
})
export class DuraformDoorListComponent implements OnInit {
  @Input() displayedDoors: DuraformDoorForOrderMenu[] = [];

  constructor() {}

  ngOnInit() {}
}
