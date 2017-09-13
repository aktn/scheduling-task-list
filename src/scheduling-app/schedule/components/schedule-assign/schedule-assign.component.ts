import { Staff } from './../../../shared/services/staff/staff.service';
import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: 'schedule-assign',
    styleUrls: ['schedule-assign.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="schedule-assign">
            <div class="schedule-assign__modal">
                <div class="schedule-assign__title">
                    <h1><img src="/img/sad-face.svg">Assign Staff</h1>
                </div>
                <div class="schedule-assign__form">
                    <form [formGroup]="form">
                        <input formControlName="name" type="text" placeholder=" Add New Staff" />
                        <button type="button" class="button" (click)="createStaff()">Add</button>
                    </form>
                </div>
                <div class="schedule-assign__list">
                    <div *ngFor="let s of staff" (click)="toggleName(s.name)" [class.active]="exists(s.name)">
                        {{ s.name }}
                    </div>
                </div>
                <div class="schedule-assign__submit">
                    <div>
                        <button type="button" class="btn" (click)="assignStaff()">Assign</button>
                        <button type="button" class="btn btn--cancel" (click)="cancel()">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class ScheduleAssignComponent{

    @Input() staff: Staff[];
    private assigned: string[] = [];

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

    exists(name: string){
        return !!~this.assigned.indexOf(name);
    }

    toggleName(name: string){
        if (this.exists(name)) {
            this.assigned = this.assigned.filter(s => s !== name);
        } else {
            this.assigned = [...this.assigned, name];
        }
    }

    @Output() assign = new EventEmitter<any>();
    assignStaff(){
        this.assign.emit({['staff']:this.assigned});
    }

    @Output() close = new EventEmitter<any>();
    cancel(){
        this.close.emit();
    }

}