import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { CommonAssetsService } from 'src/app/_services/common-assets.service';

@Component({
  selector: 'app-delivery-detail-form',
  templateUrl: 'delivery-detail-form.component.html',
})
export class DeliveryDetailFormComponent implements OnInit {
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
      deliveryTo: [duraformEnquiry.deliveryTo, [Validators.required]],
      deliveryAddress: [duraformEnquiry.deliveryAddress, [Validators.required]],
      deliverySuburb: [duraformEnquiry.deliverySuburb, [Validators.required]],
      deliveryState: [duraformEnquiry.deliveryState, [Validators.required]],
      deliveryPostcode: [
        duraformEnquiry.deliveryPostcode,
        [Validators.required],
      ],
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
