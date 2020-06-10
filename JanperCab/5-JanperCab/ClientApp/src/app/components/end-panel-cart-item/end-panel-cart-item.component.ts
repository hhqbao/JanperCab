import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from './../../_services/dialog.service';
import { EndPanelForCart } from './../../_models/end-panel/EndPanelForCart';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-end-panel-cart-item]',
  templateUrl: 'end-panel-cart-item.component.html',
})
export class EndPanelCartItemComponent implements OnInit {
  @Input() endPanel: EndPanelForCart;
  @Output() removeEndPanel = new EventEmitter<EndPanelForCart>();

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
      height: [
        null,
        [Validators.required, Validators.min(50), Validators.max(2500)],
      ],
      width: [
        null,
        [Validators.required, Validators.min(50), Validators.max(2500)],
      ],
      numberOfShields: [null, [Validators.min(0), Validators.max(10)]],
      extraRailBottom: [null, [Validators.min(0), Validators.max(500)]],
      extraRailTop: [null, [Validators.min(0), Validators.max(500)]],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
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
    this.endPanel.quantity = formValue.quantity;
    this.endPanel.height = formValue.height;
    this.endPanel.width = formValue.width;
    this.endPanel.numberOfShields = formValue.numberOfShields;
    this.endPanel.extraRailBottom = formValue.extraRailBottom;
    this.endPanel.extraRailTop = formValue.extraRailTop;
    this.endPanel.top = formValue.top;
    this.endPanel.bottom = formValue.bottom;
    this.endPanel.left = formValue.left;
    this.endPanel.right = formValue.right;
    this.endPanel.note = formValue.note;
    this.isSelected = false;
  };

  onSelect = () => {
    this.formGroup.patchValue({ ...this.endPanel });

    this.isSelected = true;
  };

  onRemove = () => {
    this.dialog.confirm('Remove End Panel', 'Are you sure?', () => {
      this.removeEndPanel.emit(this.endPanel);
    });
  };
}
