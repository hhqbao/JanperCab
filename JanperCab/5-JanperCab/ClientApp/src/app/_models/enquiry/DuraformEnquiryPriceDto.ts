import { DuraformEnquiryDto } from './DuraformEnquiryDto';
import { DuraformMiscComponentPriceDto } from './../duraform-misc-component/DuraformMiscComponentPriceDto';

import { EnquiryPriceDto } from './EnquiryPriceDto';
import { DuraformComponentPriceDto } from '../duraform-component/DuraformComponentPriceDto';

export class DuraformEnquiryPriceDto extends EnquiryPriceDto {
  duraformComponents: DuraformComponentPriceDto[] = [];

  miscComponents: DuraformMiscComponentPriceDto[] = [];

  constructor(duraformEnquiry: DuraformEnquiryDto) {
    super(duraformEnquiry);
    this.$type =
      '_3_Application.Dtos.Enquiry.DuraformEnquiryPriceDto, 3-Application';

    duraformEnquiry.duraformComponents.forEach((x) => {
      this.duraformComponents.push(new DuraformComponentPriceDto(x));
    });

    duraformEnquiry.miscComponents.forEach((x) => {
      this.miscComponents.push(new DuraformMiscComponentPriceDto(x));
    });
  }
}
