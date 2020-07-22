import { plainToClass } from 'class-transformer';
import { CustomerDto } from './../_models/customer/CustomerDto';
import { UserTokenDto } from './../_models/auth/UserTokenDto';
import { UserForRegister } from './../_models/auth/UserForRegister';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';

import UserForLogin from 'src/app/_models/auth/UserForLogin';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper: JwtHelperService;

  token: string;
  customer: CustomerDto;

  constructor(private http: HttpClient, private dialogService: DialogService) {
    this.jwtHelper = new JwtHelperService();
  }

  get decodedToken() {
    if (!this.token) {
      return null;
    }

    return this.jwtHelper.decodeToken(this.token);
  }

  get isLoggedIn(): boolean {
    if (!this.token) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(this.token);
  }

  login = (model: UserForLogin) => {
    return this.http
      .post<UserTokenDto>(environment.baseUrl + '/auth/login', model)
      .pipe(
        map((response: any) => {
          if (response) {
            this.token = response.token;
            this.customer = plainToClass(CustomerDto, response.customer);

            localStorage.setItem('token', this.token);
            localStorage.setItem('customer', JSON.stringify(response.customer));
          }
        })
      );
  };

  logOut = () => {
    this.token = null;
    this.customer = null;
    localStorage.removeItem('token');
    localStorage.removeItem('customer');
    this.dialogService.message('You have been logged out!');
  };
}
