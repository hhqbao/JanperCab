import { DuraformOptionFoldBackFormComponent } from './components/duraform-option-fold-back-form/duraform-option-fold-back-form.component';
import { DuraformOptionNoFaceComponent } from './components/duraform-option-no-face-form/duraform-option-no-face.component';
import { DuraformOptionSelectorComponent } from './components/duraform-option-selector/duraform-option-selector.component';
import { DuraformOptionTypeService } from './_services/duraform-option-type.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SelectMenuComponent } from './components/select-menu/select-menu.component';
import { DuraformDrawerCartItemComponent } from './components/duraform-drawer-cart-item/duraform-drawer-cart-item.component';
import { DuraformDrawerTypeService } from './_services/duraform-drawer-type.service';
import { DuraformDrawerFormComponent } from './components/duraform-drawer-form/duraform-drawer-form.component';
import { DuraformDrawerTabComponent } from './components/duraform-drawer-tab/duraform-drawer-tab.component';
import { EndPanelCartItemComponent } from './components/end-panel-cart-item/end-panel-cart-item.component';
import { EndPanelFormComponent } from './components/end-panel-form/end-panel-form.component';
import { EndPanelTabComponent } from './components/end-panel-tab/end-panel-tab.component';
import { PantryDoorChairRailTypeService } from './_services/pantry-door-chair-rail-type.service';
import { PantryDoorTabComponent } from './components/pantry-door-tab/pantry-door-tab.component';
import { PantryDoorFormComponent } from './components/pantry-door-form/pantry-door-form.component';
import { DuraformDoorTabComponent } from './components/duraform-door-tab/duraform-door-tab.component';
import { RemoveTagDirective } from './_directives/remove-tag.directive';
import { DuraformDoorFormComponent } from './components/duraform-door-form/duraform-door-form.component';
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
import { DuraformOrderStepThreeComponent } from './components/duraform-order-step-three/duraform-order-step-three.component';
import { DuraformOptionDoubleSidedFormComponent } from './components/duraform-option-double-sided-form/duraform-option-double-sided.component';

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
    SelectMenuComponent,
    PrimaryLayoutComponent,
    PrimaryTopNavComponent,
    PrimaryLeftNavComponent,
    UserControlBoxComponent,
    LoginFormComponent,
    DashboardComponent,
    DuraformProcessComponent,
    DuraformOrderStepOneComponent,
    DuraformOrderStepTwoComponent,
    DuraformOrderStepThreeComponent,
    DuraformDesignComponent,
    DuraformDesignListComponent,
    DuraformFilterBoxComponent,
    DuraformColorSelectorComponent,
    ColorCardComponent,
    EdgeProfileSelectorComponent,
    ArchSelectorComponent,
    DuraformDoorFormComponent,
    DuraformDoorCartItemComponent,
    DuraformDoorTabComponent,
    PantryDoorFormComponent,
    PantryDoorTabComponent,
    PantryDoorCartItemComponent,
    EndPanelFormComponent,
    EndPanelCartItemComponent,
    EndPanelTabComponent,
    DuraformDrawerFormComponent,
    DuraformDrawerCartItemComponent,
    DuraformDrawerTabComponent,
    DuraformOptionSelectorComponent,
    DuraformOptionNoFaceComponent,
    DuraformOptionDoubleSidedFormComponent,
    DuraformOptionFoldBackFormComponent,
    LoginPageComponent,
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
        blacklistedRoutes: [`${environment.baseUrl}/Auth/Login`],
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
    PantryDoorChairRailTypeService,
    DuraformDrawerTypeService,
    DuraformOptionTypeService,
    ErrorInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
