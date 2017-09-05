import { Injectable } from '@angular/core';

export interface Schedule{
    $key?: string,
    timestamp: number
}

@Injectable()
export class ScheduleService{

}