import { DuraformProcessDto } from './DuraformProcessDto';

export class DuraformProcessPreRouteDto extends DuraformProcessDto {
  getStatus(): string {
    return 'Pre Route';
  }
}
