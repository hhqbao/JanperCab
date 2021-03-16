import { DuraformComponentService } from '../../_services/duraform-component.service';
import { DuraformDrawerDto } from '../../_models/duraform-component/DuraformDrawerDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { Component, OnInit, Input } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformMiscComponentDto } from 'src/app/_models/duraform-misc-component/DuraformMiscComponentDto';

@Component({
  selector: 'app-duraform-misc-component-list',
  templateUrl: 'duraform-misc-component-list.component.html',
})
export class DuraformMiscComponentListComponent implements OnInit {
  @Input() miscComponents: DuraformMiscComponentDto[] = [];

  constructor(
    public asset: DuraformAssetService,
    public componentService: DuraformComponentService
  ) {}

  get totalQuantity(): number {
    let total = 0;

    this.miscComponents.forEach((x) => (total += x.quantity));

    return total;
  }

  ngOnInit() {}
}
