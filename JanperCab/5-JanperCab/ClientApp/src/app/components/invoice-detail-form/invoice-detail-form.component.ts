import { CommonAssetsService } from './../../_services/common-assets.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
    const { duraformEnquiry } = this.order;

    this.formGroup = this.fb.group({
      invoiceTo: [duraformEnquiry.invoiceTo, [Validators.required]],
      invoiceAddress: [duraformEnquiry.invoiceAddress, [Validators.required]],
      invoiceSuburb: [duraformEnquiry.invoiceSuburb, [Validators.required]],
      invoiceState: [duraformEnquiry.invoiceState, [Validators.required]],
      invoicePostcode: [duraformEnquiry.invoicePostcode, [Validators.required]],
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
