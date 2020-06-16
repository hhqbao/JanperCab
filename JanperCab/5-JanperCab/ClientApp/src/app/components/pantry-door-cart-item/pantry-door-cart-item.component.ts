import { PantryDoorFormComponent } from '../pantry-door-form/pantry-door-form.component';
import { DialogService } from 'src/app/_services/dialog.service';
import { PantryDoorForCart } from './../../_models/pantry-door/PantryDoorForCart';
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
import { PantryDoorChairRailTypeForList } from 'src/app/_models/pantry-door-chair-rail-type/PantryDoorChairRailTypeForList';

@Component({
  selector: 'app-pantry-door-cart-item',
  templateUrl: 'pantry-door-cart-item.component.html',
})
export class PantryDoorCartItemComponent implements OnInit {
  @Input() pantryDoor: PantryDoorForCart;
  @Input() pantryDoorChairRailTypes: PantryDoorChairRailTypeForList[] = [];
  @Output() removePantryDoor = new EventEmitter<PantryDoorForCart>();

  @ViewChild('pantryDoorForm') pantryDoorForm: PantryDoorFormComponent;

  hasAnimated = false;
  isSelected = false;

  constructor(private ef: ElementRef, private dialog: DialogService) {}

  @HostListener('document:click', ['$event.target'])
  onFocusOut = (target: Element) => {
    const self = this.ef.nativeElement as Element;

    if (self === target || self.contains(target) || !this.isSelected) {
      return;
    }

    this.pantryDoorForm.onSubmit();
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

    this.pantryDoor.update(formGroup.value, this.pantryDoorChairRailTypes);

    this.isSelected = false;
  };

  onSelect = () => {
    this.isSelected = true;
  };

  onRemove = () => {
    this.dialog.confirm('Remove Pantry Door', 'Are you sure?', () => {
      this.removePantryDoor.emit(this.pantryDoor);
    });
  };
}
