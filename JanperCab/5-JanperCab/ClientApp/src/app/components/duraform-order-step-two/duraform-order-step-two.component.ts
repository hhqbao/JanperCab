import { DuraformPriceService } from './../../_services/duraform-price.service';
import { UploadDuraformFileDto } from './../../_models/files/UploadDuraformFileDto';
import { FileService } from './../../_services/file.service';
import { DuraformFileDto } from './../../_models/application-file/DuraformFileDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
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
    private layout: LayoutService,
    private asset: DuraformAssetService,
    private priceService: DuraformPriceService
  ) {}

  ngOnInit() {
    this.layout.showLoadingPanel();

    const serieOneRequest = this.order.isRoutingOnly
      ? this.priceService.getRouteOnlyPriceGrid(1)
      : this.priceService.getPressPriceGrid(this.order.selectedWrapType.id, 1);

    const selectedSerieRequest = this.order.isRoutingOnly
      ? this.priceService.getRouteOnlyPriceGrid(this.order.selectedSerie.id)
      : this.priceService.getPressPriceGrid(
          this.order.selectedWrapType.id,
          this.order.selectedSerie.id
        );

    const observables =
      this.order.selectedSerie.id === 1
        ? forkJoin({
            serieOnePrices: serieOneRequest,
          })
        : forkJoin({
            serieOnePrices: serieOneRequest,
            selectedSeriePrices: selectedSerieRequest,
          });

    observables.subscribe(
      (responses) => {
        this.asset.priceGrids = responses.serieOnePrices;

        if (responses['selectedSeriePrices']) {
          this.asset.priceGrids = this.asset.priceGrids.concat(
            responses['selectedSeriePrices']
          );
        }

        this.layout.closeLoadingPanel();
      },
      (error) => {
        this.dialog.error(error);
      }
    );
  }

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
          () => {
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
