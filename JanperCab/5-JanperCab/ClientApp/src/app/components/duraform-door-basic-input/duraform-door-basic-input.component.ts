import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-duraform-door-basic-input',
  templateUrl: 'duraform-door-basic-input.component.html',
})
export class DuraformDoorBasicInputComponent implements OnInit {
  @Input() formGroup: FormGroup;

  constructor() {}

  ngOnInit() {}
}
