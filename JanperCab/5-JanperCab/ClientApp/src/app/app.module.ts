import { DuraformOrderService } from './_services/duraform-order.service';
import { DuraformEdgeProfileService } from './_services/duraform-edge-profile.service';
import { EdgeProfileSelectorComponent } from './components/edge-profile-selector/edge-profile-selector.component';
import { BoxComponent } from './components/box/box.component';
import { DuraformDesignService } from './_services/duraform-design.service';
import { DuraformOrderStepTwoComponent } from './components/duraform-order-step-two/duraform-order-step-two.component';
import { DuraformWrapColorService } from './_services/duraform-wrap-color.service';
import { DuraformWrapTypeService } from './_services/duraform-wrap-type.service';
import { ColorCardComponent } from './components/color-card/color-card.component';
import { DuraformColorSelectorComponent } from './components/duraform-color-selector/duraform-color-selector.component';
import { DuraformOrderStepOneComponent } from './components/duraform-order-step-one/duraform-order-step-one.component';
import { DuraformSerieService } from './_services/duraform-serie.service';
import { DuraformFilterBoxComponent } from './components/duraform-filter-box/duraform-filter-box.component';
import { DuraformDesignListComponent } from './components/duraform-design-list/duraform-design-list.component';
import { RemoveWrapperDirective } from './_directives/remove-wrapper.directive';
import { DuraformDesignComponent } from './components/duraform-design/duraform-design.component';
import { DuraformProcessComponent } from './components/duraform-process/duraform-process.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutService } from './_services/layout.service';
import { FormInvalidFocusDirective } from './_directives/form-invalid-focus.directive';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';

import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { DialogService } from './_services/dialog.service';
import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { PrimaryLeftNavComponent } from './components/primary-left-nav/primary-left-nav.component';
import { PrimaryTopNavComponent } from './components/primary-top-nav/primary-top-nav.component';
import { PrimaryLayoutComponent } from './components/primary-layout/primary-layout.component';
import { DropdownBtnDirective } from './_directives/dropdown-btn.directive';
import { DuraformPageComponent } from './pages/duraform-page/duraform-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserControlBoxComponent } from './components/user-control-box/user-control-box.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownBtnDirective,
    FormInvalidFocusDirective,
    RemoveWrapperDirective,
    BoxComponent,
    PrimaryLayoutComponent,
    PrimaryTopNavComponent,
    PrimaryLeftNavComponent,
    UserControlBoxComponent,
    LoginFormComponent,
    RegisterFormComponent,
    DashboardComponent,
    DuraformProcessComponent,
    DuraformOrderStepOneComponent,
    DuraformOrderStepTwoComponent,
    DuraformDesignComponent,
    DuraformDesignListComponent,
    DuraformFilterBoxComponent,
    DuraformColorSelectorComponent,
    ColorCardComponent,
    EdgeProfileSelectorComponent,
    HomePageComponent,
    DuraformPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        whitelistedDomains: [environment.domain],
        blacklistedRoutes: [`${environment.baseUrl}`],
      },
    }),
  ],
  providers: [
    AuthService,
    DialogService,
    LayoutService,
    DuraformSerieService,
    DuraformDesignService,
    DuraformWrapTypeService,
    DuraformWrapColorService,
    DuraformEdgeProfileService,
    DuraformOrderService,
    ErrorInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
