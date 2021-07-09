import { ChangePasswordViewModel } from './../../_models/auth/ChangePasswordViewModel';
import { plainToClass } from 'class-transformer';
import { DialogService } from './../../_services/dialog.service';
import { LayoutService } from './../../_services/layout.service';
import { AuthService } from 'src/app/_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-change-password-form',
  templateUrl: 'change-password-form.component.html',
})
export class ChangePasswordFormComponent implements OnInit {
  @Output() afterSubmit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @ViewChild('currentPasswordInput') currentPasswordInput: ElementRef;

  isLoading = false;
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private layoutService: LayoutService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });

    setTimeout(() => {
      (this.currentPasswordInput.nativeElement as HTMLElement).focus();
    });
  }

  onSubmit = () => {
    if (this.formGroup.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.layoutService.showLoadingPanel();

    const model = plainToClass(ChangePasswordViewModel, this.formGroup.value);
    this.authService.changePassword(model).subscribe(
      (_) => {
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();

        this.dialogService.alert(
          'Change Password Success',
          'Your password has been updated',
          () => {
            if (this.afterSubmit) {
              this.afterSubmit.emit();
            }
          }
        );
      },
      (error) => {
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();

        this.dialogService.error(error);
      }
    );
  };
}
