import { AuthService } from './_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControlName } from '@angular/forms';

const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;
FormControlName.prototype.ngOnChanges = function () {
  const result = originFormControlNameNgOnChanges.apply(this, arguments);

  if (this.valueAccessor._elementRef) {
    this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
  }
  return result;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.loadStoredToken();
  }
}
