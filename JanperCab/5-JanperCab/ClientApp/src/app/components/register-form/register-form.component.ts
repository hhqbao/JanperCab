import { DialogService } from './../../_services/dialog.service';
import { AuthService } from './../../_services/auth.service';
import { LayoutService } from './../../_services/layout.service';
import { UserForRegister } from './../../_models/auth/UserForRegister';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html',
})
export class RegisterFormComponent implements OnInit {
  registerFormGroup: FormGroup;
  hasSubmit = false;

  constructor(
    private fb: FormBuilder,
    private layoutService: LayoutService,
    private dialog: DialogService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.registerFormGroup = this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [MustMatch('password', 'confirmPassword')],
      }
    );

    setTimeout(() => {
      (this.registerFormGroup.get('email') as any).nativeElement.focus();
    }, 100);
  }

  onSubmit = () => {
    this.hasSubmit = true;

    if (this.registerFormGroup.invalid) {
      return;
    }

    const modelDto = this.registerFormGroup.value as UserForRegister;
    this.layoutService.showLoadingPanel('Registering...');
    this.auth.register(modelDto).subscribe(
      () => {
        this.layoutService.closeLoadingPanel();
        this.dialog.success('You have been signed in.');
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialog.error(error);
      }
    );
  };
}
