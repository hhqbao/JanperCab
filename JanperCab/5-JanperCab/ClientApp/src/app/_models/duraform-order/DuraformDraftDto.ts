import { DuraformFormDto } from './DuraformFormDto';

import { DuraformOrderTypeKey } from 'src/app/_enums/DuraformOrderTypeKey';

export class DuraformDraftDto extends DuraformFormDto {
  constructor() {
    super();
    this.orderType = DuraformOrderTypeKey.Draft;
  }
}
