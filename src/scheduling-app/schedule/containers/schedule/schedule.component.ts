import { Staff, StaffService } from './../../../shared/services/staff/staff.service';
import { Store } from 'store';
import { ScheduleService, ScheduleItem } from './../../../shared/services/schedule/schedule.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'schedule',
    styleUrls: ['schedule.component.scss'],
    template: `
        <div class="schedule">
            <schedule-calendar [date]="date$ | async" (change)="changeDate($event)" (select)="changeSection($event)" [assignStaff]="schedule$ | async"></schedule-calendar>
            <schedule-assign *ngIf="open" (create)="createStaff($event)" [staff]="staff$ | async" (close)="closeAssign()" (assign)="assignStaff($event)" [selected]="selected$ | async"></schedule-assign>
        </div>
    `
})

export class ScheduleComponent implements OnInit, OnDestroy{

    open = false;

    date$: Observable<Date>;
    subscriptions: Subscription[] = [];
    schedule$: Observable<ScheduleItem[]>;
    selected$: Observable<any>;
    staff$: Observable<Staff[]>;

    constructor(
        private scheduleService: ScheduleService,
        private store: Store,
        private staffSerice: StaffService
    ){}

    ngOnInit(){
        this.date$ = this.store.select('date');
        this.schedule$ = this.store.select('schedule');
        this.selected$ = this.store.select('selected');
        this.staff$ = this.store.select('staff');

        this.subscriptions = [
            this.scheduleService.selected$.subscribe(),
            this.scheduleService.schedule$.subscribe(),
            this.scheduleService.staff$.subscribe(),
            this.staffSerice.staff$.subscribe()
        ];
    }

    changeDate(date: Date){
        this.scheduleService.updateDate(date);
    }

    changeSection(event: any){
        this.open = true;
        this.scheduleService.selectSection(event);
    }

    async createStaff(event: Staff){
        await this.staffSerice.createStaff(event);
    }

    closeAssign(){
        this.open = false;
    }
    
    assignStaff(staff: string[]){
        console.log(staff);
        this.scheduleService.assignStaff(staff);
        this.closeAssign();
    }

    ngOnDestroy(){
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}