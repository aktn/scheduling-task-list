import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'schedule-days',
    styleUrls: ['schedule-days.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="schedule-days">
            <button type="submit" class="day" *ngFor="let day of days; index as i;" (click)="selectDay(i)">
                <span [class.active]="i === selected">{{ day }}</span>
            </button>
        </div>
    `
})

export class ScheduleDaysComponent{
    days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    @Input()
    selected: number;

    @Output()
    select = new EventEmitter<number>();

    selectDay(index: number){
        this.select.emit(index);
    }


}