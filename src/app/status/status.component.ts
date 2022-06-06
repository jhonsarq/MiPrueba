import { Component, OnInit } from '@angular/core';
import { RouteroutletService } from '../routeroutlet.service';
import { ParentrouteroutletService } from '../parentrouteroutlet.service';
import { ApiService } from '../api.service';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

declare var window: any;

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
    statusId   = '';
    statusName = '';
    status: any;
    data: any;
    statusModal: any;
    getStatusSubscription: Subscription;
    objectKeys = Object.keys;
    
    constructor(private routeroutletService: RouteroutletService, private apiService: ApiService, private parentRouteroutletService: ParentrouteroutletService) { 
        this.getStatusSubscription = this.parentRouteroutletService.sendStatus.subscribe($event => {
            this.getStatus($event);
        });
    }

    ngOnInit(): void {
        this.statusModal = new window.bootstrap.Modal(
            document.getElementById('statusModal')
        );
    }
    
    saveStatus() {
        if(this.statusName != '') {
            this.statusModal.hide();
            this.routeroutletService.showLoader.next('');
            
            let body = new HttpParams();
            body = body.set('name', this.statusName);
            
            if(this.statusId != '') {
                body = body.set('id', this.statusId);
            }
            
            this.apiService.call('save_status', body).subscribe(result => {
                this.data = result;
                
                if(this.data.success) {
                    this.routeroutletService.setStatus.next(this.data.status);
                    this.routeroutletService.showAlert.next({message: this.data.message, type: 'success'});
                } else {
                    this.routeroutletService.showAlert.next({message: this.data.message, type: 'danger'});
                }
                
                this.routeroutletService.hideLoader.next('');
                this.statusName = '';
                this.statusId   = '';
            });
        } else {
            this.routeroutletService.showAlert.next({message: 'Todos los campos son requeridos', type: 'danger'});
        }
    }
    
    getStatus(data: any) {
        this.status = data;
    }
    
    setCurrentStatus(id: string, name: string) {
        this.statusId = id;
        this.statusName = name;
        this.statusModal.show();
    }
}
