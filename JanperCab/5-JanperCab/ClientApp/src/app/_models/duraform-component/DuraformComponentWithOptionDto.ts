import { DuraformOptionDto } from 'src/app/_models/duraform-option/DuraformOptionDto';
import { DuraformComponentDto } from './DuraformComponentDto';

export abstract class DuraformComponentWithOptionDto extends DuraformComponentDto {
  duraformOption: DuraformOptionDto;
}
