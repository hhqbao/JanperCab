import { DuraformOptionNoFace } from './../../_models/duraform-option/DuraformOptionNoFace';
import { DuraformOptionDoubleSidedFormComponent } from './../duraform-option-double-sided-form/duraform-option-double-sided.component';
import { DuraformOptionTypeKey } from './../../_enums/DuraformOptionTypeKey';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DuraformOptionType } from 'src/app/_models/duraform-option/DuraformOptionType';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  HostListener,
  ElementRef,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { DuraformOption } from 'src/app/_models/duraform-option/DuraformOption';
import { DuraformOptionDoubleSided } from 'src/app/_models/duraform-option/DuraformOptionDoubleSided';

@Component({
  selector: 'app-duraform-option-selector',
  templateUrl: 'duraform-option-selector.component.html',
})
export class DuraformOptionSelectorComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() duraformOptionTypes: DuraformOptionType[] = [];

  @ViewChild('typeInput') typeInput: ElementRef;

  readonly typeKeyEnum = DuraformOptionTypeKey;
  showTypeList = false;
  showOptionForm = false;
  currentTypeIndex = -1;
  selectedType: DuraformOptionType = null;

  constructor(private ef: ElementRef, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.formGroup.get('optionGroup')) {
      setTimeout(() => {
        const optionValues = this.formGroup.get('optionGroup').value;

        this.selectedType = this.duraformOptionTypes.find(
          (x) => x.id === optionValues.optionTypeId
        );

        const duraformOption: DuraformOption = DuraformOptionType.GetDuraformOptionInstance(
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
    this.showTypeList = true;
    this.showOptionForm = false;
  };

  onOptionTypeSelect = (optionType: DuraformOptionType) => {
    (this.typeInput as any).nativeElement.focus();
    this.showTypeList = false;
    this.showOptionForm = true;

    if (this.selectedType === optionType) {
      return;
    }

    this.selectedType = optionType;
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
    const duraformOption: DuraformOption = DuraformOptionType.GetDuraformOptionInstance(
      this.selectedType,
      optionValues
    );

    this.typeInput.nativeElement.value = duraformOption?.toString();
    this.typeInput.nativeElement.focus();
    this.showTypeList = false;
    this.showOptionForm = true;
  };
}
