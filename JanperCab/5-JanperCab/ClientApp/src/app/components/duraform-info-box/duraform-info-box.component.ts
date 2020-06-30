import { DuraformOrderService } from './../../_services/duraform-order.service';
import { Component, OnInit } from '@angular/core';
import { DuraformArchForList } from 'src/app/_models/duraform-arch/DuraformArchForList';

@Component({
  selector: 'app-duraform-info-box',
  templateUrl: 'duraform-info-box.component.html',
})
export class DuraformInfoBoxComponent implements OnInit {
  isLoadingImg = true;

  constructor(public order: DuraformOrderService) {}

  ngOnInit() {}
}
