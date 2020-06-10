import { FormGroup } from '@angular/forms';
import { DialogService } from './../../_services/dialog.service';
import { EndPanelForCart } from './../../_models/end-panel/EndPanelForCart';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-end-panel-tab',
  templateUrl: 'end-panel-tab.component.html',
})
export class EndPanelTabComponent implements OnInit {
  constructor(
    public order: DuraformOrderService,
    private dialog: DialogService
  ) {}

  ngOnInit() {}

  onAddEndPanel = (formGroup: FormGroup) => {
    if (formGroup.invalid) {
      return;
    }

    const endPanel = new EndPanelForCart();
    endPanel.update(formGroup.value);

    this.order.endPanels.push(endPanel);

    this.dialog.success('New End Panel Added.');
  };

  onRemoveEndPanel = (endPanel: EndPanelForCart) => {
    this.order.removeEndPanel(endPanel);
  };
}
