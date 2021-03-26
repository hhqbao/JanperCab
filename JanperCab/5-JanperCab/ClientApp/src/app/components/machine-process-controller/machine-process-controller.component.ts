import { LayoutService } from './../../_services/layout.service';
import {
  Directive,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MachineProductionListDto } from 'src/app/_models/machine/MachineProductionListDto';
import * as scanner from 'onscan.js';

@Directive()
export abstract class MachineProcessControllerDirective
  implements OnInit, OnDestroy {
  @Input() machine: MachineProductionListDto;

  @Output() closeBtnClick = new EventEmitter();

  isLoading = false;
  isScannerBusy = false;
  testEnquiryId: string;

  ngOnInit(): void {
    scanner.attachTo(document, {
      onScan: this.onScan,
    });
  }

  ngOnDestroy(): void {
    scanner.detachFrom(document);
  }

  abstract onScan(sCode: any, iQty: any): void;
}
