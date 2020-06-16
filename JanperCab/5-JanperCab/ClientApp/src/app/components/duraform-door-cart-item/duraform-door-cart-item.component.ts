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
import { DuraformOptionType } from 'src/app/_models/duraform-option/DuraformOptionType';

@Component({
  selector: 'app-duraform-door-cart-item',
  templateUrl: 'duraform-door-cart-item.component.html',
})
export class DuraformDoorCartItemComponent implements OnInit {
  @ViewChild('doorForm') doorForm: DuraformDoorFormComponent;
  @Input() door: DuraformDoorForCart;
  @Input() duraformOptionTypes: DuraformOptionType[] = [];
  @Output() removeDoor = new EventEmitter<DuraformDoorForCart>();

  hasAnimated = false;
  isSelected = false;

  constructor(private ef: ElementRef, private dialog: DialogService) {}

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
    this.door.update(formValue, this.duraformOptionTypes);

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
