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
  public partOK: string;
  public partInArray: string[] = [];
  public sectionLabelOK: string = '';
  public tasks: {name: string, label: string, parts: string[]}[] = [];
  public isLoading: boolean;
  public isLoadingError: boolean = false;
  public getPDF: Subject<void> = new Subject<void>();
  private _blackList: string[] = (blackList as any).default;

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

          let sectionLabel: string = section.split('<h').pop()?.split('</strong></h')[0] as string;
          this._blackList.map((item: string) => {
              sectionLabel = sectionLabel.replace(item, '');
          });

          this.sectionLabelOK = sectionLabel.split(">").pop() as string;

          const regex = /class="so"><strong>\s*(.*?)\s*<\/p>/g;
          let matchResult = section.match(regex);
          matchResult?.map((item: string | undefined) => {
            let part3: string = item?.split('class="so"><strong>').pop()?.split('</strong> ')[0] as string; // get parts of each section
            this.partOK = part3.split('„</strong><strong>').pop()?.split('</strong><strong>”')[0] as string;
            this._blackList.map((item: string) => {
                this.partOK = this.partOK.replace(item, '');
            });
            this.partInArray.push(this.partOK);
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
