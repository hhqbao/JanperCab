import { DuraformPantryDoorDto } from './../../_models/duraform-component/DuraformPantryDoorDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { Component, OnInit, Input } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';

@Component({
  selector: 'app-duraform-pantry-door-component-list',
  templateUrl: 'duraform-pantry-door-component-list.component.html',
})
export class DuraformPantryDoorComponentListComponent implements OnInit {
  @Input() pantryDoors: DuraformPantryDoorDto[] = [];

  constructor(public asset: DuraformAssetService) {}

  ngOnInit() {}
}
