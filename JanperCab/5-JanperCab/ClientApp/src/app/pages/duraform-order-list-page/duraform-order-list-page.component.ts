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
import { Component, OnInit } from '@angular/core';
import { CustomerType } from 'src/app/_enums/CustomerType';
import { CustomerDto } from 'src/app/_models/customer/CustomerDto';

@Component({
  selector: 'app-duraform-order-list-page',
  templateUrl: 'duraform-order-list-page.component.html',
})
export class DuraformOrderListPageComponent implements OnInit {
  customers: CustomerDto[] = [];
  orderStatus = OrderStatus;
  customerType = CustomerType;

  isLoading = true;
  filterValues = new OrderSearchFilterValues();
  itemList: ItemList<DuraformOrderForListDto> = null;

  constructor(
    private layout: LayoutService,
    public auth: AuthService,
    private jobService: DuraformJobService,
    private router: Router,
    private customerService: CustomerService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.layout.showLoadingPanel();
    const { customer } = this.auth;
    const { getCabinetMakerList, getDistributorList } = this.customerService;

    switch (customer.customerType) {
      case CustomerType.Distributor:
        getCabinetMakerList().subscribe(
          (response) => {
            this.customers = response;
            this.loadDuraformOrderList();
          },
          (error) => {
            this.dialog.error(error);
            this.layout.closeLoadingPanel();
          }
        );
        break;
      case CustomerType.Manufacturer:
        getDistributorList().subscribe(
          (response) => {
            this.customers = response;
            this.loadDuraformOrderList();
          },
          (error) => {
            this.dialog.error(error);
            this.layout.closeLoadingPanel();
          }
        );
        break;
      default:
        this.loadDuraformOrderList();
        break;
    }

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

    request.subscribe(
      (response) => {
        this.itemList = response;
        this.layout.closeLoadingPanel();
        this.isLoading = false;
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.isLoading = false;
      }
    );
  };

  onFilterValueChange = () => {
    this.filterValues.page = 0;

    this.isLoading = true;
    this.layout.showLoadingPanel();
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

    this.isLoading = true;
    this.layout.showLoadingPanel();
    this.loadDuraformOrderList();
  };

  onPageChange = (page: number) => {
    this.filterValues.page = page;

    this.isLoading = true;
    this.layout.showLoadingPanel();
    this.loadDuraformOrderList();
  };

  onSelectOrder = (id: string) => {
    this.router.navigate([`dashboard/duraform/3/${id}`]);
  };

  getCustomer = (id: number) => {
    const customer = this.customers.find((x) => x.id === id);

    return customer;
  };
}
