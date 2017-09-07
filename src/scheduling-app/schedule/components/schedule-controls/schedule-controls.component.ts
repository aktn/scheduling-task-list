import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'schedule-controls',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['schedule-controls.component.scss'],
    template: `
        <div class="schedule-controls">
            <button type="button" (click)="moveDate(offset - 1)"><img src="/img/chevron-left.svg"></button>
            <p>{{ selected | date : 'yMMMMd' }}</p>
            <button type="button" (click)="moveDate(offset + 1)"><img src="/img/chevron-right.svg"></button>
        </div>
    `
})

export class ScheduleControlsComponent{
    @Input()
    selected: Date;

    @Output()
    move = new EventEmitter<number>();

    offset = 0;

    constructor(){}

    moveDate(offset: number){
        this.offset = offset;
        this.move.emit(offset);
    }

}