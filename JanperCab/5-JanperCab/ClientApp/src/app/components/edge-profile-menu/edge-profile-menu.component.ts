import { DuraformDesignForOrderMenu } from './../../_models/duraform-design/DuraformDesignForOrderMenu';
import { DuraformEdgeProfileForList } from './../../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-edge-profile-menu',
  templateUrl: 'edge-profile-menu.component.html',
})
export class EdgeProfileMenuComponent implements OnInit {
  @Input() selectedDuraformDesign: DuraformDesignForOrderMenu;

  @Output() selectProfile = new EventEmitter<DuraformEdgeProfileForList>();
  @Output() closeMenu = new EventEmitter();

  constructor(public asset: DuraformAssetService) {}

  ngOnInit() {}
}
