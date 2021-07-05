import { HingeHoleOptionCornerDoorDto } from './../../_models/hinge-hole-option/HingeHoleOptionCornerDoorDto';
import { HingeHoleStyleDto } from './../../_models/hinge-hole-option/HingeHoleStyleDto';
import { HingeHoleOptionDrawDto } from './../../_models/hinge-hole-option/HingeHoleOptionDrawDto';
import { HingeHoleOptionDto } from './../../_models/hinge-hole-option/HingeHoleOptionDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { HingeHoleStyleEnum } from '../../_enums/HingeHoleStyleEnum';
import {
  Component,
  OnInit,
  Input,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { HingeHoleOptionSideDto } from 'src/app/_models/hinge-hole-option/HingeHoleOptionSideDto';
import { HingeHoleOptionCornerBlankDto } from 'src/app/_models/hinge-hole-option/HingeHoleOptioCornerBlankDto';

@Component({
  selector: 'app-hinge-hole-selector',
  templateUrl: 'hinge-hole-selector.component.html',
})
export class HingeHoleSelectorComponent implements OnInit {
  @Input() formGroup: FormGroup;

  @ViewChild('mainInput') mainInput: ElementRef;

  styleEnum = HingeHoleStyleEnum;
  selectedStyle: HingeHoleStyleDto;

  showStyleList = false;
  showOptionForm = false;

  constructor(private ef: ElementRef, public asset: DuraformAssetService) {}

  ngOnInit() {
    setTimeout(() => {
      if (this.formGroup.get('hingeHole')) {
        this.selectedStyle = this.asset.getHingeStyle(
          this.formGroup.get('hingeHole').value.hingeHoleStyle
        );
      }

      this.onUpdateMainInput();
    });
  }

  @HostListener('document:click', ['$event.target'])
  onBlur = (target: HTMLElement) => {
    const self = this.ef.nativeElement as HTMLElement;

    if (!self.contains(target)) {
      this.showStyleList = false;
      this.showOptionForm = false;
    }
  };

  onInputFocus = () => {
    if (this.selectedStyle) {
      this.showStyleList = false;
      this.showOptionForm = true;
    } else {
      this.showStyleList = true;
      this.showOptionForm = false;
    }
  };

  onMainInputTab = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.showStyleList = false;
      this.showOptionForm = false;
    }
  };

  onSelectOption = (style: HingeHoleStyleDto) => {
    if (this.selectedStyle === style) {
      return;
    }

    this.selectedStyle = style;

    this.formGroup.removeControl('hingeHole');

    this.onUpdateMainInput();

    (this.mainInput.nativeElement as HTMLElement).focus();
  };

  onUpdateMainInput = (focus: boolean = false) => {
    if (this.formGroup.get('hingeHole')) {
      const formValue = this.formGroup.get('hingeHole').value;

      const style = formValue.hingeHoleStyle as HingeHoleStyleEnum;

      let hingeHole: HingeHoleOptionDto;

      switch (style) {
        case HingeHoleStyleEnum.Side:
          hingeHole = new HingeHoleOptionSideDto();
          break;
        case HingeHoleStyleEnum.Draw:
          hingeHole = new HingeHoleOptionDrawDto();
          break;
        case HingeHoleStyleEnum.CornerDoor:
          hingeHole = new HingeHoleOptionCornerDoorDto();
          break;
        case HingeHoleStyleEnum.CornerBlank:
          hingeHole = new HingeHoleOptionCornerBlankDto();
          break;
        default:
          throw new Error('Hinge Hole Style Not Supported');
      }

      hingeHole.update(formValue);

      (this.mainInput.nativeElement as HTMLElement).setAttribute(
        'value',
        hingeHole.toString()
      );
    } else {
      (this.mainInput.nativeElement as HTMLElement).setAttribute(
        'value',
        'No Hinge Hole'
      );
    }

    if (focus) {
      (this.mainInput.nativeElement as HTMLElement).focus();
    }
  };
}
