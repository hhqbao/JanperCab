import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformMiscDto } from './../../_models/duraform-misc/DuraformMiscDto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-duraform-misc-component-list',
  templateUrl: 'duraform-misc-component-list.component.html',
})
export class DuraformMiscComponentListComponent implements OnInit {
  @Input() duraformMiscs: DuraformMiscDto[] = [];

  constructor(public asset: DuraformAssetService) {}

  ngOnInit() {}
}
