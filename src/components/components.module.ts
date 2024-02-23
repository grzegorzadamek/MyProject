import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule/schedule.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [CommonModule, TranslateModule],
  exports: [CommonModule, ScheduleComponent],
})
export class ComponentsModule {}
