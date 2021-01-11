import { DuraformDesignEdgeProfileDto } from './DuraformDesignEdgeProfileDto';

export class DuraformDesignForOrderMenu {
  id: number;
  name: string;
  imageUrl: string;
  isPopular: boolean;
  duraformSerieId: number;
  defaultEdgeProfileId: number;
  defaultEdgeProfileName: string;
  hasNoArch: boolean;
  thickness: number;
  allowedEdgeProfiles: DuraformDesignEdgeProfileDto[] = [];
}
