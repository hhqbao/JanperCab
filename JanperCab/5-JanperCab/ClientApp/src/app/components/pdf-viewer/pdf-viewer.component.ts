import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: 'pdf-viewer.component.html',
})
export class PdfViewerComponent implements OnInit {
  @Output() closePanel = new EventEmitter();
  @ViewChild('printableForm') printableForm: ElementRef;

  isLoading = true;
  element: HTMLElement;
  canvasElement: Promise<HTMLCanvasElement>;

  margins = { vertical: 30, horizontal: 30 };
  ratio: number;

  constructor() {}

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

  onView = () => {
    this.renderPdf(false);
  };

  onSaveToDisk = () => {
    this.renderPdf(true);
  };

  private renderPdf = (saveToDisk = false) => {
    this.isLoading = true;

    this.canvasElement.then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 3);

      const doc = new jsPDF('p', 'pt', 'A4');

      const { horizontal, vertical } = this.margins;
      const width = doc.internal.pageSize.getWidth() - horizontal * 2;
      const height = width / this.ratio;

      doc.addImage(imgData, 'PNG', vertical, horizontal, width, height);

      if (!saveToDisk) {
        window.open(`${doc.output('bloburl')}`, '_blank');
      } else {
        doc.save('Delivery-Docket.pdf');
      }

      this.isLoading = false;
    });
  };
}
