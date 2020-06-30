import { DuraformDoorFormComponent } from '../duraform-door-form/duraform-door-form.component';
import { DialogService } from './../../_services/dialog.service';
import { FormGroup } from '@angular/forms';
import { DuraformDoorForCart } from './../../_models/duraform-door/DuraformDoorForCart';
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
  @Input() door: DuraformDoorForCart;
  @Output() removeDoor = new EventEmitter<DuraformDoorForCart>();

  @ViewChild('doorForm') doorForm: DuraformDoorFormComponent;

  hasAnimated = false;
  isSelected = false;

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private ef: ElementRef,
    private dialog: DialogService
  ) {}

  @HostListener('document:click', ['$event.target'])
  onFocusOut = (target: Element) => {
    const self = this.ef.nativeElement as Element;

    if (self === target || self.contains(target) || !this.isSelected) {
      return;
    }

    this.doorForm.onSubmit();
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

    const formValue = formGroup.value;
    this.door.updateWithOption(formValue, this.asset.duraformOptionTypes);

    this.isSelected = false;
  };

  onSelect = () => {
    this.isSelected = true;
  };

  onRemove = () => {
    this.dialog.confirm('Remove Door', 'Are you sure?', () => {
      this.removeDoor.emit(this.door);
    });
  };
}
