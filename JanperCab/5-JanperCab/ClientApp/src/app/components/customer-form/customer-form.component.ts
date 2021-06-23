import { ManufacturerDto } from './../../_models/customer/ManufacturerDto';
import { Role } from './../../_enums/Role';
import { AuthService } from './../../_services/auth.service';
import { CustomerType } from './../../_enums/CustomerType';
import { CustomerDto } from 'src/app/_models/customer/CustomerDto';
import { DialogService } from '../../_services/dialog.service';
import { LayoutService } from '../../_services/layout.service';
import { CustomerService } from '../../_services/customer.service';
import { plainToClass } from 'class-transformer';
import { CommonAssetsService } from '../../_services/common-assets.service';
import { CabinetMakerDto } from '../../_models/customer/CabinetMakerDto';
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
import { DistributorDto } from 'src/app/_models/customer/DistributorDto';
import { CustomerCategoryDto } from 'src/app/_models/customer-category/CustomerCategoryDto';

@Component({
  selector: 'app-customer-form',
  templateUrl: 'customer-form.component.html',
})
export class CustomerFormComponent implements OnInit {
  @Input() customer: CustomerDto;
  @Output() submitForm = new EventEmitter<CustomerDto>();
  @Output() closeForm = new EventEmitter();

  @ViewChild('customerName') customerName: ElementRef;

  formGroup: FormGroup;
  isLoading = false;
  role = Role;

  customerTypeOptions = [
    {
      id: CustomerType.CabinetMaker,
      value: 'Cabinet Maker',
    },
    {
      id: CustomerType.Distributor,
      value: 'Distributor',
    },
  ];

  customerCategories: CustomerCategoryDto[] = [];

  get customerTypeControl(): AbstractControl {
    return this.formGroup.get('customerType');
  }

  get customerCategoryIdControl(): AbstractControl {
    return this.formGroup.get('customerCategoryId');
  }

  get discountRate(): AbstractControl {
    return this.formGroup.get('discountRate');
  }

  get deliveryFee(): AbstractControl {
    return this.formGroup.get('deliveryFee');
  }

  get managerIdValue(): number {
    if (this.customer) {
      return this.customer.managerId;
    }

    if (this.authService.isInRole(Role.Manufacturer)) {
      return null;
    }

    if (this.authService.isInRole(Role.Distributor)) {
      return this.authService.customer.id;
    }
  }

  constructor(
    private layout: LayoutService,
    private dialog: DialogService,
    private fb: FormBuilder,
    public commonAssets: CommonAssetsService,
    private customerService: CustomerService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      managerId: [this.managerIdValue],
      customerType: [
        this.customer ? this.customer.customerType : CustomerType.CabinetMaker,
        [Validators.required],
      ],
      customerCategoryId: [
        this.customer ? this.customer.customerCategoryId : null,
        [Validators.required],
      ],
      name: [this.customer?.name, [Validators.required]],
      email: [this.customer?.email, [Validators.required, Validators.email]],
      phone: [this.customer?.phone, [Validators.required]],
      invoiceTo: [this.customer?.invoiceTo, [Validators.required]],
      invoiceAddress: [this.customer?.invoiceAddress, [Validators.required]],
      invoiceSuburb: [this.customer?.invoiceSuburb, [Validators.required]],
      invoiceState: [this.customer?.invoiceState, [Validators.required]],
      invoicePostcode: [this.customer?.invoicePostcode, [Validators.required]],
      deliveryTo: [this.customer?.deliveryTo, [Validators.required]],
      deliveryAddress: [this.customer?.deliveryAddress, [Validators.required]],
      deliverySuburb: [this.customer?.deliverySuburb, [Validators.required]],
      deliveryState: [this.customer?.deliveryState, [Validators.required]],
      deliveryPostcode: [
        this.customer?.deliveryPostcode,
        [Validators.required],
      ],
      discountRate: [
        this.customer ? this.customer.discountRate : 0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      deliveryFee: [
        this.customer ? this.customer.deliveryFee : 0,
        [Validators.required, Validators.min(0)],
      ],
      isOnHold: [this.customer.isOnHold ?? false, []],
    });

    this.isLoading = true;
    this.layout.showLoadingPanel();
    this.customerService.getCustomerCategoryList().subscribe(
      (response) => {
        this.customerCategories = response;

        this.isLoading = false;
        this.layout.closeLoadingPanel();

        setTimeout(() => {
          (this.customerName.nativeElement as HTMLElement).focus();
        });
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.alert('Application Error', error, null);
      }
    );
  }

  onSubmit = () => {
    if (this.formGroup.invalid) {
      return;
    }

    let model: CustomerDto;

    switch (this.customerTypeControl.value) {
      case CustomerType.CabinetMaker:
        model = plainToClass(CabinetMakerDto, this.formGroup.value);
        break;
      case CustomerType.Distributor:
        model = plainToClass(DistributorDto, this.formGroup.value);
        break;
      case CustomerType.Manufacturer:
        model = plainToClass(ManufacturerDto, this.formGroup.value);
        break;
    }

    const { create, update } = this.customerService;
    const request = this.customer
      ? update(this.customer.id, model)
      : create(model);

    this.isLoading = true;
    this.layout.showLoadingPanel();
    request.subscribe(
      (response) => {
        this.isLoading = false;
        this.layout.closeLoadingPanel();
        this.submitForm.emit(response);
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
