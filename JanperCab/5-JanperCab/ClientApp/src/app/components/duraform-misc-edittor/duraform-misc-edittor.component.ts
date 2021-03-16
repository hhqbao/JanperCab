import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformMiscHeatStripDto } from './../../_models/duraform-misc-component/DuraformMiscHeatStripDto';
import { DuraformMiscFingerPullDto } from './../../_models/duraform-misc-component/DuraformMiscFingerPullDto';
import { DuraformMiscLooseFoilDto } from './../../_models/duraform-misc-component/DuraformMiscLooseFoilDto';
import { DuraformMiscTypeEnum } from './../../_enums/DuraformMiscTypeEnum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { DuraformMiscComponentDto } from 'src/app/_models/duraform-misc-component/DuraformMiscComponentDto';

@Component({
  selector: 'app-duraform-misc-edittor',
  templateUrl: 'duraform-misc-edittor.component.html',
})
export class DuraformMiscEdittorComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() cloneMisc: DuraformMiscComponentDto;

  @Output() typeSelect = new EventEmitter<DuraformMiscTypeEnum>();
  @Output() submitForm = new EventEmitter();

  @ViewChild('typeInput') typeInput: ElementRef;

  readonly miscTypeList = DuraformMiscTypeEnum;
  showTypeList = false;
  showMiscForm = false;

  constructor(private ef: ElementRef, public order: DuraformOrderService) {}

  ngOnInit() {}

  @HostListener('document:click', ['$event.target'])
  onBlur = (target: HTMLElement) => {
    const self = this.ef.nativeElement as HTMLElement;

    if (!self.contains(target)) {
      this.showTypeList = false;
      this.showMiscForm = false;
    }
  };

  @HostListener('keydown.Tab')
  @HostListener('keydown.Enter')
  @HostListener('keydown.Control')
  onTab = () => {
    this.showTypeList = false;
    this.showMiscForm = false;

    if (this.cloneMisc) {
      this.submitForm.emit();
    }
  };

  onEditBtnClick = () => {
    this.showTypeList = true;
    this.showMiscForm = false;
  };

  onFocus = () => {
    if (this.cloneMisc) {
      this.showTypeList = false;
      this.showMiscForm = true;
    } else {
      this.showTypeList = true;
      this.showMiscForm = false;
    }
  };

  onMiscTypeSelect = (type: DuraformMiscTypeEnum) => {
    this.typeSelect.emit(type);

    this.showTypeList = false;
    this.showMiscForm = true;
  };

  onUpdateDisplayValue = () => {
    if (!this.cloneMisc) {
      return;
    }

    this.cloneMisc.update(this.formGroup);

    setTimeout(() => {
      this.typeInput.nativeElement.value = this.cloneMisc?.toString();
      (this.typeInput.nativeElement as HTMLElement).focus();
    });
  };
}
