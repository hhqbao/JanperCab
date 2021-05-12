import { Role } from 'src/app/_enums/Role';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/_services/dialog.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: 'login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  constructor(private authService: AuthService) {
    document.title = 'JanperCab - Sign In';
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.authService.homePageNavigate();
    }
  }
}
