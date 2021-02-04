import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { DuraformPriceGridDto } from 'src/app/_models/duraform-price/DuraformPriceGridDto';

@Component({
  selector: 'app-duraform-price-editor',
  templateUrl: 'duraform-price-editor.component.html',
})
export class DuraformPriceEditorComponent implements OnInit {
  @Input() priceGrid: DuraformPriceGridDto;

  formControl: FormControl;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formControl = this.fb.control(this.priceGrid.tempPrice, [
      Validators.required,
      Validators.min(0),
    ]);
  }

  onBlur = () => {
    this.priceGrid.tempPrice = this.formControl.value;
  };
}
