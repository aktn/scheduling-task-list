import { Staff } from './scheduling-app/shared/services/staff/staff.service';
import { ScheduleItem } from './scheduling-app/shared/services/schedule/schedule.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/distinctUntilChanged';

export interface State {
  [key: string]: any,
  date: Date,
  schedule: ScheduleItem[],
  selected: any,
  staff: Staff[],
  list: any
}

const state: State = {
  date: undefined,
  schedule: undefined,
  selected: undefined,
  staff: undefined,
  list: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().distinctUntilChanged();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pluck(name);
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}
