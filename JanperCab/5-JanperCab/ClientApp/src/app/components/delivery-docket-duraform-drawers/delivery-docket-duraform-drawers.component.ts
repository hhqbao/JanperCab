import { DuraformDrawerTypeForList } from './../../_models/duraform-drawer-type/DuraformDrawerTypeForList';
import { DuraformEdgeProfileForList } from './../../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { DuraformDrawerDto } from './../../_models/duraform-component/DuraformDrawerDto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-delivery-docket-duraform-drawers',
  templateUrl: 'delivery-docket-duraform-drawers.component.html',
})
export class DeliveryDocketDuraformDrawersComponent implements OnInit {
  @Input() drawers: DuraformDrawerDto[] = [];
  @Input() drawerTypes: DuraformDrawerTypeForList[] = [];

  constructor() {}

  ngOnInit() {}

  getDrawerType = (id: number) => {
    return this.drawerTypes.find((x) => x.id === id);
  };
}
