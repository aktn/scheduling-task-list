import { Store } from 'store';
import { ScheduleService } from './../../../shared/services/schedule/schedule.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

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

export class ScheduleComponent implements OnInit, OnDestroy{

    date$: Observable<Date>;
    subscriptions: Subscription[] = [];

    constructor(
        private scheduleService: ScheduleService,
        private store: Store
    ){}

    ngOnInit(){
        this.date$ = this.store.select('date');

        this.subscriptions = [
            this.scheduleService.schedule$.subscribe()
        ];
    }

    ngOnDestroy(){
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}