import { plainToClass } from 'class-transformer';
import { DialogService } from '../../_services/dialog.service';
import { AuthService } from '../../_services/auth.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { EnquiryDto } from 'src/app/_models/enquiry/EnquiryDto';

@Component({
  selector: 'app-enquiry-invoicing-status-updator',
  templateUrl: 'enquiry-invoicing-status-updator.component.html',
})
export class EnquiryInvoicingStatusUpdatorComponent
  implements OnInit, OnDestroy
{
  @Input() enquiry: EnquiryDto;

  eventSource: any;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    console.log('Order Invoicing Status Updator Initialized');
    this.eventSource = new EventSourcePolyfill(
      `SSE/EnquiryEvent/check-has-been-invoiced/${this.enquiry.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );

    this.eventSource.onmessage = (event: any) => {
      const hasBeenInvoiced = plainToClass(
        Boolean,
        JSON.parse(`${event.data}`.toLowerCase())
      );

      if (hasBeenInvoiced && !this.enquiry.hasBeenInvoiced) {
        window.location.reload();
      }
    };

    this.eventSource.onerror = (event: any) => {
      if (event.error) {
        this.dialogService.error(
          'Invoicing Status Updator Error: ' + event.error
        );
      }
    };
  }

  ngOnDestroy(): void {
    console.log('Order Invoicing Status Updator Closed');
    this.eventSource.close();
  }
}
