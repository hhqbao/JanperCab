import { FormGroup, FormBuilder } from '@angular/forms';
import { DuraformWrapTypeForSelection } from './../../_models/duraform-wrap-type/DuraformWrapTypeForSelection';
import { DialogService } from 'src/app/_services/dialog.service';
import { forkJoin } from 'rxjs';
import { DuraformWrapColorService } from './../../_services/duraform-wrap-color.service';
import { DuraformWrapTypeService } from './../../_services/duraform-wrap-type.service';
import { LayoutService } from 'src/app/_services/layout.service';
import { DuraformDoorForOrderMenu } from 'src/app/_models/duraform-door/DuraformDoorForOrderMenu';
import {
  Component,
  OnInit,
  Input,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { DuraformWrapColorForSelection } from 'src/app/_models/duraform-wrap-color/DuraformWrapColorForSelection';

@Component({
  selector: 'app-duraform-color-selector',
  templateUrl: 'duraform-color-selector.component.html',
})
export class DuraformColorSelectorComponent implements OnInit {
  @Input() door: DuraformDoorForOrderMenu;

  @Output() colorPick = new EventEmitter<DuraformWrapColorForSelection>();
  @Output() routingPick = new EventEmitter<DuraformWrapColorForSelection>();
  @Output() cancel = new EventEmitter();

  wrapTypes: DuraformWrapTypeForSelection[] = [];
  wrapColors: DuraformWrapColorForSelection[] = [];

  filterFg: FormGroup;

  constructor(
    private ef: ElementRef,
    private layout: LayoutService,
    private dialog: DialogService,
    private fb: FormBuilder,
    private wrapTypeService: DuraformWrapTypeService,
    private wrapColorService: DuraformWrapColorService
  ) {}

  ngOnInit() {
    this.initialForm();

    this.layout.showLoadingPanel();
    forkJoin([this.loadWrapTypes(), this.loadWrapColors()]).subscribe(
      (responses) => {
        this.wrapTypes = responses[0];
        this.wrapColors = responses[1];
        this.filterFg.patchValue({ type: this.wrapTypes[0].id });
        this.layout.closeLoadingPanel();
      },
      (error) => {
        this.dialog.error(error);
        this.layout.closeLoadingPanel();
      }
    );
  }

  private initialForm = () => {
    this.filterFg = this.fb.group({
      search: [''],
      type: [null],
    });

    setTimeout(() => {
      this.focusSearchBox();
    }, 100);
  };

  private loadWrapTypes = () => {
    return this.wrapTypeService.getForDoor(this.door.id);
  };

  private loadWrapColors = () => {
    return this.wrapColorService.getForDoor(this.door.id);
  };

  private focusSearchBox = () => {
    (this.filterFg.get('search') as any).nativeElement.focus();
  };

  hideColor = (color: DuraformWrapColorForSelection) => {
    const filter = this.filterFg.value;

    if (!filter.type) {
      return !color.name.toLowerCase().includes(filter.search.toLowerCase());
    } else {
      return color.duraformWrapTypeId !== filter.type;
    }
  };

  onWrapperClick = (target: Element) => {
    const self = this.ef.nativeElement as Element;

    if (self.firstElementChild === target) {
      this.cancel.emit();
    }
  };

  onSearchClear = (event) => {
    if (event.key === 'Escape') {
      this.filterFg.patchValue({ search: '', type: this.wrapTypes[0].id });
      this.focusSearchBox();
    }
  };

  onSearchChange = () => {
    const filter = this.filterFg.value;

    if (filter.search.trim() === '') {
      this.filterFg.patchValue({ type: this.wrapTypes[0].id });
    } else {
      this.filterFg.patchValue({ type: null });
    }
  };

  onTypeChange = () => {
    this.filterFg.patchValue({
      search: '',
    });

    this.focusSearchBox();
  };

  onPickColor = (color: DuraformWrapColorForSelection) => {
    this.colorPick.emit(color);
  };

  onRoutingOnlyClick = () => {
    this.routingPick.emit();
  };
}
