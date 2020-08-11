import { DialogService } from 'src/app/_services/dialog.service';
import { CustomerService } from './../../_services/customer.service';
import { AuthService } from 'src/app/_services/auth.service';
import { CabinetMakerDto } from './../../_models/customer/CabinetMakerDto';
import { LayoutService } from 'src/app/_services/layout.service';
import { Component, OnInit } from '@angular/core';
import { classToClassFromExist } from 'class-transformer';

@Component({
  selector: 'app-cabinet-maker-list-page',
  templateUrl: 'cabinet-maker-list-page.component.html',
})
export class CabinetMakerListPageComponent implements OnInit {
  cabinetMakerList: CabinetMakerDto[] = [];
  selectedCabinetMaker: CabinetMakerDto = null;

  showCabinetMakerForm = false;
  isLoadingCabinetMakerList = true;

  constructor(
    private layout: LayoutService,
    private dialog: DialogService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.loadCabinetMakerList();
  }

  private loadCabinetMakerList = () => {
    this.layout.showLoadingPanel();
    this.customerService.getCabinetMakerList().subscribe(
      (reponse) => {
        this.cabinetMakerList = reponse;
        this.layout.closeLoadingPanel();
        this.isLoadingCabinetMakerList = false;
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
        this.dialog.error('Failed Getting Customer List!');
      }
    );
  };

  private createCabinetMaker = (cabinetMaker: CabinetMakerDto) => {
    this.layout.showLoadingPanel();
    this.customerService.createCabinetMaker(cabinetMaker).subscribe(
      (response) => {
        this.layout.closeLoadingPanel();
        this.cabinetMakerList.push(response);
        this.dialog.success('New Customer Added!');
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
        this.dialog.error('Failed Adding Customer!');
      }
    );
  };

  private updateCabinetMaker = (cabinetMaker: CabinetMakerDto) => {
    this.layout.showLoadingPanel();
    this.customerService
      .updateCabinetMaker(this.selectedCabinetMaker.id, cabinetMaker)
      .subscribe(
        (response) => {
          const existMaker = this.cabinetMakerList.find(
            (x) => x.id === this.selectedCabinetMaker.id
          );

          existMaker.name = response.name;
          existMaker.email = response.email;
          existMaker.phone = response.phone;
          existMaker.invoiceTo = response.invoiceTo;
          existMaker.invoiceAddress = response.invoiceAddress;
          existMaker.invoiceSuburb = response.invoiceSuburb;
          existMaker.invoiceState = response.invoiceState;
          existMaker.invoicePostcode = response.invoicePostcode;
          existMaker.deliveryTo = response.deliveryTo;
          existMaker.deliveryAddress = response.deliveryAddress;
          existMaker.deliverySuburb = response.deliverySuburb;
          existMaker.deliveryState = response.deliveryState;
          existMaker.deliveryPostcode = response.deliveryPostcode;

          this.layout.closeLoadingPanel();
          this.dialog.success('Customer Updated Successfully!');
        },
        (error) => {
          this.layout.closeLoadingPanel();
          this.dialog.error(error);
          this.dialog.error('Failed Updating Customer!');
        }
      );
  };

  onAddingNewCabinetMaker = () => {
    this.selectedCabinetMaker = null;
    this.showCabinetMakerForm = true;
  };

  onSelectCabinetMaker = (cabinetMaker: CabinetMakerDto) => {
    this.selectedCabinetMaker = cabinetMaker;
    this.showCabinetMakerForm = true;
  };

  onSubmitMakerForm = (cabinetMaker: CabinetMakerDto) => {
    this.showCabinetMakerForm = false;

    if (this.selectedCabinetMaker) {
      this.updateCabinetMaker(cabinetMaker);
    } else {
      this.createCabinetMaker(cabinetMaker);
    }
  };
}
