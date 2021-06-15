import { DuraformDesignDto } from './../../_models/duraform-design/DuraformDesignDto';
import { DuraformEdgeProfileDto } from './../../_models/duraform-edge-profile/DuraformEdgeProfileDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-edge-profile-menu',
  templateUrl: 'edge-profile-menu.component.html',
})
export class EdgeProfileMenuComponent implements OnInit {
  @Input() selectedDuraformDesign: DuraformDesignDto;

  @Output() selectProfile = new EventEmitter<DuraformEdgeProfileDto>();
  @Output() closeMenu = new EventEmitter();

  constructor(public asset: DuraformAssetService) {}

  ngOnInit() {}
}
