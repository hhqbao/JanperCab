import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor() {}

  alert = (title: string, message: string, callBack: () => any) => {
    alertify.alert(title, message, () => {
      if (callBack) {
        callBack();
      }
    });
  };

  confirm = (title: string, message: string, callBack: () => any) => {
    alertify.confirm(
      title,
      message,
      () => {
        callBack();
      },
      () => {}
    );
  };

  error = (message: string) => {
    alertify.error(message);
  };

  warning = (message: string) => {
    alertify.warning(message);
  };

  success = (message: string) => {
    alertify.success(message);
  };

  message = (message: string) => {
    alertify.message(message);
  };
}
