import { DuraformComponentWithOptionDto } from './DuraformComponentWithOptionDto';

export class DuraformEndPanelDto extends DuraformComponentWithOptionDto {
  numberOfShields: number;
  railLeft: number;
  railCenter: number;
  railRight: number;
  extraRailBottom: number;
  extraRailTop: number;
}
