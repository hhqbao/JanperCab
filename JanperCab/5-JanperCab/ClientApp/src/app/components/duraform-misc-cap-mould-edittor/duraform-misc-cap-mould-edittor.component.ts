import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformMiscCapMouldDto } from 'src/app/_models/duraform-misc-component/DuraformMiscCapMouldDto';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DuraformMiscBaseEdittor } from '../duraform-misc-base-edittor/duraform-misc-base-edittor.component';
import { CapMouldSizeEnum } from 'src/app/_enums/CapMouldSizeEnum';

@Component({
  selector: 'app-duraform-misc-cap-mould-edittor',
  templateUrl: 'duraform-misc-cap-mould-edittor.component.html',
})
export class DuraformMiscCapMouldEdittorComponent
  extends DuraformMiscBaseEdittor
  implements OnInit {
  readonly mouldSizes = [
    { text: 'Size A', value: CapMouldSizeEnum.SizeA },
    { text: 'Size C', value: CapMouldSizeEnum.SizeB },
  ];

  constructor(private fb: FormBuilder, public order: DuraformOrderService) {
    super();
  }

  get size(): AbstractControl {
    return this.formGroup.get('size');
  }

  get isRaw(): AbstractControl {
    return this.formGroup.get('isRaw');
  }

  ngOnInit() {
    this.formGroup.addControl(
      'size',
      this.fb.control(CapMouldSizeEnum.SizeA, [Validators.required])
    );
    this.formGroup.addControl(
      'isRaw',
      this.fb.control(true, [Validators.required])
    );

    if (this.cloneMisc) {
      const capMouldMisc = this.cloneMisc as DuraformMiscCapMouldDto;

      this.size.patchValue(capMouldMisc.size);
      this.isRaw.patchValue(capMouldMisc.isRaw);
    }

    this.onChange();
  }

  onChange = () => {
    this.updateInput.emit();
  };
}
