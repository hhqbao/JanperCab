import { EndPanelCartItemComponent } from './components/end-panel-cart-item/end-panel-cart-item.component';
import { EndPanelAddFormComponent } from './components/end-panel-add-form/end-panel-add-form.component';
import { EndPanelTabComponent } from './components/end-panel-tab/end-panel-tab.component';
import { PantryDoorChairRailTypeService } from './_services/pantry-door-chair-rail-type.service';
import { PantryDoorTabComponent } from './components/pantry-door-tab/pantry-door-tab.component';
import { PantryDoorAddFormComponent } from './components/pantry-door-add-form/pantry-door-add-form.component';
import { DuraformDoorTabComponent } from './components/duraform-door-tab/duraform-door-tab.component';
import { DuraformDoorOptionService } from './_services/duraform-door-option.service';
import { RemoveTagDirective } from './_directives/remove-tag.directive';
import { DuraformDoorAddFormComponent } from './components/duraform-door-add-form/duraform-door-add-form.component';
import { DuraformDoorCartItemComponent } from './components/duraform-door-cart-item/duraform-door-cart-item.component';
import { SelectOnFocusDirective } from './_directives/select-on-focus.directive';
import { OrderFormDirective } from './_directives/order-form.directive';
import { TabDirective } from './_directives/tab.directive';
import { DuraformArchService } from './_services/duraform-arch.service';
import { ArchSelectorComponent } from './components/arch-selector/arch-selector.component';
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
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';

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
import { customCurrencyMaskConfig } from './_helpers/CurrencyMaskInputOption';
import { PantryDoorCartItemComponent } from './components/pantry-door-cart-item/pantry-door-cart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownBtnDirective,
    FormInvalidFocusDirective,
    TabDirective,
    SelectOnFocusDirective,
    OrderFormDirective,
    RemoveTagDirective,
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
    ArchSelectorComponent,
    DuraformDoorAddFormComponent,
    DuraformDoorCartItemComponent,
    DuraformDoorTabComponent,
    PantryDoorAddFormComponent,
    PantryDoorTabComponent,
    PantryDoorCartItemComponent,
    EndPanelAddFormComponent,
    EndPanelCartItemComponent,
    EndPanelTabComponent,
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
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
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
    DuraformArchService,
    DuraformDoorOptionService,
    PantryDoorChairRailTypeService,
    ErrorInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
