import { Component, OnInit } from '@angular/core';
import { RouteroutletService } from '../routeroutlet.service';
import { ParentrouteroutletService } from '../parentrouteroutlet.service';
import { ApiService } from '../api.service';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

declare var window: any;

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {
    priorityId   = '';
    priorityName = '';
    priorities: any;
    data: any;
    priorityModal: any;
    getPrioritiesSubscription: Subscription;
    objectKeys = Object.keys;
    
    constructor(private routeroutletService: RouteroutletService, private apiService: ApiService, private parentRouteroutletService: ParentrouteroutletService) {
        this.getPrioritiesSubscription = this.parentRouteroutletService.sendPriorities.subscribe($event => {
            this.getPriorities($event);
        });
    }

    ngOnInit(): void {
        this.priorityModal = new window.bootstrap.Modal(
            document.getElementById('prioritiesModal')
        );
    }
    
    savePriority() {
        if(this.priorityName != '') {
            this.priorityModal.hide();
            this.routeroutletService.showLoader.next('');
            
            let body = new HttpParams();
            body = body.set('name', this.priorityName);
            
            if(this.priorityId != '') {
                body = body.set('id', this.priorityId);
            }
            
            this.apiService.call('save_priority', body).subscribe(result => {
                this.data = result;
                
                if(this.data.success) {
                    this.routeroutletService.setPriorities.next(this.data.priorities);
                    this.routeroutletService.showAlert.next({message: this.data.message, type: 'success'});
                } else {
                    this.routeroutletService.showAlert.next({message: this.data.message, type: 'danger'});
                }
                
                this.routeroutletService.hideLoader.next('');
                this.priorityName = '';
                this.priorityId   = '';
            });
        } else {
            this.routeroutletService.showAlert.next({message: 'Todos los campos son requeridos', type: 'danger'});
        }
    }
    
    getPriorities(data: any) {
        this.priorities = data;
    }
    
    setCurrentPriority(id: string, name: string) {
        this.priorityId = id;
        this.priorityName = name;
        this.priorityModal.show();
    }
}
