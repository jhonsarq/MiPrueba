import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteroutletService {
    showLoader    = new Subject();
    hideLoader    = new Subject();
    showAlert     = new Subject();
    hideAlert     = new Subject();
    setUserId     = new Subject();
    setUserName   = new Subject();
    setStatus     = new Subject();
    setPriorities = new Subject();
    setTasks      = new Subject();
    getSettings   = new Subject();
    
    constructor() { }
}
