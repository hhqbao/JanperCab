import { DialogService } from 'src/app/_services/dialog.service';
import { PantryDoorForCart } from './../../_models/pantry-door/PantryDoorForCart';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { PantryDoorChairRailTypeForList } from 'src/app/_models/pantry-door-chair-rail-type/PantryDoorChairRailTypeForList';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-pantry-door-cart-item]',
  templateUrl: 'pantry-door-cart-item.component.html',
})
export class PantryDoorCartItemComponent implements OnInit {
  @Input() pantryDoor: PantryDoorForCart;
  @Input() pantryDoorChairRailTypes: PantryDoorChairRailTypeForList[] = [];
  @Output() removePantryDoor = new EventEmitter<PantryDoorForCart>();

  hasSelected = false;
  isSelected = false;

  formGroup: FormGroup;

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
      chairRailHeight: [
        null,
        [Validators.required, Validators.min(0), Validators.max(500)],
      ],
      chairRailTypeId: [null, Validators.required],
      extraRailBottom: [null, [Validators.min(0), Validators.max(500)]],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
      note: [''],
    });
  }

  onSubmit = () => {
    const formValue = this.formGroup.value;
    this.pantryDoor.quantity = formValue.quantity;
    this.pantryDoor.height = formValue.height;
    this.pantryDoor.width = formValue.width;
    this.pantryDoor.chairRailHeight = formValue.chairRailHeight;
    this.pantryDoor.extraRailBottom =
      formValue.extraRailBottom === 0 ? null : formValue.extraRailBottom;
    this.pantryDoor.top = formValue.top;
    this.pantryDoor.bottom = formValue.bottom;
    this.pantryDoor.left = formValue.left;
    this.pantryDoor.right = formValue.right;
    this.pantryDoor.note = formValue.note;

    const railType = this.pantryDoorChairRailTypes.find(
      (x) => x.id === +formValue.chairRailTypeId
    );
    this.pantryDoor.chairRailType = railType;
    this.isSelected = false;
  };

  onSelect = () => {
    this.formGroup.patchValue({ ...this.pantryDoor });
    this.formGroup.patchValue({
      chairRailTypeId: this.pantryDoor.chairRailType.id,
    });

    this.hasSelected = true;
    this.isSelected = true;
  };

  onRemove = () => {
    this.dialog.confirm('Remove Pantry Door', 'Are you sure?', () => {
      this.removePantryDoor.emit(this.pantryDoor);
    });
  };
}
