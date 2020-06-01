import { FormBuilder, FormGroup } from '@angular/forms';
import { DuraformSerieForList } from './../../_models/duraform-serie/DuraformSerieForList';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-filter-box',
  templateUrl: 'duraform-filter-box.component.html',
})
export class DuraformFilterBoxComponent implements OnInit {
  @Input() duraformSeries: DuraformSerieForList[] = [];
  @Output() filterChange = new EventEmitter();

  filterFg: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.filterFg = this.fb.group({
      search: [''],
      serie: [0],
    });

    setTimeout(() => {
      (this.filterFg.get('search') as any).nativeElement.focus();
    }, 100);
  }

  onSearchKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.filterFg.patchValue({
        search: '',
        serie: 0,
      });

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

    this.filterChange.emit(this.filterFg.value);
  };
}
