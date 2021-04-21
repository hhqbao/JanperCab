import { DialogService } from './../../_services/dialog.service';
import { LayoutService } from './../../_services/layout.service';
import { CustomerService } from './../../_services/customer.service';
import { plainToClass } from 'class-transformer';
import { CommonAssetsService } from './../../_services/common-assets.service';
import { CabinetMakerDto } from './../../_models/customer/CabinetMakerDto';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
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
  @Output() submitForm = new EventEmitter<CabinetMakerDto>();
  @Output() closeForm = new EventEmitter();

  @ViewChild('cabinetMakerName') cabinetMakerName: ElementRef;

  formGroup: FormGroup;
  isLoading = false;

  get discountRate(): AbstractControl {
    return this.formGroup.get('discountRate');
  }

  constructor(
    private layout: LayoutService,
    private dialog: DialogService,
    private fb: FormBuilder,
    public commonAssets: CommonAssetsService,
    private customerService: CustomerService
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
      discountRate: [
        this.cabinetMaker ? this.cabinetMaker.discountRate : 0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });

    setTimeout(() => {
      (this.cabinetMakerName.nativeElement as HTMLElement).focus();
    });
  }

  onSubmit = () => {
    const model = plainToClass(CabinetMakerDto, this.formGroup.value);
    const { createCabinetMaker, updateCabinetMaker } = this.customerService;
    const request = this.cabinetMaker
      ? updateCabinetMaker(this.cabinetMaker.id, model)
      : createCabinetMaker(model);

    this.isLoading = true;
    this.layout.showLoadingPanel();
    request.subscribe(
      (response) => {
        this.isLoading = false;
        this.layout.closeLoadingPanel();
        this.submitForm.emit(plainToClass(CabinetMakerDto, response));
      },
      (error) => {
        this.isLoading = false;
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
        this.dialog.error('Submit Form Failed');
      }
    );
  };

  onCloseForm = () => {
    this.closeForm.emit();
  };
}
