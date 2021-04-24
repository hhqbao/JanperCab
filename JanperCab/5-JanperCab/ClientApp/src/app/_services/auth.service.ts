import { Role } from './../_enums/Role';
import { plainToClass, classToClass, classToPlain } from 'class-transformer';
import { UserTokenDto } from './../_models/auth/UserTokenDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';

import UserForLogin from 'src/app/_models/auth/UserForLogin';
import { DialogService } from './dialog.service';
import { CustomerDto } from '../_models/customer/CustomerDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper: JwtHelperService;

  private userToken: UserTokenDto;

  constructor(private http: HttpClient, private dialogService: DialogService) {
    this.jwtHelper = new JwtHelperService();
    this.userToken = new UserTokenDto();
  }

  get token(): string {
    return this.userToken.token;
  }

  get customer(): CustomerDto {
    return this.userToken.customer;
  }

  get decodedToken() {
    if (!this.token) {
      return null;
    }

    return this.jwtHelper.decodeToken(this.userToken.token);
  }

  get role(): string {
    return this.decodedToken?.role;
  }

  get isLoggedIn(): boolean {
    if (!this.token) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(this.userToken.token);
  }

  loadStoredToken = () => {
    const token = localStorage.getItem('token');
    const customerString = localStorage.getItem('customer');

    const plainObject = {
      token,
      customer: JSON.parse(customerString),
    };

    if (token && customerString) {
      this.userToken = plainToClass(UserTokenDto, plainObject);
    }
  };

  login = (model: UserForLogin) => {
    return this.http
      .post<UserTokenDto>(environment.baseUrl + '/auth/login', model)
      .pipe(
        map((response) => {
          if (response) {
            this.userToken = plainToClass(UserTokenDto, response);

            localStorage.setItem('token', this.userToken.token);
            localStorage.setItem('customer', JSON.stringify(response.customer));
          }
        })
      );
  };

  isInRole = (role: string): boolean => {
    if (!this.decodedToken) {
      return false;
    }

    return this.role.includes(role);
  };

  logOut = () => {
    this.userToken = new UserTokenDto();
    localStorage.removeItem('token');
    localStorage.removeItem('customer');
    this.dialogService.message('You have been logged out!');
  };
}
