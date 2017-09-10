import { Staff } from './../../../shared/services/staff/staff.service';
import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: 'schedule-assign',
    styleUrls: ['schedule-assign.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="schedule-assign">
            <div class="schedule-assign__modal">
                <div class="schedule-assign__title">
                    <h1><img src="/img/sad-face.svg">Assign Member</h1>
                </div>
                <div class="schedule-assign__form">
                    <form [formGroup]="form">
                        <input formControlName="name" type="text" placeholder="New Member" />
                        <button type="button" class="button" (click)="createStaff()">Add</button>
                    </form>
                </div>
            </div>
        </div>
    `
})

export class ScheduleAssignComponent{

    constructor(
        private fb: FormBuilder
    ){}

    form = this.fb.group({
        name: ['']
    });

    @Output() create = new EventEmitter<Staff>();
    createStaff(){
        this.create.emit(this.form.value);
    }
    
}