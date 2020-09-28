import { CustomerType } from './../../_enums/CustomerType';
import { CabinetMakerDto } from './../../_models/customer/CabinetMakerDto';
import { Role } from './../../_enums/Role';
import { Router } from '@angular/router';
import { DuraformOrderForListDto } from './../../_models/duraform-order/DuraformOrderForListDto';
import { ItemList } from './../../_models/commons/ItemList';
import { DuraformJobService } from './../../_services/duraform-job.service';
import { OrderSearchFilterValues } from './../../_models/commons/OrderSearchFilterValues';
import { OrderStatus } from './../../_enums/OrderStatus';
import { DialogService } from './../../_services/dialog.service';
import { CustomerService } from './../../_services/customer.service';
import { AuthService } from './../../_services/auth.service';
import { LayoutService } from './../../_services/layout.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomerDto } from 'src/app/_models/customer/CustomerDto';

@Component({
  selector: 'app-duraform-order-list-page',
  templateUrl: 'duraform-order-list-page.component.html',
})
export class DuraformOrderListPageComponent implements OnInit {
  @ViewChild('customerSelector') customerSelector: ElementRef;

  itemList: ItemList<DuraformOrderForListDto> = null;
  filterValues = new OrderSearchFilterValues();

  isLoading = true;
  showCustomerPicker = false;

  orderStatus = OrderStatus;
  customerType = CustomerType;

  constructor(
    private layout: LayoutService,
    public auth: AuthService,
    private jobService: DuraformJobService,
    private router: Router,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.loadDuraformOrderList();

    setTimeout(() => {
      this.layout.toggleLeftNav(true);
    });
  }

  loadDuraformOrderList = () => {
    const { getDistributorOrders, getManufacturerOrders } = this.jobService;
    let request;

    switch (this.auth.role) {
      case Role[Role.CabinetMaker]:
        break;
      case Role[Role.Distributor]:
        request = getDistributorOrders(this.filterValues);
        break;
      case Role[Role.Manufacturer]:
        request = getManufacturerOrders(this.filterValues);
        break;
      default:
        this.dialog.error('Role Not Found');
        return;
    }

    this.isLoading = true;
    this.layout.showLoadingPanel();

    request.subscribe(
      (response) => {
        this.itemList = response;
        this.layout.closeLoadingPanel();
        this.isLoading = false;
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.isLoading = false;
        this.dialog.error(error);
      }
    );
  };

  onAllCustomerClick = () => {
    this.filterValues.customerId = 0;
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
      | 'customerOrderNumber'
      | 'orderStatus'
      | 'customer'
      | 'description'
      | 'createdDate'
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
    this.router.navigate([`dashboard/duraform/3/${id}`]);
  };
}
