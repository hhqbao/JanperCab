import { LayoutService } from './../../_services/layout.service';
import { Router } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-control-box',
  templateUrl: 'user-control-box.component.html',
})
export class UserControlBoxComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private layout: LayoutService
  ) {}

  ngOnInit() {}

  onLogOut = () => {
    this.authService.logOut();
    this.layout.toggleLeftNav(false);
    this.router.navigated = false;
    this.router.navigate([this.router.url]);
  };
}
