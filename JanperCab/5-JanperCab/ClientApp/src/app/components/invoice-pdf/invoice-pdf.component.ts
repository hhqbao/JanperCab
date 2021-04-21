import { InvoiceDto } from './../../_models/invoice/InvoiceDto';
import { DialogService } from './../../_services/dialog.service';
import { LayoutService } from './../../_services/layout.service';
import { InvoiceService } from './../../_services/invoice.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-invoice-pdf',
  templateUrl: 'invoice-pdf.component.html',
})
export class InvoicePdfComponent implements OnInit, OnDestroy {
  @Input() invoiceId: string;

  isLoading = false;
  invoice: InvoiceDto = null;

  constructor(
    private invoiceService: InvoiceService,
    private layoutService: LayoutService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.layoutService.showLoadingPanel();
    this.invoiceService.getInvoice(this.invoiceId).subscribe(
      (response) => {
        this.invoice = response;
        document.title = `INVOICE ${this.invoice.id}`;

        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
      },
      (error) => {
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
        this.dialogService.alert('Error Occured', error, null);
      }
    );
  }

  ngOnDestroy(): void {
    document.title = 'JanperCab';
  }
}
