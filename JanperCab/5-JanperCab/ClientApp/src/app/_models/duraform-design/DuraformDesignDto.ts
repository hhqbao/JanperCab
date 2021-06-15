import { DuraformSerieDto } from './../duraform-serie/DuraformSerieDto';
import { DuraformEdgeProfileDto } from '../duraform-edge-profile/DuraformEdgeProfileDto';
import { DuraformDesignEdgeProfileDto } from './DuraformDesignEdgeProfileDto';

export class DuraformDesignDto {
  id: number;
  name: string;
  imageUrl: string;
  isPopular: boolean;
  duraformSerieId: number;
  duraformEdgeProfileId: number;
  hasNoArch: boolean;
  thickness: number;

  duraformSerie: DuraformSerieDto;
  defaultEdgeProfile: DuraformEdgeProfileDto;
  allowedEdgeProfiles: DuraformDesignEdgeProfileDto[];
}
