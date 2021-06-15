import { DuraformEdgeProfileDto } from './../../_models/duraform-edge-profile/DuraformEdgeProfileDto';
import { DuraformDesignDto } from './../../_models/duraform-design/DuraformDesignDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edge-profile-selector',
  templateUrl: 'edge-profile-selector.component.html',
})
export class EdgeProfileSelectorComponent implements OnInit {
  @Input() selectedDuraformDesign: DuraformDesignDto;
  @Input() selectedEdgeProfile: DuraformEdgeProfileDto;

  @Output() selectProfile = new EventEmitter<DuraformEdgeProfileDto>();

  constructor(public asset: DuraformAssetService) {}

  get canSelect(): boolean {
    return this.selectedDuraformDesign.allowedEdgeProfiles.length > 1;
  }

  ngOnInit() {}

  onSelectProfile = (profile: DuraformEdgeProfileDto) => {
    this.selectProfile.emit(profile);
  };
}
