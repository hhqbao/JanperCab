import { DuraformMiscHeatStripDto } from 'src/app/_models/duraform-misc-component/DuraformMiscHeatStripDto';
import { HeatStripTypeEnum } from './../../_enums/HeatStripTypeEnum';
import { HeatStripSizeEnum } from './../../_enums/HeatStripSizeEnum';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DuraformMiscBaseEdittor } from '../duraform-misc-base-edittor/duraform-misc-base-edittor.component';

@Component({
  selector: 'app-duraform-misc-heat-strip-edittor',
  templateUrl: 'duraform-misc-heat-strip-edittor.component.html',
})
export class DuraformMiscHeatStripEdittorComponent
  extends DuraformMiscBaseEdittor
  implements OnInit {
  readonly sizes = [
    { text: `${HeatStripSizeEnum.SizeA}mm`, value: HeatStripSizeEnum.SizeA },
    { text: `${HeatStripSizeEnum.SizeB}mm`, value: HeatStripSizeEnum.SizeB },
    { text: `${HeatStripSizeEnum.SizeC}mm`, value: HeatStripSizeEnum.SizeC },
  ];
  readonly types = [
    { text: 'Angle', value: HeatStripTypeEnum.Angle },
    { text: 'Flat', value: HeatStripTypeEnum.Flat },
  ];

  constructor(private fb: FormBuilder) {
    super();
  }

  get size(): AbstractControl {
    return this.formGroup.get('size');
  }

  get type(): AbstractControl {
    return this.formGroup.get('type');
  }

  ngOnInit() {
    this.formGroup.addControl(
      'size',
      this.fb.control(HeatStripSizeEnum.SizeA, [Validators.required])
    );
    this.formGroup.addControl(
      'type',
      this.fb.control(HeatStripTypeEnum.Angle, [Validators.required])
    );

    if (this.cloneMisc) {
      const heatStripMisc = this.cloneMisc as DuraformMiscHeatStripDto;

      this.size.patchValue(heatStripMisc.size);
      this.type.patchValue(heatStripMisc.type);
    }

    this.onChange();
  }

  onChange = () => {
    this.updateInput.emit();
  };
}
