import { ScheduleItem } from './../../../shared/services/schedule/schedule.service';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'schedule-section',
    styleUrls: ['schedule-section.component.scss'],
    template: `
        <div class="schedule-section">
            <div class="schedule-section__bar">
                <span>{{ name }}</span>
            </div>
            <div>
                <div class="schedule-section__task"
                    *ngIf="section.tasks; else assignTask">
                    <span>{{ section.tasks }}</span>
                </div>
                <ng-template #assignTask>
                    <div class="schedule-section__task">
                        Assign member
                    </div>
                </ng-template>
            </div>
        </div>
    `
})

export class ScheduleSectionComponent{
    constructor(){}

    @Input()
    section: ScheduleItem;

    @Input()
    name: string;
}