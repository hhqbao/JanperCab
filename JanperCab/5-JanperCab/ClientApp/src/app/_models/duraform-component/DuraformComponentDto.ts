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
}
