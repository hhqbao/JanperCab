import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformMiscFormComponent } from './../duraform-misc-form/duraform-misc-form.component';
import { DuraformMiscDto } from 'src/app/_models/duraform-misc/DuraformMiscDto';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-duraform-misc-cart-item',
  templateUrl: 'duraform-misc-cart-item.component.html',
})
export class DuraformMiscCartItemComponent implements OnInit {
  @Input() misc: DuraformMiscDto;
  @Input() index: number;

  @Output() removeMisc = new EventEmitter<DuraformMiscDto>();

  @ViewChild('miscForm') miscForm: DuraformMiscFormComponent;

  hasAnimated = false;
  isSelected = false;

  constructor(
    public order: DuraformOrderService,
    private ef: ElementRef,
    public asset: DuraformAssetService
  ) {}

  @HostListener('document:click', ['$event.target'])
  onFocusOut = (target: Element) => {
    const self = this.ef.nativeElement as Element;

    if (self === target || self.contains(target) || !this.isSelected) {
      return;
    }

    if (!this.miscForm.invalid) {
      this.miscForm.onSubmit();
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

    const formValues = formGroup.value;
    this.misc.quantity = formValues.quantity;
    this.misc.miscItemId = formValues.miscItemId;
    this.misc.note = formValues.note;

    this.isSelected = false;
  };

  onSelect = () => {
    this.isSelected = true;
  };

  onRemove = () => {
    this.removeMisc.emit(this.misc);
  };
}
