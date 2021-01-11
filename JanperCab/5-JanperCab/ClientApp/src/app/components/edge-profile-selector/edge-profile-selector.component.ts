import { DuraformDesignForOrderMenu } from './../../_models/duraform-design/DuraformDesignForOrderMenu';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { DuraformEdgeProfileForList } from './../../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edge-profile-selector',
  templateUrl: 'edge-profile-selector.component.html',
})
export class EdgeProfileSelectorComponent implements OnInit {
  @Input() selectedDuraformDesign: DuraformDesignForOrderMenu;
  @Input() selectedEdgeProfile: DuraformEdgeProfileForList;

  @Output() selectProfile = new EventEmitter<DuraformEdgeProfileForList>();

  constructor(public asset: DuraformAssetService) {}

  get canSelect(): boolean {
    return this.selectedDuraformDesign.allowedEdgeProfiles.length > 1;
  }

  ngOnInit() {}

  onSelectProfile = (profile: DuraformEdgeProfileForList) => {
    this.selectProfile.emit(profile);
  };
}
