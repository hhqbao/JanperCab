import { DuraformOrderService } from './../../_services/duraform-order.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { DuraformOptionTypeKey } from './../../_enums/DuraformOptionTypeKey';
import { FormGroup } from '@angular/forms';
import { DuraformOptionTypeDto } from 'src/app/_models/duraform-option/DuraformOptionTypeDto';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  HostListener,
  ElementRef,
} from '@angular/core';
import { DuraformOptionDto } from 'src/app/_models/duraform-option/DuraformOptionDto';

@Component({
  selector: 'app-duraform-option-selector',
  templateUrl: 'duraform-option-selector.component.html',
})
export class DuraformOptionSelectorComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() hideOptionTypeKeys: DuraformOptionTypeKey[] = [];

  @ViewChild('typeInput') typeInput: ElementRef;

  readonly typeKeyEnum = DuraformOptionTypeKey;
  showTypeList = false;
  showOptionForm = false;
  selectedType: DuraformOptionTypeDto = null;

  get filteredOptionTypes() {
    return this.asset.duraformOptionTypes.filter(
      (x) => !this.hideOptionTypeKeys.includes(x.id)
    );
  }

  constructor(
    public asset: DuraformAssetService,
    private ef: ElementRef,
    public order: DuraformOrderService
  ) {}

  ngOnInit() {
    if (
      !this.hideOptionTypeKeys.includes(DuraformOptionTypeKey.DoubleSided) &&
      this.order.isRoutingOnly
    ) {
      this.hideOptionTypeKeys.push(DuraformOptionTypeKey.DoubleSided);
    }

    if (this.formGroup.get('optionGroup')) {
      setTimeout(() => {
        const optionValues = this.formGroup.get('optionGroup').value;

        this.selectedType = this.asset.duraformOptionTypes.find(
          (x) => x.id === optionValues.optionTypeId
        );

        const duraformOption: DuraformOptionDto = DuraformOptionTypeDto.GetDuraformOptionInstance(
          this.selectedType,
          optionValues
        );

        this.typeInput.nativeElement.value = duraformOption?.toString();
        this.showTypeList = false;
        this.showOptionForm = false;
      });
    }
  }

  @HostListener('document:click', ['$event.target'])
  onBlur = (target: HTMLElement) => {
    const self = this.ef.nativeElement as HTMLElement;

    if (!self.contains(target)) {
      this.showTypeList = false;
      this.showOptionForm = false;
    }
  };

  @HostListener('keydown.Tab')
  @HostListener('keydown.Enter')
  @HostListener('keydown.Control')
  onTab = () => {
    this.showTypeList = false;
    this.showOptionForm = false;
  };

  onFocus = () => {
    if (!this.selectedType) {
      this.showTypeList = true;
      this.showOptionForm = false;
    } else {
      this.showTypeList = false;
      this.showOptionForm = true;
    }
  };

  onEditBtnClick = () => {
    this.showOptionForm = false;
    this.showTypeList = !this.showTypeList;
  };

  onOptionTypeSelect = (optionType: DuraformOptionTypeDto) => {
    if (this.selectedType === optionType) {
      return;
    }

    this.selectedType = optionType;
    (this.typeInput as any).nativeElement.focus();
    this.formGroup.removeControl('optionGroup');
  };

  onClearOption = () => {
    this.formGroup.removeControl('optionGroup');
    this.selectedType = null;
    this.typeInput.nativeElement.value = null;
  };

  onUpdateDisplayValue = () => {
    if (!this.formGroup.get('optionGroup') || !this.selectedType) {
      return null;
    }

    const optionValues = this.formGroup.get('optionGroup').value;
    const duraformOption: DuraformOptionDto = DuraformOptionTypeDto.GetDuraformOptionInstance(
      this.selectedType,
      optionValues
    );

    this.typeInput.nativeElement.value = duraformOption?.toString();
    this.typeInput.nativeElement.focus();
  };
}
