import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() tasks: {name: string, label: string, parts: string[]}[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public onChangeValue(event: any): void {
    console.log('test');
    event.target.classList.add('filled');
  }

}
