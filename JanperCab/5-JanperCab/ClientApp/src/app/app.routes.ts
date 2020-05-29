import { HomePageComponent } from './pages/home-page/home-page.component';
import { DuraformPageComponent } from './pages/duraform-page/duraform-page.component';
import { PrimaryLayoutComponent } from './components/primary-layout/primary-layout.component';

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: PrimaryLayoutComponent,
    children: [
      { path: 'order/duraform', component: DuraformPageComponent },
      { path: '', component: HomePageComponent, pathMatch: 'full' },
    ],
  },
];
