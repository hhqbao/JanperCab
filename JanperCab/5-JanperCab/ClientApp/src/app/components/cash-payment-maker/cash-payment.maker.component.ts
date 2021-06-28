import { EnquiryDto } from 'src/app/_models/enquiry/EnquiryDto';
import { DialogService } from '../../_services/dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cash-payment-maker',
  templateUrl: 'cash-payment-maker.component.html',
})
export class CashPaymentMakerComponent implements OnInit {
  @Input() enquiry: EnquiryDto;

  @Output() confirm = new EventEmitter<number>();
  @Output() cancel = new EventEmitter();

  formGroup: FormGroup;

  get remainingAmount(): number {
    return this.enquiry.totalPrice - this.enquiry.paidAmount;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      amount: [
        this.remainingAmount,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(this.remainingAmount),
        ],
      ],
    });
  }

  onMakePayment = () => {
    if (this.formGroup.invalid) {
      return;
    }

    const { amount } = this.formGroup.value;

    this.confirm.emit(amount);
  };
}
