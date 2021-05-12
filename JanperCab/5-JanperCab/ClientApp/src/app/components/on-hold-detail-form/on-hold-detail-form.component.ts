import { MachineProdutionCurrentProcessDto } from './../../_models/machine/MachineProdutionCurrentProcessDto';
import { plainToClass } from 'class-transformer';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { OnHoldComponentService } from './../../_services/on-hold-component.service';
import { OnHoldComponentDto } from './../../_models/on-hold-detail/OnHoldComponentDto';
import { MachineService } from './../../_services/machine.service';
import { DialogService } from './../../_services/dialog.service';
import { LayoutService } from './../../_services/layout.service';
import { EnquiryService } from './../../_services/enquiry.service';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-on-hold-detail-form',
  templateUrl: 'on-hold-detail-form.component.html',
})
export class OnHoldDetailFormComponent implements OnInit {
  @Input() process: MachineProdutionCurrentProcessDto;

  @Output() completeBtnClick = new EventEmitter();
  @Output() closeBtnClick = new EventEmitter();

  @ViewChild('quantityInput') quantityInput: ElementRef;

  showComponentForm = false;
  onHoldComponentForm: FormGroup;
  selectedComponent: OnHoldComponentDto = null;
  onHoldComponents: OnHoldComponentDto[] = [];

  descriptions: any[] = [
    { value: 'Remake' },
    { value: 'Fold Back' },
    { value: 'Double Sided' },
  ];

  get quantity(): AbstractControl {
    return this.onHoldComponentForm.get('quantity');
  }

  get description(): AbstractControl {
    return this.onHoldComponentForm.get('description');
  }

  constructor(
    private onHoldComponentService: OnHoldComponentService,
    private fb: FormBuilder,
    private layoutService: LayoutService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.layoutService.showLoadingPanel();

    this.onHoldComponentService
      .getOnHoldComponents(this.process.processId)
      .subscribe(
        (response) => {
          this.onHoldComponents = response;
          this.layoutService.closeLoadingPanel();
        },
        (error) => {
          this.layoutService.closeLoadingPanel();
          this.dialogService.alert('Error Occured', error, null);
        }
      );
  }

  initialForm = () => {
    this.onHoldComponentForm = this.fb.group({
      id: [this.selectedComponent ? this.selectedComponent.id : 0],
      processId: [
        this.selectedComponent
          ? this.selectedComponent.processId
          : this.process.processId,
      ],
      quantity: [
        this.selectedComponent ? this.selectedComponent.quantity : 1,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      description: [this.selectedComponent?.description, [Validators.required]],
    });

    this.showComponentForm = true;

    setTimeout(() => {
      (this.quantityInput.nativeElement as HTMLElement).focus();
    });
  };

  onSelectComponent = (component: OnHoldComponentDto) => {
    this.selectedComponent = component;

    this.initialForm();
  };

  onSaveComponentForm = () => {
    if (this.onHoldComponentForm.invalid) {
      return;
    }

    this.layoutService.showLoadingPanel();
    const model = plainToClass(
      OnHoldComponentDto,
      this.onHoldComponentForm.value
    );

    if (this.selectedComponent) {
      this.onHoldComponentService
        .updateOnHoldComponents(this.selectedComponent.id, model)
        .subscribe(
          (response) => {
            this.selectedComponent.quantity = response.quantity;
            this.selectedComponent.description = response.description;
            this.selectedComponent = null;

            this.layoutService.closeLoadingPanel();
            this.dialogService.success('Component Updated');
            this.showComponentForm = false;
          },
          (error) => {
            this.layoutService.closeLoadingPanel();
            this.dialogService.error(error);
          }
        );
    } else {
      this.onHoldComponentService.addOnHoldComponents(model).subscribe(
        (response) => {
          this.onHoldComponents.push(response);

          this.layoutService.closeLoadingPanel();
          this.dialogService.success('Component Added');
          this.showComponentForm = false;
        },
        (error) => {
          this.layoutService.closeLoadingPanel();
          this.dialogService.error(error);
        }
      );
    }
  };

  onDeleteComponent = (component: OnHoldComponentDto) => {
    this.dialogService.confirm('Delete Component', 'Are you sure?', () => {
      this.layoutService.showLoadingPanel();
      this.onHoldComponentService.deleteOnHoldComponent(component.id).subscribe(
        (_) => {
          const index = this.onHoldComponents.indexOf(component);
          this.onHoldComponents.splice(index, 1);

          this.layoutService.closeLoadingPanel();
          this.dialogService.success('Component Deleted');
        },
        (error) => {
          this.layoutService.closeLoadingPanel();
          this.dialogService.alert('Delete Component Failed', error, null);
        }
      );
    });
  };

  onClose = () => {
    if (this.onHoldComponents.length === 0) {
      return;
    }

    this.closeBtnClick.emit();
  };
}
