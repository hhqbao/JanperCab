import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformMiscFingerPullDto } from './../../_models/duraform-misc-component/DuraformMiscFingerPullDto';
import { FingerPullTypeEnum } from './../../_enums/FingerPullTypeEnum';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DuraformMiscBaseEdittor } from '../duraform-misc-base-edittor/duraform-misc-base-edittor.component';

@Component({
  selector: 'app-duraform-misc-finger-pull-edittor',
  templateUrl: 'duraform-misc-finger-pull-edittor.component.html',
})
export class DuraformMiscFingerPullEdittorComponent
  extends DuraformMiscBaseEdittor
  implements OnInit {
  readonly fingerPullTypeEnum = FingerPullTypeEnum;
  readonly pullTypes = [
    { text: 'Type A', value: FingerPullTypeEnum.A },
    { text: 'Type C', value: FingerPullTypeEnum.C },
  ];

  constructor(private fb: FormBuilder, public order: DuraformOrderService) {
    super();
  }

  get type(): AbstractControl {
    return this.formGroup.get('type');
  }

  get isRaw(): AbstractControl {
    return this.formGroup.get('isRaw');
  }

  ngOnInit() {
    this.formGroup.addControl(
      'type',
      this.fb.control(FingerPullTypeEnum.A, [Validators.required])
    );
    this.formGroup.addControl(
      'isRaw',
      this.fb.control(true, [Validators.required])
    );

    if (this.cloneMisc) {
      const fingerPullMisc = this.cloneMisc as DuraformMiscFingerPullDto;

      this.type.patchValue(fingerPullMisc.type);
      this.isRaw.patchValue(fingerPullMisc.isRaw);
    }

    this.onChange();
  }

  onChange = () => {
    this.updateInput.emit();
  };
}
