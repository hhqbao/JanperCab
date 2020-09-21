import { LayoutService } from 'src/app/_services/layout.service';
import { Role } from './../../_enums/Role';
import { DialogService } from './../../_services/dialog.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-primary-left-nav',
  templateUrl: 'primary-left-nav.component.html',
})
export class PrimaryLeftNavComponent implements OnInit {
  role = Role;

  constructor(
    public auth: AuthService,
    private dialog: DialogService,
    public layoutService: LayoutService
  ) {}

  ngOnInit() {}
}
