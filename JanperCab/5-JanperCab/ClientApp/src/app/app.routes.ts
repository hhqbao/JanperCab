import { AuthGuard } from './_guards/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DuraformPageComponent } from './pages/duraform-page/duraform-page.component';
import { PrimaryLayoutComponent } from './components/primary-layout/primary-layout.component';

import { Routes } from '@angular/router';

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
      { path: 'duraform/:type/:id', component: DuraformPageComponent },
      { path: 'duraform', component: DuraformPageComponent },
      { path: '', component: HomePageComponent, pathMatch: 'full' },
    ],
  },
];
