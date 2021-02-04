import { DuraformComponentService } from './../../_services/duraform-component.service';
import { DuraformEndPanelDto } from './../../_models/duraform-component/DuraformEndPanelDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { FormGroup } from '@angular/forms';
import { DialogService } from './../../_services/dialog.service';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { Component, OnInit, Input } from '@angular/core';
import { ComponentType } from 'src/app/_enums/ComponentType';

@Component({
  selector: 'app-end-panel-tab',
  templateUrl: 'end-panel-tab.component.html',
})
export class EndPanelTabComponent implements OnInit {
  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private dialog: DialogService,
    private componentService: DuraformComponentService
  ) {}

  ngOnInit() {}

  onAddEndPanel = (formGroup: FormGroup) => {
    if (formGroup.invalid) {
      return;
    }

    const endPanel = this.componentService.generateComponent(
      ComponentType.DuraformEndPanel
    );
    this.componentService.updateComponent(endPanel, formGroup.value);

    this.order.addComponent(endPanel);

    this.dialog.success('New End Panel Added.');
  };

  onRemoveEndPanel = (endPanel: DuraformEndPanelDto) => {
    this.order.removeComponent(endPanel);
  };
}
