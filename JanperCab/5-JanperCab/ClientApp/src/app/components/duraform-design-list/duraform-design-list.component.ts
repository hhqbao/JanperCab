import { DuraformDesignForOrderMenu } from '../../_models/duraform-design/DuraformDesignForOrderMenu';
import { DuraformSerieForList } from '../../_models/duraform-serie/DuraformSerieForList';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-design-list',
  templateUrl: 'duraform-design-list.component.html',
})
export class DuraformDesignListComponent implements OnInit {
  @Input() designs: DuraformDesignForOrderMenu[] = [];
  @Input() series: DuraformSerieForList[] = [];
  @Output() selectDesign = new EventEmitter<DuraformDesignForOrderMenu>();

  private filterValue: any = { serie: 0 };

  constructor() {}

  ngOnInit() {}

  hideDesign = (design: DuraformDesignForOrderMenu) => {
    if (this.filterValue.serie === null) {
      return !design.name
        .toLowerCase()
        .includes(this.filterValue.search.toLowerCase());
    } else {
      if (this.filterValue.serie === 0) {
        return !design.isPopular;
      } else {
        return design.duraformSerieId !== this.filterValue.serie;
      }
    }
  };

  onFilterChange = (changeValue: any) => {
    this.filterValue = changeValue;
  };

  onSelectDesign = (selectedDesign: DuraformDesignForOrderMenu) => {
    this.selectDesign.emit(selectedDesign);
  };
}
