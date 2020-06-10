import { DialogService } from './../../_services/dialog.service';
import { DuraformDrawerForCart } from './../../_models/duraform-drawer/DuraformDrawerForCart';
import { DuraformDrawerTypeForList } from './../../_models/duraform-drawer-type/DuraformDrawerTypeForList';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  ElementRef,
  Input,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-duraform-drawer-cart-item]',
  templateUrl: 'duraform-drawer-cart-item.component.html',
})
export class DuraformDrawerCartItemComponent implements OnInit {
  @Input() duraformDrawer: DuraformDrawerForCart;
  @Input() duraformDrawerTypes: DuraformDrawerTypeForList[] = [];
  @Output() removeDrawer = new EventEmitter<DuraformDrawerForCart>();

  formGroup: FormGroup;
  hasAnimated = false;
  isSelected = false;

  constructor(
    private fb: FormBuilder,
    private ef: ElementRef,
    private dialog: DialogService
  ) {}

  @HostListener('document:click', ['$event.target'])
  onFocusOut = (target: Element) => {
    const self = this.ef.nativeElement as Element;

    if (self === target || self.contains(target) || !this.isSelected) {
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
      duraformDrawerTypeId: [null, [Validators.required]],
      height: [
        null,
        [Validators.required, Validators.min(50), Validators.max(2500)],
      ],
      width: [
        null,
        [Validators.required, Validators.min(150), Validators.max(1200)],
      ],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
      drawerOne: [null, [Validators.min(0)]],
      drawerTwo: [null, [Validators.min(0)]],
      drawerThree: [null, [Validators.min(0)]],
      drawerFour: [null, [Validators.min(0)]],
      drawerFive: [null, [Validators.min(0)]],
      note: [''],
    });

    setTimeout(() => {
      this.hasAnimated = true;
    }, 1000);
  }

  onSubmit = () => {
    if (this.formGroup.invalid) {
      return;
    }

    const formValue = this.formGroup.value;
    this.duraformDrawer.quantity = formValue.quantity;
    this.duraformDrawer.height = formValue.height;
    this.duraformDrawer.width = formValue.width;
    this.duraformDrawer.top = formValue.top;
    this.duraformDrawer.bottom = formValue.bottom;
    this.duraformDrawer.left = formValue.left;
    this.duraformDrawer.right = formValue.right;
    this.duraformDrawer.drawerOne = formValue.drawerOne;
    this.duraformDrawer.drawerTwo = formValue.drawerTwo;
    this.duraformDrawer.drawerThree = formValue.drawerThree;
    this.duraformDrawer.drawerFour = formValue.drawerFour;
    this.duraformDrawer.drawerFive = formValue.drawerFive;
    this.duraformDrawer.note = formValue.note;

    const drawerType = this.duraformDrawerTypes.find(
      (x) => x.id === +formValue.duraformDrawerTypeId
    );
    this.duraformDrawer.duraformDrawerType = drawerType;
    this.isSelected = false;
  };

  onSelect = () => {
    this.formGroup.patchValue({ ...this.duraformDrawer });
    this.formGroup.patchValue({
      duraformDrawerTypeId: this.duraformDrawer.duraformDrawerType?.id,
    });
    this.isSelected = true;
  };

  onRemove = () => {
    this.dialog.confirm('Remove Drawer', 'Are you sure?', () => {
      this.removeDrawer.emit(this.duraformDrawer);
    });
  };
}
