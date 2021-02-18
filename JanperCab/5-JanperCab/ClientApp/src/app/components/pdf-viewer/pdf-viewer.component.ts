import { LayoutService } from './../../_services/layout.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as printJS from 'print-js';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: 'pdf-viewer.component.html',
})
export class PdfViewerComponent implements OnInit {
  @Input() documentName: string;

  @Output() closePanel = new EventEmitter();
  @ViewChild('printableForm') printableForm: ElementRef;

  isLoading = true;
  element: HTMLElement;
  canvasElement: Promise<HTMLCanvasElement>;

  margins = { vertical: 30, horizontal: 30 };
  ratio: number;

  constructor(private layout: LayoutService) {}

  ngOnInit() {
    setTimeout(() => {
      this.element = this.printableForm.nativeElement as HTMLElement;

      const { offsetWidth, offsetHeight } = this.element;

      this.ratio = offsetWidth / offsetHeight;

      this.canvasElement = html2canvas(this.element, {
        allowTaint: true,
        scale: 1,
      });

      this.isLoading = false;
    });
  }

  onPrint = () => {
    window.print();
  };

  onView = () => {
    this.renderPdf(false);
  };

  onSaveToDisk = () => {
    this.renderPdf(true);
  };

  private renderPdf = (saveToDisk = false) => {
    this.isLoading = true;
    this.layout.showLoadingPanel();

    this.canvasElement.then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 3);

      const doc = new jsPDF('p', 'pt', 'A4');

      const { horizontal, vertical } = this.margins;

      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();

      const width = pdfWidth - horizontal * 2;
      const height = width / this.ratio;

      const totalPages = Math.ceil(height / pdfHeight) - 1;

      doc.addImage(imgData, 'PNG', vertical, horizontal, width, height);

      for (let i = 1; i <= totalPages; i++) {
        doc.addPage();
        doc.addImage(imgData, 'PNG', vertical, -pdfHeight * i, width, height);
      }

      if (!saveToDisk) {
        window.open(`${doc.output('bloburl')}`, '_blank');
      } else {
        doc.save(`${this.documentName}.pdf`);
      }

      this.isLoading = false;
      this.layout.closeLoadingPanel();
    });
  };
}
