export class EndPanelForCart {
  quantity: number;
  height: number;
  width: number;
  numberOfShields: number;
  extraRailBottom: number;
  extraRailTop: number;
  extraRailLeft: number;
  extraRailRight: number;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  note: string;

  constructor() {}

  update = (formValue: any) => {
    this.quantity = formValue.quantity;
    this.height = formValue.height;
    this.width = formValue.width;
    this.numberOfShields = formValue.numberOfShields;
    this.extraRailBottom = formValue.extraRailBottom;
    this.extraRailTop = formValue.extraRailTop;
    this.extraRailLeft = formValue.extraRailLeft;
    this.extraRailRight = formValue.extraRailRight;
    this.top = formValue.top;
    this.bottom = formValue.bottom;
    this.left = formValue.left;
    this.right = formValue.right;
    this.note = formValue.note;
  };
}
