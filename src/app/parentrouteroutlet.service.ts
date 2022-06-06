import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentrouteroutletService {
    sendStatus     = new Subject();
    sendPriorities = new Subject();
    sendUsers      = new Subject();
    sendTasks      = new Subject();
    
    constructor() { }
}
