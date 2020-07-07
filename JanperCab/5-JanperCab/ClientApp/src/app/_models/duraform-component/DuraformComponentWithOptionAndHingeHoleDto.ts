import { HingeHoleOptionDto } from './../hinge-hole-option/HingeHoleOptionDto';
import { DuraformComponentWithOptionDto } from './DuraformComponentWithOptionDto';

export abstract class DuraformComponentWithOptionAndHingeHoleDto extends DuraformComponentWithOptionDto {
  hingeHoleOption: HingeHoleOptionDto;
}
