import { DuraformEnquiryListDto } from './../../_models/enquiry/DuraformEnquiryListDto';
import { LayoutService } from './../../_services/layout.service';
import { EnquiryService } from './../../_services/enquiry.service';
import { Router } from '@angular/router';
import { DialogService } from '../../_services/dialog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duraform-draft-list',
  templateUrl: 'duraform-draft-list.component.html',
})
export class DuraformDraftListComponent implements OnInit {
  isInitializing = true;

  drafts: DuraformEnquiryListDto[] = [];

  constructor(
    private dialog: DialogService,
    private router: Router,
    private enquiryService: EnquiryService,
    private layout: LayoutService
  ) {}

  ngOnInit() {
    this.layout.showLoadingPanel();

    this.enquiryService.getDuraformDrafts().subscribe(
      (response) => {
        this.drafts = response;
        this.isInitializing = false;
        this.layout.closeLoadingPanel();
      },
      (error) => {
        this.dialog.error(error);
        this.layout.closeLoadingPanel();
      }
    );
  }

  onItemClick = (item: DuraformEnquiryListDto) => {
    this.router.navigate([`dashboard/duraform/${item.id}`]);
  };
}
