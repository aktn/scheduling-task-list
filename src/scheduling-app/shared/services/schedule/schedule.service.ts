import { Observable } from 'rxjs/Observable';
import { Store } from './../../../../store';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/do';

export interface Schedule{
    $key?: string,
    timestamp: number
}

@Injectable()
export class ScheduleService{
    private date$ = new BehaviorSubject(new Date());

    schedule$: Observable<any[]> = this.date$
        .do((next: any)=> this.store.set('date', next));

    constructor(
        private store: Store
    ){}

    updateDate(date: Date){
        this.date$.next(date);
    }

}