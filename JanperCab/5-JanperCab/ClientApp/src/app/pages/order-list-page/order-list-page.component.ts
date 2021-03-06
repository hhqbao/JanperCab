import { ProcessTypeEnum } from '../../_enums/ProcessTypeEnum';
import { plainToClass } from 'class-transformer';
import { DialogService } from 'src/app/_services/dialog.service';
import { EnquiryService } from '../../_services/enquiry.service';
import { ItemList } from '../../_models/commons/ItemList';
import { EnquiryListDto } from '../../_models/enquiry/EnquiryListDto';
import { CustomerType } from '../../_enums/CustomerType';
import { CabinetMakerDto } from '../../_models/customer/CabinetMakerDto';
import { Router } from '@angular/router';
import { OrderSearchFilterValues } from '../../_models/commons/OrderSearchFilterValues';
import { AuthService } from '../../_services/auth.service';
import { LayoutService } from '../../_services/layout.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as scanner from 'onscan.js';
import { Role } from 'src/app/_enums/Role';

@Component({
  selector: 'app-order-list-page',
  templateUrl: 'order-list-page.component.html',
})
export class OrderListPageComponent implements OnInit {
  @ViewChild('customerSelector') customerSelector: ElementRef;

  itemList: ItemList<EnquiryListDto>;
  filterValues = new OrderSearchFilterValues();
  statusEnums = ProcessTypeEnum;

  isLoading = true;
  showCustomerPicker = false;
  customerType = CustomerType;
  roles = Role;

  constructor(
    private ef: ElementRef,
    private layout: LayoutService,
    public auth: AuthService,
    private enquiryService: EnquiryService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.loadDuraformOrderList();

    setTimeout(() => {
      this.layout.toggleLeftNav(true);

      const selfDOM = this.ef.nativeElement as HTMLElement;

      scanner.attachTo(selfDOM, {
        onScan: (sCode: any, iQty: any) => {
          console.log('Scanned: ' + iQty + 'x ' + sCode);
        },
      });

      scanner.simulate(selfDOM, '1234567890123');
    });
  }

  loadDuraformOrderList = () => {
    this.isLoading = true;
    this.layout.showLoadingPanel();
    this.enquiryService.getOrders(this.filterValues).subscribe(
      (response) => {
        this.itemList = new ItemList<EnquiryListDto>();
        this.itemList.items = plainToClass(EnquiryListDto, response.items);
        this.itemList.totalItemCount = response.totalItemCount;

        this.isLoading = false;
        this.layout.closeLoadingPanel();
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.isLoading = false;
        this.dialog.error(error);
      }
    );
  };

  onAllCustomerClick = () => {
    this.filterValues.customerId = null;
    (this.customerSelector.nativeElement as HTMLElement).setAttribute(
      'value',
      'All'
    );

    this.showCustomerPicker = false;

    this.onFilterValueChange();
  };

  onSelectCustomer = (maker: CabinetMakerDto) => {
    this.filterValues.customerId = maker.id;
    (this.customerSelector.nativeElement as HTMLElement).setAttribute(
      'value',
      maker.name
    );

    this.showCustomerPicker = false;

    this.onFilterValueChange();
  };

  onFilterValueChange = () => {
    this.filterValues.page = 0;

    this.loadDuraformOrderList();
  };

  onSortColumn = (
    sortBy:
      | 'orderNumber'
      | 'customerReference'
      | 'type'
      | 'customer'
      | 'description'
      | 'orderedDate'
  ) => {
    const { filterValues } = this;

    if (filterValues.sortBy === sortBy) {
      filterValues.direction =
        filterValues.direction === 'asc' ? 'desc' : 'asc';
    } else {
      filterValues.sortBy = sortBy;
      filterValues.direction = 'asc';
    }

    this.loadDuraformOrderList();
  };

  onPageChange = (page: number) => {
    this.filterValues.page = page;

    this.loadDuraformOrderList();
  };

  onSelectOrder = (id: string) => {
    const url = `${window.location.origin}/dashboard/duraform/${id}`;

    window.open(url, '_blank');
  };
}
