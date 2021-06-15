import { DuraformArchDto } from './../../_models/duraform-arch/DuraformArchDto';
import { DuraformWrapTypeDto } from './../../_models/duraform-wrap-type/DuraformWrapTypeDto';
import { DuraformWrapColorDto } from './../../_models/duraform-wrap-color/DuraformWrapColorDto';
import { DuraformEdgeProfileDto } from './../../_models/duraform-edge-profile/DuraformEdgeProfileDto';
import { DuraformDesignDto } from './../../_models/duraform-design/DuraformDesignDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { StepOneReturnValue } from '../../_models/duraform-order/StepOneReturnValue';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-order-step-one',
  templateUrl: 'duraform-order-step-one.component.html',
})
export class DuraformOrderStepOneComponent implements OnInit {
  @Output() finish = new EventEmitter<StepOneReturnValue>();

  selectedDuraformDesign: DuraformDesignDto;
  selectedDuraformArch: DuraformArchDto;
  selectedEdgeProfile: DuraformEdgeProfileDto;

  showEdgeProfileMenu = false;
  showColorSelector = false;

  constructor(public asset: DuraformAssetService) {}

  ngOnInit() {}

  onSelectDesign = (selectedDesign: DuraformDesignDto) => {
    this.selectedDuraformDesign = selectedDesign;

    if (this.selectedDuraformDesign.allowedEdgeProfiles.length === 1) {
      this.selectedEdgeProfile = this.asset.getEdgeProfile(
        this.selectedDuraformDesign.allowedEdgeProfiles[0].duraformEdgeProfileId
      );
      this.showColorSelector = true;
    } else {
      this.showEdgeProfileMenu = true;
    }
  };

  onSelectArch = (selectedArch: DuraformArchDto) => {
    this.selectedDuraformArch = selectedArch;
  };

  onPickColor = (color: DuraformWrapColorDto) => {
    const returnValue: StepOneReturnValue = {
      design: this.selectedDuraformDesign,
      edgeProfile: this.selectedEdgeProfile,
      serie: this.selectedDuraformDesign.duraformSerie,
      arch: this.selectedDuraformArch,
      isRoutingOnly: false,
      wrapType: color.duraformWrapType,
      wrapColor: color,
    };

    this.showColorSelector = false;
    this.finish.emit(returnValue);
  };

  onRoutingPick = () => {
    const selectedSerie = this.asset.getDoorSerie(
      this.selectedDuraformDesign.duraformSerieId
    );

    const returnValue: StepOneReturnValue = {
      design: this.selectedDuraformDesign,
      edgeProfile: this.selectedEdgeProfile,
      serie: selectedSerie,
      arch: this.selectedDuraformArch,
      isRoutingOnly: true,
      wrapType: null,
      wrapColor: null,
    };

    this.showColorSelector = false;
    this.finish.emit(returnValue);
  };

  onCancelColorSelection = () => {
    this.selectedDuraformDesign = null;
    this.showColorSelector = false;
  };
}
