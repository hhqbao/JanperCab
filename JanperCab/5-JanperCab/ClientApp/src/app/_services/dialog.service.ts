import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor() {}

  confirm = (message: any, callBack: () => any) => {
    alertify.confirm(message, () => {
      callBack();
    });
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
