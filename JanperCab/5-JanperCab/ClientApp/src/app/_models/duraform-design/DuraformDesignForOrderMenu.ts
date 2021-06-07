import { DuraformDesignDto } from './DuraformDesignDto';
import { DuraformDesignEdgeProfileDto } from './DuraformDesignEdgeProfileDto';

export class DuraformDesignForOrderMenu extends DuraformDesignDto {
  defaultEdgeProfileName: string;
  allowedEdgeProfiles: DuraformDesignEdgeProfileDto[] = [];
}
