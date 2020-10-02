import { DuraformPantryDoorDto } from './../../_models/duraform-component/DuraformPantryDoorDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { PantryDoorFormComponent } from '../pantry-door-form/pantry-door-form.component';
import { DialogService } from 'src/app/_services/dialog.service';
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

@Component({
  selector: 'app-pantry-door-cart-item',
  templateUrl: 'pantry-door-cart-item.component.html',
})
export class PantryDoorCartItemComponent implements OnInit {
  @Input() pantryDoor: DuraformPantryDoorDto;
  @Input() index: number;

  @Output() removePantryDoor = new EventEmitter<DuraformPantryDoorDto>();

  @ViewChild('pantryDoorForm') pantryDoorForm: PantryDoorFormComponent;

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

    this.pantryDoor.updateWithOption(
      formGroup.value,
      this.asset.duraformOptionTypes
    );

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
