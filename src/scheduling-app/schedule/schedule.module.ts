import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { SharedModule } from './../shared/shared.module';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const ROUTES: Routes = [
    { path: '', component: ScheduleComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        SharedModule
    ],
    declarations: [
        ScheduleComponent,
        ScheduleCalendarComponent,
        ScheduleControlsComponent,
        ScheduleDaysComponent
    ]
})

export class ScheduleModule{
    
}