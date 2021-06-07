import { LayoutService } from './../../_services/layout.service';
import { Router } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-control-box',
  templateUrl: 'user-control-box.component.html',
})
export class UserControlBoxComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogOut = () => {
    this.authService.logOut();
    location.reload();
  };
}
