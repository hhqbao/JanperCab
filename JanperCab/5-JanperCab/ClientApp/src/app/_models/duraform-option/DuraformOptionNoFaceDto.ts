import { throwError } from 'rxjs';
import { DuraformOptionDto } from './DuraformOptionDto';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Expose } from 'class-transformer';
import { DuraformComponentWithOptionDto } from '../duraform-component/DuraformComponentWithOptionDto';
import { DuraformEnquiryDto } from '../enquiry/DuraformEnquiryDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformSerieTypeEnum } from 'src/app/_enums/DuraformSerieTypeEnum';

export class DuraformOptionNoFaceDto extends DuraformOptionDto {
  get hasNoProfile(): boolean {
    return true;
  }

  @Expose()
  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      optionTypeId: new FormControl(this.duraformOptionTypeId, [
        Validators.required,
      ]),
    });

    return formGroup;
  }

  @Expose()
  toString(): string {
    return 'PANEL NO FACE ROUT';
  }

  @Expose()
  toCabProValue(): string {
    return 'PANEL NO FACE ROUT';
  }

  @Expose()
  getExtraWidth(): number {
    return 0;
  }

  @Expose()
  calculateUnitPrice(
    basePrice: number,
    duraformEnquiry: DuraformEnquiryDto,
    component: DuraformComponentWithOptionDto
  ): number {
    const panelSerie = DuraformAssetService.instance.duraformSeries.find(
      (x) => x.serieTypeEnum === DuraformSerieTypeEnum.PlainPanel
    );

    if (!panelSerie) {
      throw new Error('Missing Panel Serie!');
    }

    const panelPrice = DuraformAssetService.instance.getBasePrice(
      panelSerie.id,
      component.totalHeight,
      component.totalWidth
    );

    return panelPrice <= 0 ? basePrice : panelPrice;
  }
}
