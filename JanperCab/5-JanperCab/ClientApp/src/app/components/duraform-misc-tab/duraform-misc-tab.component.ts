import { DialogService } from 'src/app/_services/dialog.service';
import { DuraformMiscDto } from 'src/app/_models/duraform-misc/DuraformMiscDto';
import { FormGroup } from '@angular/forms';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duraform-misc-tab',
  templateUrl: 'duraform-misc-tab.component.html',
})
export class DuraformMiscTabComponent implements OnInit {
  constructor(
    public order: DuraformOrderService,
    private dialog: DialogService
  ) {}

  ngOnInit() {}

  onAddItem = (formGroup: FormGroup) => {
    if (formGroup.invalid) {
      return;
    }

    const formValues = formGroup.value;
    const miscItem = new DuraformMiscDto();
    miscItem.quantity = formValues.quantity;
    miscItem.miscItemId = formValues.miscItemId;
    miscItem.note = formValues.note;

    this.order.addMisc(miscItem);
  };

  onRemoveMisc = (misc: DuraformMiscDto) => {
    this.dialog.confirm('Remove Misc', 'Are you sure?', () => {
      this.order.removeMisc(misc);
    });
  };
}
