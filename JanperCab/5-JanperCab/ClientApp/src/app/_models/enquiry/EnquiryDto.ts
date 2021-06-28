import { CashOrderPaymentDto } from './../cash-order-payment/CashOrderPaymentDto';
import { ProcessPackingDto } from '../process/ProcessPackingDto';
import { ProcessPreRouteDto } from '../process/ProcessPreRouteDto';
import { ManufacturerDto } from './../customer/ManufacturerDto';
import { DistributorDto } from './../customer/DistributorDto';
import { CabinetMakerDto } from './../customer/CabinetMakerDto';
import { CustomerDto } from 'src/app/_models/customer/CustomerDto';
import { InvoiceDto } from './../invoice/InvoiceDto';
import { EnquiryTypeEnum } from './../../_enums/EnquiryTypeEnum';
import { Type } from 'class-transformer';
import { ProcessDto } from '../process/ProcessDto';
import { ProcessRoutingDto } from '../process/ProcessRoutingDto';
import { ProcessPressingDto } from '../process/ProcessPressingDto';
import { ProcessCleaningDto } from '../process/ProcessCleaningDto';
import { ProcessDeliveringDto } from '../process/ProcessDeliveringDto';
import { ProcessTypeEnum } from 'src/app/_enums/ProcessTypeEnum';
import * as moment from 'moment';
import * as _ from 'lodash';
import { EnquiryPaymentType } from 'src/app/_enums/EnquiryPaymentType';

export abstract class EnquiryDto {
  $type: string;
  id: number;
  customerReference: string;
  enquiryType: EnquiryTypeEnum;
  enquiryPaymentType: EnquiryPaymentType;
  createdDate: Date;
  lastEditted: Date;
  orderedDate: Date;
  approvedDate: Date;

  creatorId: string;

  customerId: number;
  managerId: number;

  invoiceTo: string;
  invoiceAddress: string;
  invoiceSuburb: string;
  invoiceState: string;
  invoicePostcode: string;

  deliveryTo: string;
  deliveryAddress: string;
  deliverySuburb: string;
  deliveryState: string;
  deliveryPostcode: string;

  deliveryNote: string;

  gstRate: number;
  discountRate: number;

  deliveryFee: number;
  subTotal: number;
  totalGst: number;
  totalPrice: number;

  notEditable: boolean;
  isDeclineable: boolean;

  toBePriced: boolean;
  isShippingRequired: boolean;
  hasFixedPrice: boolean;

  @Type(() => InvoiceDto)
  invoice: InvoiceDto;

  @Type(() => CustomerDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: CabinetMakerDto,
          name: '_3_Application.Dtos.Customer.CabinetMakerDto, 3-Application',
        },
        {
          value: DistributorDto,
          name: '_3_Application.Dtos.Customer.DistributorDto, 3-Application',
        },
        {
          value: ManufacturerDto,
          name: '_3_Application.Dtos.Customer.ManufacturerDto, 3-Application',
        },
      ],
    },
  })
  customer: CustomerDto;

  @Type(() => CustomerDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: CabinetMakerDto,
          name: '_3_Application.Dtos.Customer.CabinetMakerDto, 3-Application',
        },
        {
          value: DistributorDto,
          name: '_3_Application.Dtos.Customer.DistributorDto, 3-Application',
        },
        {
          value: ManufacturerDto,
          name: '_3_Application.Dtos.Customer.ManufacturerDto, 3-Application',
        },
      ],
    },
  })
  manager: CustomerDto;

  @Type(() => ProcessDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: ProcessPreRouteDto,
          name: '_3_Application.Dtos.Process.ProcessPreRouteDto, 3-Application',
        },
        {
          value: ProcessRoutingDto,
          name: '_3_Application.Dtos.Process.ProcessRoutingDto, 3-Application',
        },
        {
          value: ProcessPressingDto,
          name: '_3_Application.Dtos.Process.ProcessPressingDto, 3-Application',
        },
        {
          value: ProcessCleaningDto,
          name: '_3_Application.Dtos.Process.ProcessCleaningDto, 3-Application',
        },
        {
          value: ProcessPackingDto,
          name: '_3_Application.Dtos.Process.ProcessPackingDto, 3-Application',
        },
        {
          value: ProcessDeliveringDto,
          name: '_3_Application.Dtos.Process.ProcessDeliveringDto, 3-Application',
        },
      ],
    },
  })
  processes: ProcessDto[];

  @Type(() => CashOrderPaymentDto)
  cashOrderPayments: CashOrderPaymentDto[];

  get discriminator(): string {
    return `${this.enquiryType}`;
  }

  get timeInSystem(): string {
    const offset = moment().diff(moment(this.orderedDate), 'days');

    return `${offset} day${offset > 1 ? 's' : ''}`;
  }

  get currentStatus(): ProcessDto {
    const status = this.processes.find((x) => x.isCurrent);

    return status;
  }

  get statusDescription(): string {
    if (!this.currentStatus) {
      return 'Ordered';
    }

    if (this.hasBeenInvoiced) {
      return 'Invoiced';
    }

    return this.currentStatus.getStatus();
  }

  get hasBeenDelivered(): boolean {
    if (!this.currentStatus) {
      return false;
    }

    const { endTime, processType } = this.currentStatus;

    return (
      processType === ProcessTypeEnum.Delivering &&
      endTime !== null &&
      endTime !== undefined
    );
  }

  get hasBeenInvoiced(): boolean {
    return this.invoice !== null && this.invoice !== undefined;
  }

  get hasBeenFullyPaid(): boolean {
    if (this.enquiryPaymentType === EnquiryPaymentType.Account) {
      return true;
    }

    return this.paidAmount >= this.totalPrice;
  }

  get paidAmount(): number {
    let paidAmount = 0;

    this.cashOrderPayments.forEach((x) => (paidAmount += x.amount));

    return paidAmount;
  }

  abstract get jobType(): string;
  abstract get hasComponent(): boolean;

  constructor() {
    this.$type = '_3_Application.Dtos.Enquiry.EnquiryDto, 3-Application';
    this.enquiryType = EnquiryTypeEnum.Draft;
    this.enquiryPaymentType = EnquiryPaymentType.CBD;

    this.processes = [];
    this.cashOrderPayments = [];

    this.gstRate = 10;
    this.discountRate = 0;
    this.deliveryFee = 0;
    this.isShippingRequired = true;
  }

  abstract calculatePrice(includeUnitPrice: boolean): void;

  toggleShippingRequired = (): void => {
    this.deliveryFee = this.isShippingRequired ? this.customer?.deliveryFee : 0;

    if (!this.hasFixedPrice) {
      this.calculatePrice(false);
    }
  };

  calculateTotalPrice = (): void => {
    this.subTotal += this.deliveryFee;

    this.totalGst = _.round(this.subTotal / this.gstRate, 2);
    this.totalPrice = this.subTotal + this.totalGst;
  };
}
