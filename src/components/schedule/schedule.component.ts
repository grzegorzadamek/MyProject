import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const FILE_NAME: string = 'meeting.pdf';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  @Input() tasks: { name: string; label: string; parts: string[] }[] = [];
  @Input() isLoading: boolean;
  @Input() downloadPDF: Observable<void>;

  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;

  private eventsSubscription: Subscription;

  public ngOnInit(): void {
    this.eventsSubscription = this.downloadPDF.subscribe(() =>
      this.downloadAsPDF(),
    );
  }

  public ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }

  public onChangeValue(event: any): void {
    event?.target?.classList?.add('filled');
  }

  public downloadAsPDF(): void {
    const img = document.getElementById('pdfTable') as HTMLElement;
    html2canvas(img).then(function (canvas) {
      var data = canvas.toDataURL();
      var docDefinition = {
        content: [
          {
            image: data,
            width: 500,
          },
        ],
      };
      pdfMake.createPdf(docDefinition).download(FILE_NAME);
    });
  }
}
