import { UploadDuraformFileDto } from './../../_models/files/UploadDuraformFileDto';
import { FileService } from './../../_services/file.service';
import { DuraformFileDto } from './../../_models/application-file/DuraformFileDto';
import { HingeHoleTypeService } from './../../_services/hinge-hole-type.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { DuraformOptionTypeService } from './../../_services/duraform-option-type.service';
import { DuraformDrawerTypeService } from './../../_services/duraform-drawer-type.service';
import { PantryDoorChairRailTypeService } from './../../_services/pantry-door-chair-rail-type.service';
import { DuraformArchService } from './../../_services/duraform-arch.service';
import { forkJoin } from 'rxjs';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { LayoutService } from './../../_services/layout.service';
import { DialogService } from './../../_services/dialog.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-duraform-order-step-two',
  templateUrl: 'duraform-order-step-two.component.html',
})
export class DuraformOrderStepTwoComponent implements OnInit {
  @Output() goBack = new EventEmitter();
  @Output() finish = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    public order: DuraformOrderService,
    private dialog: DialogService,
    public fileService: FileService,
    private layout: LayoutService
  ) {}

  ngOnInit() {}

  onRepickClick = () => {
    this.goBack.emit();
  };

  onPreviewOrderClick = () => {
    this.finish.emit();
  };

  onSelectFiles = () => {
    const { files } = this.fileInput.nativeElement;
    const fileList = { ...files, length: files.length };

    this.fileInput.nativeElement.value = null;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i] as File;

      const duraformFile = new UploadDuraformFileDto();
      duraformFile.fileName = file.name;
      duraformFile.fileSize = file.size;
      duraformFile.fileType = file.type;
      duraformFile.file = file;

      this.fileService.duraformFiles.push(duraformFile);
    }
  };

  onRemoveUploadFile = (file: UploadDuraformFileDto) => {
    const index = this.fileService.duraformFiles.indexOf(file);

    if (index > -1) {
      this.fileService.duraformFiles.splice(index, 1);
    }
  };

  onDeleteFile = (file: DuraformFileDto) => {
    this.dialog.confirm(
      'Delete File',
      'This action cannot be undone! Are you sure',
      () => {
        this.layout.showLoadingPanel();
        this.fileService.deleteDuraformFile(file.id).subscribe(
          (response) => {
            const index = this.order.duraformFiles.indexOf(file);

            this.order.duraformFiles.splice(index, 1);
            this.layout.closeLoadingPanel();
            this.dialog.success('File has been deleted.');
          },
          (error) => {
            this.layout.closeLoadingPanel();
            this.dialog.error(error);
          }
        );
      }
    );
  };
}
