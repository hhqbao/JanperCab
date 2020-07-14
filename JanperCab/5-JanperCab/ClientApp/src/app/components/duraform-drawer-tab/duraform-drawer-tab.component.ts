import { DuraformDrawerDto } from './../../_models/duraform-component/DuraformDrawerDto';
import { FormGroup } from '@angular/forms';
import { DialogService } from './../../_services/dialog.service';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duraform-drawer-tab',
  templateUrl: 'duraform-drawer-tab.component.html',
})
export class DuraformDrawerTabComponent implements OnInit {
  constructor(
    public order: DuraformOrderService,
    private dialog: DialogService
  ) {}

  ngOnInit() {}

  onAddDrawer = (formGroup: FormGroup) => {
    if (formGroup.invalid) {
      return;
    }

    const formValue = formGroup.value;
    const drawer = new DuraformDrawerDto();
    drawer.update(formValue);

    this.order.duraformDrawers.unshift(drawer);

    this.dialog.success('New Drawer Added.');
  };

  onRemoveDrawer = (drawer: DuraformDrawerDto) => {
    this.order.removeDuraformDrawer(drawer);
  };
}
