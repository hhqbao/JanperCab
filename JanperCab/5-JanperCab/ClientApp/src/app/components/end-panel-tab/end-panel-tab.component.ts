import { DuraformEndPanelDto } from './../../_models/duraform-component/DuraformEndPanelDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { FormGroup } from '@angular/forms';
import { DialogService } from './../../_services/dialog.service';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-end-panel-tab',
  templateUrl: 'end-panel-tab.component.html',
})
export class EndPanelTabComponent implements OnInit {
  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private dialog: DialogService
  ) {}

  ngOnInit() {}

  onAddEndPanel = (formGroup: FormGroup) => {
    if (formGroup.invalid) {
      return;
    }

    const endPanel = new DuraformEndPanelDto();
    endPanel.updateWithOption(formGroup.value, this.asset.duraformOptionTypes);

    this.order.endPanels.unshift(endPanel);

    this.dialog.success('New End Panel Added.');
  };

  onRemoveEndPanel = (endPanel: DuraformEndPanelDto) => {
    this.order.removeEndPanel(endPanel);
  };
}
