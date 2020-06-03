import { DuraformSerieForList } from './../../_models/duraform-serie/DuraformSerieForList';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DuraformDoorForOrderMenu } from 'src/app/_models/duraform-door/DuraformDoorForOrderMenu';

@Component({
  selector: 'app-duraform-door-list',
  templateUrl: 'duraform-door-list.component.html',
})
export class DuraformDoorListComponent implements OnInit {
  @Input() doors: DuraformDoorForOrderMenu[] = [];
  @Input() series: DuraformSerieForList[] = [];
  @Output() selectDoor = new EventEmitter<DuraformDoorForOrderMenu>();

  private filterValue: any = { serie: 0 };

  constructor() {}

  ngOnInit() {}

  hideDoor = (door: DuraformDoorForOrderMenu) => {
    if (this.filterValue.serie === null) {
      return !door.name
        .toLowerCase()
        .includes(this.filterValue.search.toLowerCase());
    } else {
      if (this.filterValue.serie === 0) {
        return !door.isPopular;
      } else {
        return door.duraformSerieId !== this.filterValue.serie;
      }
    }
  };

  onFilterChange = (changeValue: any) => {
    this.filterValue = changeValue;
  };

  onSelectDoor = (selectedDoor: DuraformDoorForOrderMenu) => {
    this.selectDoor.emit(selectedDoor);
  };
}
