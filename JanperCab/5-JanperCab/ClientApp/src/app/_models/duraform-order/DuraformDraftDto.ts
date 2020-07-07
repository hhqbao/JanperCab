import { DuraformFormData } from './DuraformFormData';

import { DuraformFormDto } from './DuraformFormDto';
import { DuraformDoorDto } from '../duraform-component/DuraformDoorDto';

export class DuraformDraftDto extends DuraformFormDto {
  static FromFormData(formData: DuraformFormData): DuraformDraftDto {
    const draft = new DuraformDraftDto();
    draft.customerOrderNumber = formData.customerOrderNumber;
    draft.duraformDesignId = formData.selectedDesign.id;
    draft.duraformSerieId = formData.selectedSerie.id;
    draft.isRoutingOnly = formData.isRoutingOnly;
    draft.duraformWrapTypeId = formData.selectedWrapType?.id;
    draft.duraformWrapColorId = formData.selectedWrapColor?.id;
    draft.duraformEdgeProfileId = formData.selectedEdgeProfile.id;
    draft.hingeHoleTypeId = formData.hingeHoleTypeId;
    draft.duraformArchId = formData.selectedArch?.id;

    draft.duraformDoors = formData.doors.map((x) =>
      DuraformDoorDto.FromCartItem(x)
    );

    return draft;
  }
}
