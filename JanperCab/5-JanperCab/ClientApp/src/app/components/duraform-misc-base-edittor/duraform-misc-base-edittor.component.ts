import { DuraformMiscComponentDto } from 'src/app/_models/duraform-misc-component/DuraformMiscComponentDto';
import { FormGroup } from '@angular/forms';
import { Directive, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Directive()
export abstract class DuraformMiscBaseEdittor {
  @Input() formGroup: FormGroup;
  @Input() cloneMisc: DuraformMiscComponentDto;

  @Output() updateInput = new EventEmitter();
}
