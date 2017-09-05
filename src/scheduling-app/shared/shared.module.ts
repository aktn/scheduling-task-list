import { ScheduleService } from './services/schedule/schedule.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
    imports:[
        AngularFireDatabaseModule,
        RouterModule,
        CommonModule
    ],
    declarations: [

    ]
})

export class SharedModule{
    static forRoot(): ModuleWithProviders{
        return{
            ngModule: SharedModule,
            providers: [
                ScheduleService
            ]
        }
    }
}
