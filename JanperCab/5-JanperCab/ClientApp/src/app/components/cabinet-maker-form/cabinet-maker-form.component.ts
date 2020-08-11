import { plainToClass } from 'class-transformer';
import { CommonAssetsService } from './../../_services/common-assets.service';
import { CabinetMakerDto } from './../../_models/customer/CabinetMakerDto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-cabinet-maker-form',
  templateUrl: 'cabinet-maker-form.component.html',
})
export class CabinetMakerFormComponent implements OnInit {
  @Input() cabinetMaker: CabinetMakerDto;
  @Output() submitForm = new EventEmitter();
  @Output() closeForm = new EventEmitter();

  formGroup: FormGroup;
  @ViewChild('cabinetMakerName') cabinetMakerName: ElementRef;

  constructor(
    private fb: FormBuilder,
    public commonAssets: CommonAssetsService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [this.cabinetMaker?.name, [Validators.required]],
      email: [
        this.cabinetMaker?.email,
        [Validators.required, Validators.email],
      ],
      phone: [this.cabinetMaker?.phone, [Validators.required]],
      invoiceTo: [this.cabinetMaker?.invoiceTo, [Validators.required]],
      invoiceAddress: [
        this.cabinetMaker?.invoiceAddress,
        [Validators.required],
      ],
      invoiceSuburb: [this.cabinetMaker?.invoiceSuburb, [Validators.required]],
      invoiceState: [this.cabinetMaker?.invoiceState, [Validators.required]],
      invoicePostcode: [
        this.cabinetMaker?.invoicePostcode,
        [Validators.required],
      ],
      deliveryTo: [this.cabinetMaker?.deliveryTo, [Validators.required]],
      deliveryAddress: [
        this.cabinetMaker?.deliveryAddress,
        [Validators.required],
      ],
      deliverySuburb: [
        this.cabinetMaker?.deliverySuburb,
        [Validators.required],
      ],
      deliveryState: [this.cabinetMaker?.deliveryState, [Validators.required]],
      deliveryPostcode: [
        this.cabinetMaker?.deliveryPostcode,
        [Validators.required],
      ],
    });

    setTimeout(() => {
      (this.cabinetMakerName.nativeElement as HTMLElement).focus();
    });
  }

  onSubmit = () => {
    const values = this.formGroup.value;

    this.submitForm.emit(plainToClass(CabinetMakerDto, values));
  };

  onCloseForm = () => {
    this.closeForm.emit();
  };
}
