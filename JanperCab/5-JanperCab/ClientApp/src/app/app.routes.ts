import { PickUpPageComponent } from './pages/pick-up-page/pick-up-page.component';
import { InvoiceProcessPageComponent } from './pages/invoice-process-page/invoice-process-page.component';
import { DeliveryPageComponent } from './pages/delivery-page/delivery-page.component';
import { MachineListPageComponent } from './pages/machine-list-page/machine-list-page.component';
import { DuraformOrderListPageComponent } from './pages/duraform-order-list-page/duraform-order-list-page.component';
import { CustomerListPageComponent } from './pages/customer-list-page/customer-list-page.component';
import { DuraformQuotePageComponent } from './pages/duraform-quote-page/duraform-quote-page.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DuraformPageComponent } from './pages/duraform-page/duraform-page.component';
import { PrimaryLayoutComponent } from './components/primary-layout/primary-layout.component';

import { Routes } from '@angular/router';
import { DuraformPriceGridPageComponent } from './pages/duraform-price-grid-page/duraform-price-grid-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'dashboard',
    component: PrimaryLayoutComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'customers', component: CustomerListPageComponent },
      { path: 'duraform/orders', component: DuraformOrderListPageComponent },
      { path: 'duraform/quote/:id', component: DuraformQuotePageComponent },
      { path: 'duraform/:id', component: DuraformPageComponent },
      { path: 'duraform', component: DuraformPageComponent },
      {
        path: 'settings/duraform-prices',
        component: DuraformPriceGridPageComponent,
      },
      { path: '', component: HomePageComponent, pathMatch: 'full' },
    ],
  },
  {
    path: 'production',
    component: PrimaryLayoutComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'machines', component: MachineListPageComponent },
      { path: 'delivery', component: DeliveryPageComponent },
      { path: 'pick-up', component: PickUpPageComponent },
      { path: 'invoicing', component: InvoiceProcessPageComponent },
    ],
  },
];
