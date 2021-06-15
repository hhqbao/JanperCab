import { DuraformWrapTypeDto } from './../duraform-wrap-type/DuraformWrapTypeDto';
export class DuraformWrapColorDto {
  id: number;
  duraformWrapTypeId: number;
  name: string;
  imageUrl: string;
  isJanperMatching: boolean;
  isLaminexMatching: boolean;

  duraformWrapType: DuraformWrapTypeDto;
}
