import { Component } from '@angular/core';
import { AppService } from '../services/app.service';
import { take, Subject } from 'rxjs';
import * as parts from '../datas/parts.json';
import * as blackList from '../datas/blackList.json';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'MySchedule';
  public url: string = '';
  public page: string = '';
  public partList: {name: string, begin: string, end: string}[] = (parts as any).default;
  public part: string;
  public partInArray: string[] = [];
  public sectionLabelOK: string = '';
  public sectionLabel: string = '';
  public tasks: {name: string, label: string, parts: string[]}[] = [];
  public isLoading: boolean;
  public isLoadingError: boolean = false;
  public getPDF: Subject<void> = new Subject<void>();
  private _blackList: string[] = (blackList as any).default;
  private _regex: RegExp;

  constructor(private _service: AppService, private _translateService: TranslateService) {
     _translateService.setDefaultLang('pl');
     _translateService.use('pl');
  }

  public getUrl(value: string): void {
    this.isLoading = true;
    this.isLoadingError = false;
    this.tasks = [];
    this._service.getMeetingByPost(value).pipe(take(1)).subscribe(result => {
      this.isLoading = false;
      this.page = this._replaceText(result, /<a\b[^>]*>/gm, /<\/a>/gm, ''); // remove 'a' links
      this.partList.map(part =>
        {
          let section: string = this.page?.split(part.begin).pop()?.split(part.end)[0] as string; // get sections of meeting
          this.partInArray = [];

          if (part.name === 'date') {
            this.sectionLabel = section.substring(
                section.indexOf("</span>") + 7,
                section.lastIndexOf("</h")
            );
          } else {
            this.sectionLabel = section.substring(
                section.indexOf("<strong>") + 8,
                section.lastIndexOf("</strong></h2>")
            );
            this._blackList.map((item: string) => {
                this.sectionLabel = this.sectionLabel.replace(item, '');
            });
          }
          this.sectionLabelOK = this.sectionLabel.split(">").pop() as string;

          if (part.name === 'intro') {
            this._regex = /<strong>\s*(.*?)\s*<\/strong> <span/g;
          } else {
            let patterns = ['<strong>\s*(.*?)\s*<\/strong><\/h3>', '<strong>\s*(.*?)\s*<\/strong><\/span><\/h3>'];
            this._regex = new RegExp(patterns.join('|'), 'g');
          }

          let matchResult = section.match(this._regex);
          matchResult?.map((item: string | undefined) => {
            this.part = item as string;

            // remove everthing between < and >
            const regex = /<.*?>/g;
            this.part = this.part.replace(regex, '');
            this._blackList.map((item: string) => {
                this.part = this.part.replace(item, '');
            });

            this.partInArray.push(this.part);
          });
          this.tasks.push({'name': part.name, 'label': this.sectionLabelOK, 'parts': this.partInArray});
        }
      );
    },
    error => {
      this.isLoading = false;
      this.isLoadingError = true;
      console.log('oops', error);
    });
  }

  public downloadAsPDF(): void {
  this.getPDF.next();
  }

  private _replaceText(text: string, begin: any, end: any, replace: string): string {
    return text.replace(begin, replace).replace(end, replace);
  };
}
