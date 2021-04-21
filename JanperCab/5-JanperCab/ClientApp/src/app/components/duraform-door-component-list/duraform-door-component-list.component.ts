import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformComponentService } from './../../_services/duraform-component.service';
import { DuraformEdgeProfileForList } from './../../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { Observable } from 'rxjs';
import { DuraformDoorDto } from './../../_models/duraform-component/DuraformDoorDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { Component, OnInit, Input } from '@angular/core';
import { DuraformEdgeProfileService } from 'src/app/_services/duraform-edge-profile.service';

@Component({
  selector: 'app-duraform-door-component-list',
  templateUrl: 'duraform-door-component-list.component.html',
})
export class DuraformDoorComponentListComponent implements OnInit {
  isLoading = true;
  hasError = false;

  errorMessage: string;
  edgeProfiles: DuraformEdgeProfileForList[] = [];

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private edgeProfileSerive: DuraformEdgeProfileService
  ) {}

  get duraformEnquiry(): DuraformEnquiryDto {
    return this.order.duraformEnquiry;
  }

  get duraformDoors(): DuraformDoorDto[] {
    return this.duraformEnquiry.duraformDoors;
  }

  ngOnInit() {
    this.edgeProfileSerive.getAll().subscribe(
      (response) => {
        this.edgeProfiles = response;
        this.isLoading = false;
      },
      (error) => {
        this.hasError = true;
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
  }

  getEdgeProfile = (id: number): DuraformEdgeProfileForList => {
    return this.edgeProfiles.find((x) => x.id === id);
  };
}
