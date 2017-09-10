import { Observable } from 'rxjs/Observable';
import { Store } from './../../../../store';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

export interface Staff{
    name: string,
    timestamp: number,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class StaffService{
    
    staff$ : Observable<Staff[]> = this.db.list(`staff`).do(next => this.store.set('staff', next));

    constructor(
        private store: Store,
        private db: AngularFireDatabase
    ){}

    createStaff(staff: Staff){
        return this.db.list(`staff`).push(staff);
    }

    retrieveStaff(key: string){
        if(!key) return Observable.of({});
        return this.store.select<Staff[]>('staff')
            .filter(Boolean)
            .map(staff => staff.find((s: Staff) => s.$key === key));
    }

    updateStaff(staff: Staff, key: string){
        return this.db.object(`staff/${key}`).update(staff);
    }

    deleteStaff(key: string){
        return this.db.list(`staff`).remove(key);
    }


}