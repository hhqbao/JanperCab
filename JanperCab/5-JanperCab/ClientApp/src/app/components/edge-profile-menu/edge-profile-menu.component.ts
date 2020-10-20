import { DuraformEdgeProfileForList } from './../../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edge-profile-menu',
  templateUrl: 'edge-profile-menu.component.html',
})
export class EdgeProfileMenuComponent implements OnInit {
  @Output() selectProfile = new EventEmitter<DuraformEdgeProfileForList>();
  @Output() closeMenu = new EventEmitter();

  constructor(public asset: DuraformAssetService) {}

  ngOnInit() {}
}
