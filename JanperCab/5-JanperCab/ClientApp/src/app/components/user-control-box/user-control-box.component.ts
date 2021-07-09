import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-control-box',
  templateUrl: 'user-control-box.component.html',
})
export class UserControlBoxComponent implements OnInit {
  showChangePasswordForm = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onLogOut = () => {
    this.authService.logOut();
    location.reload();
  };
}
