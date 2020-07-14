export abstract class DuraformComponentDto {
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
}
