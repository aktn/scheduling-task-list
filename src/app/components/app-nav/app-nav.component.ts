import { Component , ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['app-nav.component.scss'],
    template: `
        <div class="app-nav">
            <div class="wrapper">
                <a routerLink="tasks" routerLinkActive="active">Tasks</a>
                <a routerLink="schedule" routerLinkActive="active">Assign</a>
                <a routerLink="members" routerLinkActive="active">Members</a>
            </div>
        </div>
    `
})

export class AppNavComponent{
    constructor(){}
}