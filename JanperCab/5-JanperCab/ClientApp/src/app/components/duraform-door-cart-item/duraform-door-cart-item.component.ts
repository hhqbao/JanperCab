import { DialogService } from './../../_services/dialog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DuraformDoorForCart } from './../../_models/duraform-door/DuraformDoorForCart';
import {
  Component,
  OnInit,
  Input,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { DuraformDoorOptionForList } from 'src/app/_models/duraform-door-option/DuraformDoorOptionForList';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-duraform-door-cart-item]',
  templateUrl: 'duraform-door-cart-item.component.html',
})
export class DuraformDoorCartItemComponent implements OnInit {
  @Input() door: DuraformDoorForCart;
  @Input() doorOptions: DuraformDoorOptionForList[] = [];
  @Output() removeDoor = new EventEmitter<DuraformDoorForCart>();

  formGroup: FormGroup;
  hasSelected = false;
  isSelected = false;

  constructor(
    private fb: FormBuilder,
    private ef: ElementRef,
    private dialog: DialogService
  ) {}

  @HostListener('document:click', ['$event.target'])
  onFocusOut = (target: Element) => {
    const self = this.ef.nativeElement as Element;

    if (self === target || self.contains(target)) {
      return;
    }

    if (this.formGroup.valid) {
      this.onSubmit();
    } else {
      this.isSelected = false;
    }
  };

  ngOnInit() {
    this.formGroup = this.fb.group({
      quantity: [
        1,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      height: [
        null,
        [Validators.required, Validators.min(50), Validators.max(2500)],
      ],
      width: [
        null,
        [Validators.required, Validators.min(50), Validators.max(2500)],
      ],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
      optionId: [null],
      note: [''],
    });
  }

  onSubmit = () => {
    const formValue = this.formGroup.value;

    this.door.quantity = formValue.quantity;
    this.door.height = formValue.height;
    this.door.width = formValue.width;
    this.door.top = formValue.top;
    this.door.bottom = formValue.bottom;
    this.door.left = formValue.left;
    this.door.right = formValue.right;
    this.door.note = formValue.note;

    if (formValue.optionId) {
      const option = this.doorOptions.find((x) => x.id === +formValue.optionId);
      this.door.duraformDoorOption = option;
    } else {
      this.door.duraformDoorOption = null;
    }

    this.isSelected = false;
  };

  onSelect = () => {
    this.formGroup.patchValue({ ...this.door });
    this.formGroup.patchValue({
      optionId: this.door.duraformDoorOption
        ? this.door.duraformDoorOption.id
        : null,
    });
    this.isSelected = true;
    this.hasSelected = true;
  };

  onRemove = () => {
    this.dialog.confirm('Remove Door', 'Are you sure?', () => {
      this.removeDoor.emit(this.door);
    });
  };
}
