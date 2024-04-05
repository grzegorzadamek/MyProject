import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/Pages/login/login.component';
import { MyScheduleComponent } from 'src/Pages/my-schedule/my-schedule.component';
import { LoginGuard } from 'src/guards/login.guard';
import { AppComponent } from 'src/app/app.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //default route
  { path: 'login', component: LoginComponent },
  {
    path: 'my-schedule',
    component: MyScheduleComponent,
    canActivate: [LoginGuard],
  },
  { path: '**', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
