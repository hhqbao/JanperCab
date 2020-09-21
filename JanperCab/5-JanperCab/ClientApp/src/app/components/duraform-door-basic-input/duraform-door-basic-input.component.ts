import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-door-basic-input',
  templateUrl: 'duraform-door-basic-input.component.html',
})
export class DuraformDoorBasicInputComponent implements OnInit {
  @Output() heightKeyUp = new EventEmitter();
  @Output() widthKeyUp = new EventEmitter();

  @Input() formGroup: FormGroup;

  constructor() {}

  ngOnInit() {}

  get quantity(): AbstractControl {
    return this.formGroup.get('quantity');
  }

  get height(): AbstractControl {
    return this.formGroup.get('height');
  }

  get width(): AbstractControl {
    return this.formGroup.get('width');
  }
}
