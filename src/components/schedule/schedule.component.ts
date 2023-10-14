import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  public myModel: string = '';

  @Input() tasks: {name: string, label: string, parts: string[]}[] = [];
  @Input() isLoading: boolean;

  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  ngOnInit(): void {
  }

  public onChangeValue(event: any): void {
    event.target.classList.add('filled');
  }

    public downloadAsPDF() {
       const img = document.getElementById('pdfTable') as HTMLElement;
       html2canvas(img).then(function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("meeting.pdf");
        });

  }
}
