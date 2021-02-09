import { DuraformComponentService } from './../../_services/duraform-component.service';
import {
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  HostListener,
  ElementRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DuraformComponentDto } from 'src/app/_models/duraform-component/DuraformComponentDto';
import { DuraformComponentFormComponent } from '../duraform-component-form/duraform-component-form.component';
import { DuraformDoorDto } from 'src/app/_models/duraform-component/DuraformDoorDto';
import { DuraformDrawerDto } from 'src/app/_models/duraform-component/DuraformDrawerDto';
import { DuraformEndPanelDto } from 'src/app/_models/duraform-component/DuraformEndPanelDto';
import { DuraformPantryDoorDto } from 'src/app/_models/duraform-component/DuraformPantryDoorDto';

export abstract class DuraformCartItemComponent<
  T extends
    | DuraformDoorDto
    | DuraformPantryDoorDto
    | DuraformEndPanelDto
    | DuraformDrawerDto
> implements OnInit {
  @Input() component: T;
  @Input() index: number;
  @Input() canSelect: boolean = true;

  @Output() selectComponent = new EventEmitter();
  @Output() unselectComponent = new EventEmitter();
  @Output() removeComponent = new EventEmitter<DuraformComponentDto>();

  @ViewChild('componentForm') componentForm: DuraformComponentFormComponent<T>;

  hasAnimated = false;
  isSelected = false;

  constructor(
    protected componentService: DuraformComponentService,
    protected ef: ElementRef
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.hasAnimated = true;
    }, 1000);
  }

  @HostListener('document:click', ['$event.target'])
  onFocusOut = (target: Element) => {
    const self = this.ef.nativeElement as Element;

    if (self === target || self.contains(target) || !this.isSelected) {
      return;
    }

    this.componentForm.onSubmit();
  };

  onSelect = () => {
    if (!this.canSelect) return;

    this.isSelected = true;
    this.selectComponent.emit();
  };

  onEdit = (formGroup: FormGroup) => {
    this.componentService.updateComponent(this.component, formGroup.value);

    this.isSelected = false;
    this.unselectComponent.emit();
  };

  onRemove = () => {
    this.removeComponent.emit(this.component);
  };
}
