import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { DuraformDrawerFormComponent } from '../duraform-drawer-form/duraform-drawer-form.component';
import { DialogService } from './../../_services/dialog.service';
import { DuraformDrawerForCart } from './../../_models/duraform-drawer/DuraformDrawerForCart';
import { DuraformDrawerTypeForList } from './../../_models/duraform-drawer-type/DuraformDrawerTypeForList';
import { FormGroup } from '@angular/forms';
import {
  Component,
  OnInit,
  ElementRef,
  Input,
  HostListener,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-duraform-drawer-cart-item',
  templateUrl: 'duraform-drawer-cart-item.component.html',
})
export class DuraformDrawerCartItemComponent implements OnInit {
  @ViewChild('duraformDrawerForm')
  duraformDrawerForm: DuraformDrawerFormComponent;

  @Input() duraformDrawer: DuraformDrawerForCart;
  @Output() removeDrawer = new EventEmitter<DuraformDrawerForCart>();

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

    this.duraformDrawerForm.onSubmit();
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
    this.duraformDrawer.update(formValue);

    this.isSelected = false;
  };

  onSelect = () => {
    this.isSelected = true;
  };

  onRemove = () => {
    this.dialog.confirm('Remove Drawer', 'Are you sure?', () => {
      this.removeDrawer.emit(this.duraformDrawer);
    });
  };
}
