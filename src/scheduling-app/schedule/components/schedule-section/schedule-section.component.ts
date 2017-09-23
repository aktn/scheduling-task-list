import { ScheduleItem } from './../../../shared/services/schedule/schedule.service';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'schedule-section',
    styleUrls: ['schedule-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="schedule-section">
            <div class="schedule-section__bar">
                <span>{{ name }}</span>
            </div>
            <div>
                <div class="schedule-section__task" *ngIf="section.section; else assignTask">
                    <span>{{ section.staff | join}}</span>
                </div>
                <ng-template #assignTask>
                    <div class="schedule-section__task" (click)="onSelect()">
                        Assign member
                    </div>
                </ng-template>
            </div>
        </div>
    `
})

export class ScheduleSectionComponent{
    constructor(){}

    @Input() section: ScheduleItem;

    @Input() name: string;

    @Output() select = new EventEmitter<any>();

    onSelect(assigned: string[] = []){
        const data = this.section;
        this.select.emit({
            assigned, data
        });
    }
}