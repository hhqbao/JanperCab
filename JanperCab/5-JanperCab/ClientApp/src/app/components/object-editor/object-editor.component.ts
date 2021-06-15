import { DialogService } from './../../_services/dialog.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-object-editor',
  templateUrl: 'object-editor.component.html',
})
export class ObjectEditorComponent implements OnInit {
  @Input() object: any;
  @Input() property: string;

  @Input() isRequired = false;
  @Input() min = 0;

  @Output() afterSet = new EventEmitter();

  formControl: AbstractControl;
  @ViewChild('mainInput') mainInput: ElementRef;

  constructor(private fb: FormBuilder, private dialogService: DialogService) {}

  ngOnInit() {
    this.formControl = this.fb.control(this.object[this.property] ?? this.min, [
      Validators.min(this.min),
    ]);

    if (this.isRequired) {
      this.formControl.setValidators([
        Validators.required,
        Validators.min(this.min),
      ]);

      this.formControl.updateValueAndValidity();
    }
  }

  getValidationMsg = (): string => {
    if (this.formControl.errors.required) {
      return 'Value is required! Cannot be empty';
    }

    if (this.formControl.errors.min) {
      return `Value cannot be less than ${this.min}`;
    }

    return 'Unknown Error';
  };

  onKeyUp = () => {
    if (this.formControl.invalid) {
      return;
    }

    this.updateValue();
  };

  onBlur = () => {
    if (this.formControl.invalid) {
      this.dialogService.alert('Invalid Value', this.getValidationMsg(), () => {
        (this.mainInput.nativeElement as HTMLElement).focus();
      });
      return;
    }

    this.updateValue();
  };

  private updateValue = () => {
    this.object[this.property] = this.formControl.value;
    this.afterSet.emit();
  };
}
