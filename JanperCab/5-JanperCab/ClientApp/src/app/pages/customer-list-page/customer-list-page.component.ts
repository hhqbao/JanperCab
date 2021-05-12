import { DialogService } from './../../_services/dialog.service';
import { CustomerListComponent } from '../../components/customer-list/customer-list.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerDto } from 'src/app/_models/customer/CustomerDto';

@Component({
  selector: 'app-customer-list-page',
  templateUrl: 'customer-list-page.component.html',
})
export class CustomerListPageComponent implements OnInit {
  @ViewChild('customerList') customerList: CustomerListComponent;

  selectedCustomer: CustomerDto = null;

  showCustomerForm = false;

  constructor(private dialogService: DialogService) {}

  ngOnInit() {}

  onAddNewClick = () => {
    this.selectedCustomer = null;
    this.showCustomerForm = true;
  };

  onSelectCustomer = (customer: CustomerDto) => {
    this.selectedCustomer = customer;
    this.showCustomerForm = true;
  };

  onSubmitCustomerForm = (customer: CustomerDto) => {
    this.dialogService.alert(
      'Action Success',
      'Customer has been updated',
      () => {
        this.showCustomerForm = false;
        this.customerList.loadCabinetMakerList();
      }
    );
  };
}
