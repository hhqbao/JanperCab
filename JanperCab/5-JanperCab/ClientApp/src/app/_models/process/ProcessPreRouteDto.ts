import { ProcessDto } from './ProcessDto';

export class ProcessPreRouteDto extends ProcessDto {
  getStatus(): string {
    return 'Pre Route';
  }
}
