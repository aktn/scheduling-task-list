import { Staff } from './../staff/staff.service';
import { Observable } from 'rxjs/Observable';
import { Store } from './../../../../store';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/withLatestFrom';

export interface ScheduleItem{
    $key?: string,
    timestamp: number,
    section: string,
    staff: Staff[]
}

export interface Task{
    name: string
}

export interface ScheduleList{
    checkStock?: ScheduleItem,
    supplyStock?: ScheduleItem,
    clean?: ScheduleItem,
    cashier?: ScheduleItem,
    [key: string]: any
}

@Injectable()
export class ScheduleService{
    private date$ = new BehaviorSubject(new Date());
    private section$ = new Subject();

    selected$ = this.section$.do((next: any)=> this.store.set('selected', next));

    constructor(
        private db: AngularFireDatabase,
        private store: Store
    ){}

    updateDate(date: Date){
        this.date$.next(date);
    }

    private getSchedule(startAt: number, endAt: number) {
        return this.db.list(`schedule`, {
            query: {
                orderByChild: 'timestamp',
                startAt,
                endAt
            }
        });
    }

    selectSection(event: any){
        this.section$.next(event);
    }

    private staffList$ = new Subject();
    staff$ = this.staffList$
        .withLatestFrom(this.section$)
        .map(([ staff, section ]: any[]) => {

            const id = section.data.$key;
            const defaults: ScheduleItem = {
                staff: null,
                section: section.section,
                timestamp: new Date(section.day).getTime()
            };
            const payload = {...(id ? section.data : defaults),...staff};

            if (id) {
                return this.updateSection(id, payload);
            } else {
                return this.createSection(payload);
            }
        });

    schedule$: Observable<any[]> = this.date$
        .do((next: any)=> this.store.set('date', next))
        .map((day: any) => {
            const startAt = (new Date(day.getFullYear(), day.getMonth(), day.getDate())).getTime();
            const endAt = (new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)).getTime() -1;
            return { startAt, endAt };
        })
        .switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt))
        .map((data: any) => {
            const mapped: ScheduleList = {};
            for (const prop of data) {
                if (!mapped[prop.section]) {
                    mapped[prop.section] = prop;
                }
            }
            return mapped;
        })
        .do((next: any) => this.store.set('schedule', next));
        
    assignStaff(staff: string[]) {
        this.staffList$.next(staff);
    }

    private createSection(payload: ScheduleItem) {
        return this.db.list(`schedule`).push(payload);
    }
    
    private updateSection(key: string, payload: ScheduleItem) {
        return this.db.object(`schedule`).update(payload);
    }
}