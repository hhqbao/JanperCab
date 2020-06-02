import { DuraformDoorForOrderMenu } from 'src/app/_models/duraform-door/DuraformDoorForOrderMenu';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-door',
  templateUrl: 'duraform-door.component.html',
})
export class DuraformDoorComponent implements OnInit {
  @Input() door: DuraformDoorForOrderMenu;
  @Output() selectDoor = new EventEmitter<DuraformDoorForOrderMenu>();

  isLoadingImg = true;

  constructor() {}

  ngOnInit() {}

  onSelectDoor = () => {
    this.selectDoor.emit(this.door);
  };
}
