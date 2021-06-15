import { DuraformDesignDto } from './../../_models/duraform-design/DuraformDesignDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-design-list',
  templateUrl: 'duraform-design-list.component.html',
})
export class DuraformDesignListComponent implements OnInit {
  @Output() selectDesign = new EventEmitter<DuraformDesignDto>();

  private filterValue: any = { serie: 0 };

  constructor(public asset: DuraformAssetService) {}

  ngOnInit() {}

  hideDesign = (design: DuraformDesignDto) => {
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
}
