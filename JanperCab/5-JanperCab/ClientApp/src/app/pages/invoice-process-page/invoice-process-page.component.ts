import { Router } from '@angular/router';
import { plainToClass } from 'class-transformer';
import { AuthService } from './../../_services/auth.service';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { DialogService } from './../../_services/dialog.service';
import { LayoutService } from './../../_services/layout.service';
import { EnquiryService } from './../../_services/enquiry.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnquiryForInvoicingDto } from 'src/app/_models/enquiry/EnquiryForInvoicingDto';

@Component({
  selector: 'app-invoice-process-page',
  templateUrl: 'invoice-process-page.component.html',
})
export class InvoiceProcessPageComponent implements OnInit, OnDestroy {
  enquiries: EnquiryForInvoicingDto[];
  isLoading = true;
  eventSource: any;

  constructor(
    private enquiryService: EnquiryService,
    private layoutService: LayoutService,
    private dialogService: DialogService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.layoutService.showLoadingPanel();
    this.enquiryService.getEnquiriesForInvoicing().subscribe(
      (response) => {
        this.enquiries = response;
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
        this.autoPull();
      },
      (error) => {
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
        this.dialogService.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    console.log('Orders For Invoicing List Updator Closed');
    this.eventSource.close();
  }

  autoPull = () => {
    console.log('Orders For Invoicing List Updator Initialized');
    this.eventSource = new EventSourcePolyfill(
      `SSE/EnquiryEvent/For-Invoicing`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );

    this.eventSource.onmessage = (event: any) => {
      const pulledEnquiries = plainToClass(
        EnquiryForInvoicingDto,
        JSON.parse(event.data) as any[]
      );

      this.enquiries.forEach((existEnquiry) => {
        if (!pulledEnquiries.some((x) => x.id === existEnquiry.id)) {
          this.enquiries.splice(this.enquiries.indexOf(existEnquiry), 1);
        }
      });

      pulledEnquiries.forEach((pulledEnquiry) => {
        const existEnquiry = this.enquiries.find(
          (x) => x.id === pulledEnquiry.id
        );

        if (!existEnquiry) {
          this.enquiries.push(pulledEnquiry);
        }
      });
    };

    this.eventSource.onerror = (event: any) => {
      if (event.error) {
        this.dialogService.error(
          'Orders For Invoicing List Updator Error: ' + event.error
        );
      }
    };
  };

  onSelectEnquiry = (enquiry: EnquiryForInvoicingDto) => {
    const url = `${window.location.origin}/dashboard/duraform/${enquiry.id}`;

    window.open(url, '_blank');
  };
}
