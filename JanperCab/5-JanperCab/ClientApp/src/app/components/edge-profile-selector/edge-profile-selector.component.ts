import { DuraformEdgeProfileForList } from './../../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edge-profile-selector',
  templateUrl: 'edge-profile-selector.component.html',
})
export class EdgeProfileSelectorComponent implements OnInit {
  @Input() edgeProfileList: DuraformEdgeProfileForList[] = [];
  @Input() selectedEdgeProfile: DuraformEdgeProfileForList;
  @Input() canSelect = true;

  @Output() selectProfile = new EventEmitter<DuraformEdgeProfileForList>();

  constructor() {}

  ngOnInit() {}

  onSelectProfile = (profile: DuraformEdgeProfileForList) => {
    this.selectProfile.emit(profile);
  };
}
