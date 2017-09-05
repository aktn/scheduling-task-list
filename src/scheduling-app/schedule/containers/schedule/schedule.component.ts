import { ScheduleService } from './../../../shared/services/schedule/schedule.service';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

@Component({
    selector: 'schedule',
    styleUrls: ['schedule.component.scss'],
    template: `
        <div class="schedule">
            Calendar
            <schedule-calendar [date]="date$ | async"></schedule-calendar>
        </div>
    `
})

export class ScheduleComponent{

    date$: Observable<Date>;

    constructor(
        private scheduleService: ScheduleService
    ){}
}