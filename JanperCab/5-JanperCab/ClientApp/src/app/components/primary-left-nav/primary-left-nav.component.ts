import { DialogService } from './../../_services/dialog.service';
import { DashboardService } from './../../_services/dashboard.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-primary-left-nav',
  templateUrl: 'primary-left-nav.component.html',
})
export class PrimaryLeftNavComponent implements OnInit {
  numberOfDrafts = 0;

  constructor(
    private dashboard: DashboardService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.countDraft();
  }

  private countDraft = () => {
    this.dashboard.countDraft().subscribe(
      (response) => {
        this.numberOfDrafts = response;
      },
      (error) => {
        this.dialog.error(error);
      }
    );
  };
}
