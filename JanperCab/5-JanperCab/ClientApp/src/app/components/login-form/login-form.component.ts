import { Router } from '@angular/router';
import { LayoutService } from './../../_services/layout.service';
import { AuthService } from './../../_services/auth.service';
import { DialogService } from './../../_services/dialog.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/_enums/Role';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  loginFormGroup: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });

    setTimeout(() => {
      (this.loginFormGroup.get('email') as any).nativeElement.focus();
    }, 100);
  }

  onSubmit = () => {
    if (this.loginFormGroup.invalid || this.isLoading) {
      if (this.loginFormGroup.get('email').invalid) {
        this.dialog.error('Email Not Valid!');
      }

      return;
    }

    this.isLoading = true;
    this.authService.login(this.loginFormGroup.value).subscribe(
      (_) => {
        this.isLoading = false;
        this.dialog.success('You have been signed in.');

        if (
          this.authService.isInRole(Role[Role.Sale]) ||
          this.authService.isInRole(Role[Role.Distributor]) ||
          this.authService.isInRole(Role[Role.CabinetMaker])
        ) {
          this.router.navigate(['dashboard']);
          return;
        }

        if (this.authService.isInRole(Role[Role.Operator])) {
          this.router.navigate(['production/machines']);
          return;
        }

        if (this.authService.isInRole(Role[Role.Driver])) {
          this.router.navigate(['production/delivery']);
          return;
        }
      },
      (error) => {
        this.isLoading = false;
        (this.loginFormGroup.get('email') as any).nativeElement.focus();
        this.dialog.error(error);
      }
    );
  };
}
