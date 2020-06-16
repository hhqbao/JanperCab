import { EndPanelFormComponent } from '../end-panel-form/end-panel-form.component';
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
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-end-panel-cart-item',
  templateUrl: 'end-panel-cart-item.component.html',
})
export class EndPanelCartItemComponent implements OnInit {
  @ViewChild('endPanelForm') endPanelForm: EndPanelFormComponent;
  @Input() endPanel: EndPanelForCart;
  @Output() removeEndPanel = new EventEmitter<EndPanelForCart>();

  hasAnimated = false;
  isSelected = false;

  constructor(private ef: ElementRef, private dialog: DialogService) {}

  @HostListener('document:click', ['$event.target'])
  onFocusOut = (target: Element) => {
    const self = this.ef.nativeElement as Element;

    if (self === target || self.contains(target) || !this.isSelected) {
      return;
    }

    this.endPanelForm.onSubmit();
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

    this.endPanel.update(formGroup.value);

    this.isSelected = false;
  };

  onSelect = () => {
    this.isSelected = true;
  };

  onRemove = () => {
    this.dialog.confirm('Remove End Panel', 'Are you sure?', () => {
      this.removeEndPanel.emit(this.endPanel);
    });
  };
}
