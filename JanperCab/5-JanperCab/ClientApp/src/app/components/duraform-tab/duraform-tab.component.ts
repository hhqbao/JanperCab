import { FormGroup } from '@angular/forms';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DialogService } from './../../_services/dialog.service';
import { DuraformComponentDto } from 'src/app/_models/duraform-component/DuraformComponentDto';

export abstract class DuraformTabComponent {
  canSelectCartItem = true;

  constructor(
    protected dialog: DialogService,
    protected order: DuraformOrderService
  ) {}

  abstract onAddComponent(formGroup: FormGroup): void;

  onRemoveComponent = (component: DuraformComponentDto) => {
    this.dialog.confirm('Remove Component', 'Are you sure?', () => {
      this.canSelectCartItem = true;
      this.order.removeComponent(component);
    });
  };
}
