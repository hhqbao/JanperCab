import { DuraformEndPanelDto } from './../../_models/duraform-component/DuraformEndPanelDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { EndPanelFormComponent } from '../end-panel-form/end-panel-form.component';
import { FormGroup } from '@angular/forms';
import { DialogService } from './../../_services/dialog.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-end-panel-cart-item',
  templateUrl: 'end-panel-cart-item.component.html',
})
export class EndPanelCartItemComponent implements OnInit {
  @ViewChild('endPanelForm') endPanelForm: EndPanelFormComponent;

  @Input() endPanel: DuraformEndPanelDto;
  @Input() index: number;

  @Output() removeEndPanel = new EventEmitter<DuraformEndPanelDto>();

  hasAnimated = false;
  isSelected = false;

  constructor(
    public asset: DuraformAssetService,
    private ef: ElementRef,
    private dialog: DialogService
  ) {}

  @HostListener('document:click', ['$event.target'])
  onFocusOut = (target: Element) => {
    const self = this.ef.nativeElement as Element;

    if (self === target || self.contains(target) || !this.isSelected) {
      return;
    }

    if (!this.endPanelForm.invalid) {
      this.endPanelForm.onSubmit();
    } else {
      this.isSelected = false;
    }
  };

  ngOnInit() {
    setTimeout(() => {
      this.hasAnimated = true;
    }, 1000);
  }

  onEdit = (formGroup: FormGroup) => {
    if (formGroup.invalid) {
      this.isSelected = false;
      return;
    }

    this.endPanel.updateWithOption(
      formGroup.value,
      this.asset.duraformOptionTypes
    );

    this.isSelected = false;
  };

  onSelect = () => {
    this.isSelected = true;
  };

  onRemove = () => {
    this.dialog.confirm('Remove End Panel', 'Are you sure?', () => {
      this.removeEndPanel.emit(this.endPanel);
    });
  };
}
