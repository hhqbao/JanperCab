import { DuraformDoorForOrderMenu } from './../../_models/duraform-door/DuraformDoorForOrderMenu';
import { DuraformDoorService } from './../../_services/duraform-door.service';
import { DialogService } from './../../_services/dialog.service';
import { DuraformSerieForList } from './../../_models/duraform-serie/DuraformSerieForList';
import { DuraformSerieService } from './../../_services/duraform-serie.service';
import { LayoutService } from './../../_services/layout.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-duraform-page',
  templateUrl: 'duraform-page.component.html',
})
export class DuraformPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
