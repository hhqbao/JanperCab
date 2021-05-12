import { LayoutService } from '../../_services/layout.service';
import { plainToClass } from 'class-transformer';
import { DialogService } from '../../_services/dialog.service';
import { CabinetMakerSearchFilterValues } from '../../_models/commons/CabinetMakerSearchFilterValues';
import { CustomerService } from '../../_services/customer.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ItemList } from 'src/app/_models/commons/ItemList';
import { CabinetMakerDto } from 'src/app/_models/customer/CabinetMakerDto';
import { CustomerDto } from 'src/app/_models/customer/CustomerDto';
import { CustomerType } from 'src/app/_enums/CustomerType';

@Component({
  selector: 'app-customer-list',
  templateUrl: 'customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
  @Input() allowAdd = true;
  @Input() allowDelete = true;

  @Output() addNewClick = new EventEmitter();
  @Output() itemClick = new EventEmitter<CabinetMakerDto>();

  itemList: ItemList<CustomerDto> = null;
  filterValues: CabinetMakerSearchFilterValues;
  isLoading: boolean;

  constructor(
    private layout: LayoutService,
    private customerService: CustomerService,
    private dialog: DialogService
  ) {
    this.filterValues = new CabinetMakerSearchFilterValues();
  }

  ngOnInit() {
    this.loadCabinetMakerList();
  }

  loadCabinetMakerList = () => {
    this.isLoading = true;
    this.layout.showLoadingPanel();
    this.customerService.getCustomerList(this.filterValues).subscribe(
      (response) => {
        this.itemList = new ItemList<CabinetMakerDto>();
        this.itemList.items = plainToClass(CabinetMakerDto, response.items);
        this.itemList.totalItemCount = response.totalItemCount;
        this.isLoading = false;
        this.layout.closeLoadingPanel();
      },
      (error) => {
        this.isLoading = false;
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
        this.dialog.error('Failed Loading Customer List');
      }
    );
  };

  getTypeDescription = (customerType: CustomerType): string => {
    switch (customerType) {
      case CustomerType.CabinetMaker:
        return 'Cabinet Maker';
      case CustomerType.Distributor:
        return 'Distributor';
      case CustomerType.Manufacturer:
        return 'Manufacturer';
    }
  };

  onAddCabinetMaker = () => {
    this.addNewClick.emit();
  };

  onSelectCabinetMaker = (maker: CabinetMakerDto) => {
    this.itemClick.emit(maker);
  };

  onPageChange = (page: number) => {
    this.filterValues.page = page;
    this.loadCabinetMakerList();
  };

  onSortColumn = (
    sortBy: 'name' | 'type' | 'email' | 'invoice' | 'delivery'
  ) => {
    if (this.filterValues.sortBy === sortBy) {
      this.filterValues.direction =
        this.filterValues.direction === 'desc' ? 'asc' : 'desc';
    } else {
      this.filterValues.direction = 'asc';
    }

    this.filterValues.sortBy = sortBy;

    this.loadCabinetMakerList();
  };

  onSearch = () => {
    this.filterValues.page = 0;
    this.filterValues.sortBy = 'name';
    this.filterValues.direction = 'asc';
    this.loadCabinetMakerList();
  };
}
