import { LayoutService } from './../../_services/layout.service';
import { AuthService } from './../../_services/auth.service';
import { DialogService } from './../../_services/dialog.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private auth: AuthService,
    private layoutService: LayoutService
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
  }

  onSubmit = () => {
    if (this.loginFormGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.auth.login(this.loginFormGroup.value).subscribe(
      (_) => {
        this.isLoading = false;
        this.dialog.message('You have been signed in.');
      },
      (error) => {
        this.isLoading = false;
        this.dialog.error(error);
      }
    );
  };
}
