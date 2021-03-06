import { Component } from '@angular/core';
import { AppService } from '../services/app.service';
import { take } from 'rxjs/operators';
import * as parts from '../datas/parts.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MySchedule';
  url: string = '';
  public page: any = '';
  public partList: {name: string, begin: string, end: string}[] = (parts as any).default;
  public blackList = ['</strong></p>', '</strong><strong>', '</strong> <strong>', '“', '„', '<em>', '</em>', '<strong>'];
  public partOK: any;
  public partInArray: string[] = [];
  public sectionLabelOK: string = '';
  public tasks : {name: string, label: string, parts: string[]}[] = [];

  constructor(private service: AppService) {}

  public getUrl(value: string): void {
    this.tasks = [];
    this.service.getMeeting(value).pipe(take(1)).subscribe(result => {
      this.page = this.replaceText(result, /<a\b[^>]*>/gm, /<\/a>/gm, ''); // remove 'a' links

      this.partList.map(part =>
        {
          let section = this.page.split(part.begin).pop().split(part.end)[0]; // get sections of meeting
          this.partInArray = [];

          let sectionLabel = section.split('<h').pop().split('</strong></h')[0];
          this.blackList.map((item: string) => {
              sectionLabel = sectionLabel.replace(item, '');
          });
          this.sectionLabelOK = sectionLabel.split(">").pop();

          const regex = /class="so"><strong>\s*(.*?)\s*<\/p>/g;
          let matchResult = section.match(regex);
          matchResult?.map((item: any) => {
            let part3 = item.split('class="so"><strong>').pop().split('</strong> ')[0]; // get parts of each section
            this.partOK = part3.split('„</strong><strong>').pop().split('</strong><strong>”')[0];
            this.blackList.map((item: string) => {
                this.partOK = this.partOK.replace(item, '');
            });
            this.partInArray.push(this.partOK);
          });
          this.tasks.push({'name': part.name, 'label': this.sectionLabelOK, 'parts': this.partInArray});
        }
      );
    });
    console.log('this.tasks :: ', this.tasks);
  }

  public replaceText(text: string, begin: any, end: any, replace: string): string {
    return text.replace(begin, replace).replace(end, replace);
  };
}
