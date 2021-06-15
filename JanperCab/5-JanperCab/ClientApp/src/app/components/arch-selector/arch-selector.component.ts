import { DuraformArchDto } from './../../_models/duraform-arch/DuraformArchDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-arch-selector',
  templateUrl: 'arch-selector.component.html',
})
export class ArchSelectorComponent implements OnInit {
  @Input() canSelect = true;
  @Input() selectedArch: DuraformArchDto;

  @Output() selectArch = new EventEmitter();

  constructor(public asset: DuraformAssetService) {}

  ngOnInit() {}
}
