import { DuraformDoorForOrderMenu } from './../../_models/duraform-door/DuraformDoorForOrderMenu';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-duraform-door',
  templateUrl: 'duraform-door.component.html',
})
export class DuraformDoorComponent implements OnInit {
  @Input() door: DuraformDoorForOrderMenu;
  isLoadingImg = true;

  constructor() {}

  ngOnInit() {}
}
