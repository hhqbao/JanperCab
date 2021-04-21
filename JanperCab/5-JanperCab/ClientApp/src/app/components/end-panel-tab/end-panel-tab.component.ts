import { DuraformComponentService } from './../../_services/duraform-component.service';
import { DuraformEndPanelDto } from './../../_models/duraform-component/DuraformEndPanelDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { FormGroup } from '@angular/forms';
import { DialogService } from './../../_services/dialog.service';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { Component, OnInit, Input } from '@angular/core';
import { ComponentType } from 'src/app/_enums/ComponentType';
import { DuraformTabComponent } from '../duraform-tab/duraform-tab.component';

@Component({
  selector: 'app-end-panel-tab',
  templateUrl: 'end-panel-tab.component.html',
})
export class EndPanelTabComponent
  extends DuraformTabComponent
  implements OnInit {
  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    public dialog: DialogService,
    private componentService: DuraformComponentService
  ) {
    super(dialog, order);
  }

  ngOnInit() {}

  onAddComponent(formGroup: FormGroup): void {
    const endPanel = this.componentService.generateComponent(
      ComponentType.DuraformEndPanel
    );
    this.componentService.updateComponent(
      endPanel,
      this.order.duraformEnquiry,
      formGroup.value
    );

    this.order.addComponent(endPanel);

    this.dialog.success('New End Panel Added.');
  }
}
