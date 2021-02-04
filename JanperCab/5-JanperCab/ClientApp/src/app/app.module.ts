import { DuraformPriceBulkActionComponent } from './components/duraform-price-bulk-action/duraform-price-bulk-action.component';
import { DuraformPriceEditorComponent } from './components/duraform-price-editor/duraform-price-editor.component';
import { DuraformOptionAngledShelfFormComponent } from './components/duraform-option-angled-shelf-form/duraform-option-angled-shelf-form.component';
import { MachineFileService } from './_services/machine-file.service';
import { DuraformMiscComponentListComponent } from './components/duraform-misc-component-list/duraform-misc-component-list.component';
import { MiscItemService } from './_services/misc-item.service';
import { DuraformMiscCartItemComponent } from './components/duraform-misc-cart-item/duraform-misc-cart-item.component';
import { DuraformMiscTabComponent } from './components/duraform-misc-tab/duraform-misc-tab.component';
import { DuraformMiscFormComponent } from './components/duraform-misc-form/duraform-misc-form.component';
import { EdgeProfileMenuComponent } from './components/edge-profile-menu/edge-profile-menu.component';
import { CabinetMakerListComponent } from './components/cabinet-maker-list/cabinet-maker-list.component';
import { FileSizePipe } from './_pipes/fileSize.pipe';
import { FileService } from './_services/file.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DuraformOrderListPageComponent } from './pages/duraform-order-list-page/duraform-order-list-page.component';
import { CabProService } from './_services/cab-pro.service';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { DeliveryDocketDuraformDrawersComponent } from './components/delivery-docket-duraform-drawers/delivery-docket-duraform-drawers.component';
import { DeliveryDocketEndPanelsComponent } from './components/delivery-docket-end-panels/delivery-docket-end-panels.component';
import { DeliveryDocketPantryDoorsComponent } from './components/delivery-docket-pantry-doors/delivery-docket-pantry-doors.component';
import { DeliveryDocketDuraformDoorsComponent } from './components/delivery-docket-duraform-doors/delivery-docket-duraform-doors.component';
import { DeliveryDocketComponent } from './components/delivery-docket/delivery-docket.component';
import { DuraformJobService } from './_services/duraform-job.service';
import { FloatBoxComponent } from './components/float-box/float-box.component';
import { CustomerService } from './_services/customer.service';
import { CabinetMakerListPageComponent } from './pages/cabinet-maker-list-page/cabinet-maker-list-page.component';
import { CommonAssetsService } from './_services/common-assets.service';
import { CabinetMakerFormComponent } from './components/cabinet-maker-form/cabinet-maker-form.component';
import { LeadingPipe } from './_pipes/leading.pipe';
import { DuraformQuotePageComponent } from './pages/duraform-quote-page/duraform-quote-page.component';
import { DuraformDraftService } from './_services/duraform-draft.service';
import { DuraformDraftListComponent } from './components/duraform-draft-list/duraform-draft-list.component.';
import { LatestItemsComponent } from './components/latest-items/latest-items.component';
import { SimpleBoxComponent } from './components/simple-box/simple-box.component';
import { DashboardService } from './_services/dashboard.service';
import { ClassToggleDirective } from './_directives/class-toggle.directive';
import { DuraformComponentService } from './_services/duraform-component.service';
import { HingeHoleSelectorComponent } from './components/hinge-hole-selector/hinge-hole-selector.component';
import { DuraformAccessoriesBoxComponent } from './components/duraform-accessories-box/duraform-accessories-box.component';
import { HingeHoleTypeService } from './_services/hinge-hole-type.service';
import { DeliveryDetailFormComponent } from './components/delivery-detail-form/delivery-detail-form.component';
import { InvoiceDetailFormComponent } from './components/invoice-detail-form/invoice-detail-form.component';
import { DuraformPantryDoorComponentListComponent } from './components/duraform-pantry-door-component-list/duraform-pantry-door-component-list.component';
import { DuraformDoorComponentListComponent } from './components/duraform-door-component-list/duraform-door-component-list.component';
import { DuraformInfoBoxComponent } from './components/duraform-info-box/duraform-info-box.component';
import { DuraformDoorBasicInputComponent } from './components/duraform-door-basic-input/duraform-door-basic-input.component';
import { EdgeProfileFormControlComponent } from './components/edge-profile-form-control/edge-profile-form-control.component';
import { DuraformAssetService } from './_services/duraform-asset.service';
import { DuraformOptionPaneFrameFormComponent } from './components/duraform-option-pane-frame-form/duraform-option-pane-frame-form.component';
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
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxBarcodeModule } from 'ngx-barcode';

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
import { DuraformOptionDoubleSidedFormComponent } from './components/duraform-option-double-sided-form/duraform-option-double-sided-form.component';
import { EndPanelComponentListComponent } from './components/end-panel-component-list/end-panel-component-list.component';
import { DuraformDrawerComponentListComponent } from './components/duraform-drawer-component-list/duraform-drawer-component-list.component';
import { DuraformOptionRollerShutterComponent } from './components/duraform-option-roller-shutter/duraform-option-roller-shutter.component';
import { DuraformOptionMicrowaveFrameComponent } from './components/duraform-option-microwave-frame/duraform-option-microwave-frame.component';
import { DuraformPriceGridPageComponent } from './pages/duraform-price-grid-page/duraform-price-grid-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LeadingPipe,
    FileSizePipe,
    FloatBoxComponent,
    ClassToggleDirective,
    DropdownBtnDirective,
    FormInvalidFocusDirective,
    TabDirective,
    SelectOnFocusDirective,
    OrderFormDirective,
    RemoveTagDirective,
    PdfViewerComponent,
    BoxComponent,
    SimpleBoxComponent,
    LatestItemsComponent,
    SelectMenuComponent,
    PrimaryLayoutComponent,
    PrimaryTopNavComponent,
    PrimaryLeftNavComponent,
    UserControlBoxComponent,
    InvoiceDetailFormComponent,
    DeliveryDetailFormComponent,
    LoginFormComponent,
    DuraformMiscFormComponent,
    DuraformMiscTabComponent,
    DuraformMiscCartItemComponent,
    DuraformOrderStepOneComponent,
    DuraformOrderStepTwoComponent,
    DuraformOrderStepThreeComponent,
    DuraformDesignComponent,
    DuraformInfoBoxComponent,
    DuraformAccessoriesBoxComponent,
    HingeHoleSelectorComponent,
    DuraformDesignListComponent,
    DuraformFilterBoxComponent,
    DuraformColorSelectorComponent,
    ColorCardComponent,
    EdgeProfileSelectorComponent,
    ArchSelectorComponent,
    DuraformDoorBasicInputComponent,
    EdgeProfileFormControlComponent,
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
    DuraformOptionPaneFrameFormComponent,
    DuraformOptionRollerShutterComponent,
    DuraformOptionMicrowaveFrameComponent,
    DuraformOptionAngledShelfFormComponent,
    DuraformDoorComponentListComponent,
    DuraformPantryDoorComponentListComponent,
    EndPanelComponentListComponent,
    DuraformDrawerComponentListComponent,
    DuraformDraftListComponent,
    CabinetMakerFormComponent,
    LoginPageComponent,
    HomePageComponent,
    CabinetMakerListPageComponent,
    DuraformPageComponent,
    DuraformOrderListPageComponent,
    PaginationComponent,
    DuraformQuotePageComponent,
    DuraformPriceGridPageComponent,
    DeliveryDocketComponent,
    DeliveryDocketDuraformDoorsComponent,
    DeliveryDocketPantryDoorsComponent,
    DeliveryDocketEndPanelsComponent,
    DeliveryDocketDuraformDrawersComponent,
    CabinetMakerListComponent,
    EdgeProfileMenuComponent,
    DuraformMiscComponentListComponent,
    DuraformPriceEditorComponent,
    DuraformPriceBulkActionComponent,
  ],
  imports: [
    BrowserModule,
    NgxBarcodeModule,
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
    CommonAssetsService,
    FileService,
    CabProService,
    AuthService,
    DialogService,
    LayoutService,
    DashboardService,
    CustomerService,
    DuraformAssetService,
    DuraformComponentService,
    DuraformSerieService,
    DuraformDesignService,
    DuraformWrapTypeService,
    DuraformWrapColorService,
    DuraformEdgeProfileService,
    DuraformOrderService,
    DuraformDraftService,
    DuraformJobService,
    DuraformArchService,
    PantryDoorChairRailTypeService,
    DuraformDrawerTypeService,
    DuraformOptionTypeService,
    HingeHoleTypeService,
    MiscItemService,
    MachineFileService,
    ErrorInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
