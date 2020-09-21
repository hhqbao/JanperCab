import { Router } from '@angular/router';
import { DuraformDraftForListDto } from '../../_models/duraform-draft/DuraformDraftForListDto';
import { plainToClass } from 'class-transformer';
import { DialogService } from '../../_services/dialog.service';
import { DuraformDraftService } from '../../_services/duraform-draft.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duraform-draft-list',
  templateUrl: 'duraform-draft-list.component.html',
})
export class DuraformDraftListComponent implements OnInit {
  isInitializing = true;

  drafts: DuraformDraftForListDto[] = [];

  constructor(
    private draftService: DuraformDraftService,
    private dialog: DialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.draftService.getDuraformDraftList().subscribe(
      (response) => {
        this.drafts = plainToClass(DuraformDraftForListDto, response);
        this.isInitializing = false;
      },
      (error) => {
        this.dialog.error(error);
      }
    );
  }

  onItemClick = (item: DuraformDraftForListDto) => {
    this.router.navigate([`dashboard/duraform/1/${item.id}`]);
  };
}
