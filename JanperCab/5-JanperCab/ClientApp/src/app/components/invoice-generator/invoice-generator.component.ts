import { InvoiceDto } from './../../_models/invoice/InvoiceDto';
import { InvoiceService } from './../../_services/invoice.service';
import { LayoutService } from './../../_services/layout.service';
import { DialogService } from './../../_services/dialog.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-invoice-generator',
  templateUrl: 'invoice-generator.component.html',
})
export class InvoiceGeneratorComponent implements OnInit {
  @Output() afterGenerate = new EventEmitter<InvoiceDto>();
  @Output() closeBtnClick = new EventEmitter();

  @ViewChild('invoiceIdInput') invoiceIdInput: ElementRef;

  isLoading = false;
  invoiceForm: FormGroup;

  get invoiceIdControl(): AbstractControl {
    return this.invoiceForm.get('invoiceId');
  }

  constructor(
    private order: DuraformOrderService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private layoutService: LayoutService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit() {
    this.invoiceForm = this.fb.group({
      invoiceId: [null, [Validators.required]],
    });

    setTimeout(() => {
      (this.invoiceIdInput.nativeElement as HTMLElement).focus();
    });
  }

  onSubmit = () => {
    if (this.invoiceForm.invalid) {
      this.dialogService.alert('Invalid Form', 'Invoice Id Required!', () => {
        setTimeout(() => {
          (this.invoiceIdInput.nativeElement as HTMLElement).focus();
        });
      });
      return;
    }

    this.dialogService.confirm('Generating Invoice', 'Are you sure?', () => {
      this.isLoading = true;
      this.layoutService.showLoadingPanel();
      this.invoiceService
        .createInvoice(
          this.order.duraformEnquiry.id,
          this.invoiceIdControl.value
        )
        .subscribe(
          (response) => {
            this.isLoading = false;
            this.layoutService.closeLoadingPanel();
            this.dialogService.alert(
              'Generating Invoice Success',
              'Invoice has been generated successfully',
              () => {
                this.order.duraformEnquiry.invoice = response;
                this.afterGenerate.emit(response);
              }
            );
          },
          (error) => {
            this.isLoading = false;
            this.layoutService.closeLoadingPanel();
            this.dialogService.alert('Action Failed', error, null);
          }
        );
    });
  };

  @HostListener('document:keydown.Escape')
  onClose = () => {
    if (this.isLoading) {
      return;
    }

    this.closeBtnClick.emit();
  };
}
