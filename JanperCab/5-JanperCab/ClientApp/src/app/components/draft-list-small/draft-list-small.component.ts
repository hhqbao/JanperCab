import { Router } from '@angular/router';
import { DuraformDraftForSmallList } from './../../_models/duraform-draft/DuraformDraftForSmallList';
import { plainToClass } from 'class-transformer';
import { DialogService } from './../../_services/dialog.service';
import { DuraformDraftDto } from './../../_models/duraform-order/DuraformDraftDto';
import { DuraformDoorDto } from './../../_models/duraform-component/DuraformDoorDto';
import { DuraformDraftService } from './../../_services/duraform-draft.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draft-list-small',
  templateUrl: 'draft-list-small.component.html',
})
export class DraftListSmallComponent implements OnInit {
  isInitializing = true;

  drafts: DuraformDraftForSmallList[] = [];

  constructor(
    private draftService: DuraformDraftService,
    private dialog: DialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.draftService.getSmallList().subscribe(
      (response) => {
        this.drafts = plainToClass(DuraformDraftForSmallList, response);
        this.isInitializing = false;
      },
      (error) => {
        this.dialog.error(error);
      }
    );
  }

  onItemClick = (item: DuraformDraftForSmallList) => {
    this.router.navigate([`dashboard/duraform/1/${item.id}`]);
  };
}
