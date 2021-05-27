import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DuraformSerieForList } from './../../_models/duraform-serie/DuraformSerieForList';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-filter-box',
  templateUrl: 'duraform-filter-box.component.html',
})
export class DuraformFilterBoxComponent implements OnInit {
  @Output() filterChange = new EventEmitter();

  filterFg: FormGroup;

  get selectableSeries(): DuraformSerieForList[] {
    return this.asset.duraformSeries.filter((x) => !x.isHidden);
  }

  constructor(private fb: FormBuilder, private asset: DuraformAssetService) {}

  ngOnInit() {
    this.filterFg = this.fb.group({
      search: [''],
      serie: [0],
    });

    setTimeout(() => {
      this.focusOnSearchBox();
    }, 100);
  }

  private focusOnSearchBox = () => {
    (this.filterFg.get('search') as any).nativeElement.focus();
  };

  onSearchKeyUp = (event) => {
    if (event.key === 'Escape') {
      this.filterFg.patchValue({
        search: '',
        serie: 0,
      });

      this.focusOnSearchBox();
      this.filterChange.emit(this.filterFg.value);
    }
  };

  onSearchChange = () => {
    const searchValue = this.filterFg.get('search').value;

    if (searchValue.trim() === '') {
      this.filterFg.patchValue({
        serie: 0,
      });
    } else {
      this.filterFg.patchValue({
        serie: null,
      });
    }

    this.filterChange.emit(this.filterFg.value);
  };

  onSerieChange = () => {
    this.filterFg.patchValue({
      search: '',
    });

    this.focusOnSearchBox();

    this.filterChange.emit(this.filterFg.value);
  };
}
