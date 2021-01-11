import { Expose } from 'class-transformer';
import { DuraformEdgeProfileForList } from './../duraform-edge-profile/DuraformEdgeProfileForList';
export abstract class DuraformComponentDto {
  $type: string;
  id: number;
  quantity: number;
  height: number;
  width: number;
  duraformEdgeProfileId: number;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  note: string;
  sortNumber: number;

  protected update(formValue: any) {
    this.quantity = formValue.quantity;
    this.height = formValue.height;
    this.width = formValue.width;
    this.duraformEdgeProfileId = formValue.duraformEdgeProfileId;
    this.top = formValue.top;
    this.bottom = formValue.bottom;
    this.left = formValue.left;
    this.right = formValue.right;
    this.note = formValue.note;
  }

  @Expose()
  selectEdgeProfile(profile: DuraformEdgeProfileForList) {
    this.duraformEdgeProfileId = profile.id;

    const { forceTop, forceBottom, forceLeft, forceRight } = profile;

    if (forceTop === true || forceTop === false) {
      this.top = forceTop;
    }

    if (forceBottom === true || forceBottom === false) {
      this.bottom = forceBottom;
    }

    if (forceLeft === true || forceLeft === false) {
      this.left = forceLeft;
    }

    if (forceRight === true || forceRight === false) {
      this.right = forceRight;
    }
  }
}
