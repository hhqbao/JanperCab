import { DialogService } from './../../_services/dialog.service';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformDrawerForCart } from './../../_models/duraform-drawer/DuraformDrawerForCart';
import { DuraformDrawerTypeForList } from './../../_models/duraform-drawer-type/DuraformDrawerTypeForList';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-duraform-drawer-tab',
  templateUrl: 'duraform-drawer-tab.component.html',
})
export class DuraformDrawerTabComponent implements OnInit {
  @Input() duraformDrawerTypes: DuraformDrawerTypeForList[] = [];

  constructor(
    public order: DuraformOrderService,
    private dialog: DialogService
  ) {}

  ngOnInit() {}

  onAddDrawer = (drawer: DuraformDrawerForCart) => {
    this.order.duraformDrawers.push(drawer);

    this.dialog.success('New Drawer Added.');
  };

  onRemoveDrawer = (drawer: DuraformDrawerForCart) => {
    this.order.removeDuraformDrawer(drawer);
  };
}
