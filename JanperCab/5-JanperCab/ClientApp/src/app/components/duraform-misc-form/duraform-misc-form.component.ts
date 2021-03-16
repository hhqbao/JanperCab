import { DuraformMiscTypeEnum } from './../../_enums/DuraformMiscTypeEnum';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { DuraformMiscComponentDto } from 'src/app/_models/duraform-misc-component/DuraformMiscComponentDto';
import { DuraformMiscCapMouldDto } from 'src/app/_models/duraform-misc-component/DuraformMiscCapMouldDto';
import { DuraformMiscFingerPullDto } from 'src/app/_models/duraform-misc-component/DuraformMiscFingerPullDto';
import { DuraformMiscHeatStripDto } from 'src/app/_models/duraform-misc-component/DuraformMiscHeatStripDto';
import { DuraformMiscLooseFoilDto } from 'src/app/_models/duraform-misc-component/DuraformMiscLooseFoilDto';
import * as _ from 'lodash';

@Component({
  selector: 'app-duraform-misc-form',
  templateUrl: 'duraform-misc-form.component.html',
})
export class DuraformMiscFormComponent implements OnInit {
  @Input() miscComponent: DuraformMiscComponentDto;
  @Output() afterSubmit = new EventEmitter();

  cloneMisc: DuraformMiscComponentDto;
  formGroup: FormGroup;

  get quantity(): AbstractControl {
    return this.formGroup.get('quantity');
  }

  constructor(private fb: FormBuilder, private order: DuraformOrderService) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      quantity: [
        1,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });

    if (this.miscComponent) {
      this.quantity.patchValue(this.miscComponent.quantity);
    }

    this.cloneMisc = this.miscComponent;
  }

  onMiscTypeSelect = (type: DuraformMiscTypeEnum) => {
    this.formGroup = this.fb.group({
      quantity: [
        this.quantity.value,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });

    switch (type) {
      case DuraformMiscTypeEnum.LooseFoil:
        this.cloneMisc = new DuraformMiscLooseFoilDto();
        break;
      case DuraformMiscTypeEnum.CapMould:
        this.cloneMisc = new DuraformMiscCapMouldDto();
        break;
      case DuraformMiscTypeEnum.FingerPull:
        this.cloneMisc = new DuraformMiscFingerPullDto();
        break;
      case DuraformMiscTypeEnum.HeatStrip:
        this.cloneMisc = new DuraformMiscHeatStripDto();
        break;
    }
  };

  onSubmit = () => {
    if (!this.cloneMisc) {
      return;
    }

    this.cloneMisc.update(this.formGroup);
    this.cloneMisc.calculatePrice(this.order.duraformEnquiry);

    const deepCopy = _.cloneDeep(this.cloneMisc);

    if (this.miscComponent) {
      const index = this.order.duraformEnquiry.miscComponents.indexOf(
        this.miscComponent
      );

      if (index > -1) {
        this.order.duraformEnquiry.miscComponents.splice(index, 1, deepCopy);
        this.miscComponent = _.cloneDeep(this.cloneMisc);
      }
    } else {
      this.order.addComponent(deepCopy);
    }

    if (this.afterSubmit) {
      this.afterSubmit.emit();
    }
  };
}
