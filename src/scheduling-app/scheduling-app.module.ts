import { SharedModule } from './shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const ROUTES: Routes = [
    { path: 'schedule', loadChildren: './schedule/schedule.module#ScheduleModule' }
];

@NgModule({
    imports:[
        RouterModule.forChild(ROUTES),
        SharedModule.forRoot()
    ]
})

export class SchedulingAppModule{

}