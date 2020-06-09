import { CurrencyMaskInputMode } from 'ngx-currency';

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: '.',
  precision: 2,
  prefix: '$',
  suffix: '',
  thousands: ',',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL,
};
