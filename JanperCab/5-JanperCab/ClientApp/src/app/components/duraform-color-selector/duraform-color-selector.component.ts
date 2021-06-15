import { DuraformArchDto } from './../../_models/duraform-arch/DuraformArchDto';
import { DuraformWrapTypeDto } from './../../_models/duraform-wrap-type/DuraformWrapTypeDto';
import { DuraformWrapColorDto } from './../../_models/duraform-wrap-color/DuraformWrapColorDto';
import { DuraformEdgeProfileDto } from './../../_models/duraform-edge-profile/DuraformEdgeProfileDto';
import { DuraformDesignDto } from './../../_models/duraform-design/DuraformDesignDto';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DialogService } from 'src/app/_services/dialog.service';
import { forkJoin } from 'rxjs';
import { DuraformWrapColorService } from './../../_services/duraform-wrap-color.service';
import { DuraformWrapTypeService } from './../../_services/duraform-wrap-type.service';
import { LayoutService } from 'src/app/_services/layout.service';

import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-duraform-color-selector',
  templateUrl: 'duraform-color-selector.component.html',
})
export class DuraformColorSelectorComponent implements OnInit {
  @Input() design: DuraformDesignDto;
  @Input() selectedEdgeProfile: DuraformEdgeProfileDto;

  @Output() archPick = new EventEmitter<DuraformArchDto>();
  @Output() colorPick = new EventEmitter<DuraformWrapColorDto>();
  @Output() routingPick = new EventEmitter<DuraformWrapColorDto>();
  @Output() cancel = new EventEmitter();

  wrapTypes: DuraformWrapTypeDto[] = [];
  wrapColors: DuraformWrapColorDto[] = [];

  filterFg: FormGroup;
  isSelectingColor = false;

  constructor(
    private ef: ElementRef,
    private layout: LayoutService,
    private dialog: DialogService,
    private fb: FormBuilder,
    public asset: DuraformAssetService,
    private order: DuraformOrderService,
    private wrapTypeService: DuraformWrapTypeService,
    private wrapColorService: DuraformWrapColorService
  ) {}

  ngOnInit() {
    if (this.design.hasNoArch) {
      this.isSelectingColor = true;
    }

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
  };

  private loadWrapTypes = () => {
    return this.wrapTypeService.getForDesign(this.design.id);
  };

  private loadWrapColors = () => {
    return this.wrapColorService.getForDesign(this.design.id);
  };

  private focusSearchBox = () => {
    (this.filterFg.get('search') as any).nativeElement.focus();
  };

  hideColor = (color: DuraformWrapColorDto) => {
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

  onPickColor = (color: DuraformWrapColorDto) => {
    this.colorPick.emit(color);
  };

  onRoutingOnlyClick = () => {
    this.routingPick.emit();
  };

  onSelectArch = (arch: DuraformArchDto) => {
    this.archPick.emit(arch);
    this.isSelectingColor = true;

    setTimeout(() => {
      this.focusSearchBox();
    }, 100);
  };
}
