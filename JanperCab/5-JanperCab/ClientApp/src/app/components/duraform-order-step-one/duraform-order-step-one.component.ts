import { DuraformEdgeProfileForList } from './../../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { DuraformEdgeProfileService } from './../../_services/duraform-edge-profile.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { DuraformDesignService } from './../../_services/duraform-design.service';
import { DuraformDesignForOrderMenu } from '../../_models/duraform-design/DuraformDesignForOrderMenu';
import { DuraformWrapTypeForSelection } from './../../_models/duraform-wrap-type/DuraformWrapTypeForSelection';
import { StepOneReturnValue } from '../../_models/duraform-order/StepOneReturnValue';
import { DuraformWrapColorForSelection } from './../../_models/duraform-wrap-color/DuraformWrapColorForSelection';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DuraformSerieForList } from 'src/app/_models/duraform-serie/DuraformSerieForList';
import { LayoutService } from 'src/app/_services/layout.service';
import { DuraformSerieService } from 'src/app/_services/duraform-serie.service';
import { DialogService } from 'src/app/_services/dialog.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-duraform-order-step-one',
  templateUrl: 'duraform-order-step-one.component.html',
})
export class DuraformOrderStepOneComponent implements OnInit {
  @Output() finish = new EventEmitter<StepOneReturnValue>();

  selectedDuraformDesign: DuraformDesignForOrderMenu = null;
  selectedEdgeProfile: DuraformEdgeProfileForList = null;

  showEdgeProfileMenu = false;
  showColorSelector = false;

  constructor(public asset: DuraformAssetService) {}

  ngOnInit() {}

  onSelectDesign = (selectedDesign: DuraformDesignForOrderMenu) => {
    this.selectedDuraformDesign = selectedDesign;

    if (selectedDesign.fixedEdgeProfileId) {
      this.selectedEdgeProfile = this.asset.getEdgeProfile(
        selectedDesign.fixedEdgeProfileId
      );
      this.showColorSelector = true;
    } else {
      this.showEdgeProfileMenu = true;
    }
  };

  onPickColor = (color: DuraformWrapColorForSelection) => {
    const selectedSerie = this.asset.getDoorSerie(
      this.selectedDuraformDesign.duraformSerieId
    );

    const selectedWrapType: DuraformWrapTypeForSelection = {
      id: color.duraformWrapTypeId,
      name: color.duraformWrapTypeName,
    };

    const returnValue: StepOneReturnValue = {
      design: { ...this.selectedDuraformDesign },
      edgeProfile: this.selectedEdgeProfile,
      serie: selectedSerie,
      isRoutingOnly: false,
      wrapType: selectedWrapType,
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
      design: { ...this.selectedDuraformDesign },
      edgeProfile: this.selectedEdgeProfile,
      serie: selectedSerie,
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
