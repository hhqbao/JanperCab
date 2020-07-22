import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-detail-form',
  templateUrl: 'invoice-detail-form.component.html',
})
export class InvoiceDetailFormComponent implements OnInit {
  stateControl: FormControl;
  states: any[] = [
    { text: 'ACT', value: 'ACT' },
    { text: 'NSW', value: 'NSW' },
    { text: 'NT', value: 'NT' },
    { text: 'QLD', value: 'QLD' },
    { text: 'SA', value: 'SA' },
    { text: 'TAS', value: 'TAS' },
    { text: 'VIC', value: 'VIC' },
  ];

  constructor(public order: DuraformOrderService, private fb: FormBuilder) {}

  ngOnInit() {
    this.stateControl = this.fb.control('', [Validators.required]);

    this.stateControl.patchValue(this.order.invoiceState);
  }

  onSelectState = () => {
    this.order.invoiceState = this.stateControl.value;
  };
}
