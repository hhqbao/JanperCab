import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DuraformDoorForOrderMenu } from 'src/app/_models/duraform-door/DuraformDoorForOrderMenu';

@Component({
  selector: 'app-duraform-door-list',
  templateUrl: 'duraform-door-list.component.html',
})
export class DuraformDoorListComponent implements OnInit {
  @Input() displayedDoors: DuraformDoorForOrderMenu[] = [];
  @Output() selectDoor = new EventEmitter<DuraformDoorForOrderMenu>();

  constructor() {}

  ngOnInit() {}

  onSelectDoor = (selectedDoor: DuraformDoorForOrderMenu) => {
    this.selectDoor.emit(selectedDoor);
  };
}
