import { CommonAssetsService } from './../../_services/common-assets.service';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-invoice-detail-form',
  templateUrl: 'invoice-detail-form.component.html',
})
export class InvoiceDetailFormComponent implements OnInit {
  @Output() update = new EventEmitter<any>();
  @Output() cancel = new EventEmitter();

  formGroup: FormGroup;

  constructor(
    public order: DuraformOrderService,
    private fb: FormBuilder,
    public commonAssets: CommonAssetsService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      invoiceTo: [this.order.invoiceTo, [Validators.required]],
      invoiceAddress: [this.order.invoiceAddress, [Validators.required]],
      invoiceSuburb: [this.order.invoiceSuburb, [Validators.required]],
      invoiceState: [this.order.invoiceState, [Validators.required]],
      invoicePostcode: [this.order.invoicePostcode, [Validators.required]],
    });
  }

  onSubmit = () => {
    const values = this.formGroup.value;

    this.update.emit(values);
  };

  onCancel = () => {
    this.cancel.emit();
  };
}
