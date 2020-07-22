import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-delivery-detail-form',
  templateUrl: 'delivery-detail-form.component.html',
})
export class DeliveryDetailFormComponent implements OnInit {
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

    this.stateControl.patchValue(this.order.deliveryState);
  }

  onSelectState = () => {
    this.order.deliveryState = this.stateControl.value;
  };
}
