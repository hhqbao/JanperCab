import { DuraformDoorDto } from './../../_models/duraform-component/DuraformDoorDto';
import { DuraformDoorFormComponent } from '../duraform-door-form/duraform-door-form.component';
import { DialogService } from './../../_services/dialog.service';
import { FormGroup } from '@angular/forms';

import {
  Component,
  OnInit,
  Input,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';

@Component({
  selector: 'app-duraform-door-cart-item',
  templateUrl: 'duraform-door-cart-item.component.html',
})
export class DuraformDoorCartItemComponent implements OnInit {
  @Input() door: DuraformDoorDto;
  @Input() index: number;

  @Output() removeDoor = new EventEmitter<DuraformDoorDto>();

  @ViewChild('doorForm') doorForm: DuraformDoorFormComponent;

  hasAnimated = false;
  isSelected = false;

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private ef: ElementRef
  ) {}

  @HostListener('document:click', ['$event.target'])
  onFocusOut = (target: Element) => {
    const self = this.ef.nativeElement as Element;

    if (self === target || self.contains(target) || !this.isSelected) {
      return;
    }

    if (!this.doorForm.invalid) {
      this.doorForm.onSubmit();
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
      return;
    }

    this.door.updateWithOption(formGroup.value, this.asset.duraformOptionTypes);
    this.isSelected = false;
  };

  onSelect = () => {
    this.isSelected = true;
  };

  onRemove = () => {
    this.removeDoor.emit(this.door);
  };
}
