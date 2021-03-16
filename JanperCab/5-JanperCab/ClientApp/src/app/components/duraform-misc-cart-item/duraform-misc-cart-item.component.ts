import { DuraformMiscFormComponent } from './../duraform-misc-form/duraform-misc-form.component';
import { DuraformMiscComponentDto } from 'src/app/_models/duraform-misc-component/DuraformMiscComponentDto';
import { FormGroup } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-duraform-misc-cart-item',
  templateUrl: 'duraform-misc-cart-item.component.html',
})
export class DuraformMiscCartItemComponent implements OnInit {
  @Input() index: number;
  @Input() miscComponent: DuraformMiscComponentDto;
  @Input() canSelect = true;

  @Output() selectComponent = new EventEmitter();
  @Output() unselectComponent = new EventEmitter();
  @Output() removeMiscComponent = new EventEmitter<DuraformMiscComponentDto>();

  @ViewChild('miscForm') miscForm: DuraformMiscFormComponent;

  hasAnimated = false;
  isSelected = false;

  constructor(private ef: ElementRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.hasAnimated = true;
    }, 300);
  }

  @HostListener('document:click', ['$event.target'])
  onFocusOut = (target: Element) => {
    const self = this.ef.nativeElement as Element;

    if (self === target || self.contains(target) || !this.isSelected) {
      return;
    }

    this.miscForm.onSubmit();
  };

  onAfterSubmit = () => {
    this.isSelected = false;
    this.unselectComponent.emit();
  };

  onSelect = () => {
    if (!this.canSelect) {
      return;
    }

    this.isSelected = true;
    this.selectComponent.emit();
  };

  onRemove = () => {
    this.removeMiscComponent.emit(this.miscComponent);
  };
}
