import { DialogService } from './../../_services/dialog.service';
import { LayoutService } from './../../_services/layout.service';
import { EnquiryService } from './../../_services/enquiry.service';
import { PackingLabelDto } from './../../_models/packing-label/PackingLabelDto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-packing-label-pdf',
  templateUrl: 'packing-label-pdf.component.html',
})
export class PackingLabelPdfComponent implements OnInit {
  @Input() enquiryId: number;

  isLoading = false;
  packingLabel: PackingLabelDto;

  constructor(
    private enquiryService: EnquiryService,
    private layoutService: LayoutService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.layoutService.showLoadingPanel();
    this.enquiryService.getPackingLabel(this.enquiryId).subscribe(
      (response) => {
        this.packingLabel = response;
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.alert('Error Occured', error, null);
      }
    );
  }
}
