import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { DuraformArchForList } from './../../_models/duraform-arch/DuraformArchForList';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-arch-selector',
  templateUrl: 'arch-selector.component.html',
})
export class ArchSelectorComponent implements OnInit {
  @Input() canSelect = true;
  @Input() selectedArch: DuraformArchForList;

  @Output() selectArch = new EventEmitter();

  constructor(public asset: DuraformAssetService) {}

  ngOnInit() {}

  onSelectArch = (arch: DuraformArchForList) => {
    this.selectArch.emit(arch);
  };
}
