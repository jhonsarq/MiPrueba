import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { RouteroutletService } from './routeroutlet.service';
import { faTh, faSignOutAlt, faArrowsUpDown, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { ParentrouteroutletService } from './parentrouteroutlet.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    faTh = faTh;
    faSignOutAlt = faSignOutAlt;
    faArrowsUpDown = faArrowsUpDown;
    faExclamation = faExclamation;
    showLoaderSubscription: Subscription;
    hideLoaderSubscription: Subscription;
    showAlertSubscription: Subscription;
    hideAlertSubscription: Subscription;
    setUserNameSubscription: Subscription;
    setUserIdSubscription: Subscription;
    setStatusSubscription: Subscription;
    setPrioritiesSubscription: Subscription;
    setTasksSubscription: Subscription;
    getSettingsSubscription: Subscription;
    loaderVisibility: boolean = false;
    alertVisibility: boolean = false;
    alertMessage: string = '';
    alertType: string = '';
    userName: string = '';
    userId: string = '';
    sectionId: string = '';
    status: any;
    priorities: any;
    tasks: any;
    users: any;
    data: any;
    
    constructor(private parentRouteroutletService: ParentrouteroutletService, private cookieService: CookieService, private router: Router, private location: Location, private routeroutletService: RouteroutletService, private apiService: ApiService) {
        this.showLoaderSubscription = this.routeroutletService.showLoader.subscribe($event => {
            this.loaderShow()
        });
        
        this.hideLoaderSubscription = this.routeroutletService.hideLoader.subscribe($event => {
            this.loaderHide()
        });
        
        this.showAlertSubscription = this.routeroutletService.showAlert.subscribe($event => {
            this.alertShow($event);
        });
        
        this.hideAlertSubscription = this.routeroutletService.hideAlert.subscribe($event => {
            this.alertHide();
        });
        
        this.setUserNameSubscription = this.routeroutletService.setUserName.subscribe($event => {
            this.userNameSet($event);
        });
        
        this.setUserIdSubscription = this.routeroutletService.setUserId.subscribe($event => {
            this.userIdSet($event);
        });
        
        this.setStatusSubscription = this.routeroutletService.setStatus.subscribe($event => {
            this.statusSet($event);
        });
        
        this.setPrioritiesSubscription = this.routeroutletService.setPriorities.subscribe($event => {
            this.prioritiesSet($event);
        });
        
        this.setTasksSubscription = this.routeroutletService.setTasks.subscribe($event => {
            this.tasksSet($event);
        });
        
        this.getSettingsSubscription = this.routeroutletService.getSettings.subscribe($event => {
            this.loadSettings();
        })
        
        this.router.events.subscribe((event: any) => {
            if(typeof event.url !== 'undefined') {
                this.sectionId = event.url.replace('/','');
                
                switch(this.sectionId) {
                    case 'status':
                        this.parentRouteroutletService.sendStatus.next(this.status);
                    break;
                    case 'priorities':
                        this.parentRouteroutletService.sendPriorities.next(this.priorities);
                    break;
                    case 'dashboard':
                        this.parentRouteroutletService.sendStatus.next(this.status);
                        this.parentRouteroutletService.sendPriorities.next(this.priorities);
                        this.parentRouteroutletService.sendUsers.next(this.users);
                        this.parentRouteroutletService.sendTasks.next(this.tasks);
                    break;
                }
            }
        })
    }
    
    ngOnInit() {
        const userIdExists = this.cookieService.check('userId');
        const location = this.location.path();
        
        if(location !== '') {
            this.sectionId = location.replace('/','');
        }
        
        if(userIdExists) {
            if(location === '') {
                this.router.navigate(['/dashboard']);
            }
            
            if(this.userId == '') {
                this.userId   = this.cookieService.get('userId');
                this.userName = this.cookieService.get('userName');
                
                this.loadSettings();
            }
        } else {
            this.router.navigate(['/login']);
        }
    }
    
    ngOnDestroy() {
        this.showLoaderSubscription.unsubscribe();
        this.hideLoaderSubscription.unsubscribe();
        this.showAlertSubscription.unsubscribe();
    }
    
    loaderShow() {
        this.loaderVisibility = true;
    }
    
    loaderHide() {
        this.loaderVisibility = false;
    }
    
    alertShow(data: any) {
        this.alertMessage = data.message;
        this.alertType = data.type;
        this.alertVisibility = true;
    }
    
    alertHide() {
        this.alertVisibility = false;
    }
    
    userNameSet(name: any) {
        this.userName = name;
    }
    
    userIdSet(id: any) {
        this.userId = id;
    }
    
    statusSet(data: any) {
        this.status = data;
        this.parentRouteroutletService.sendStatus.next(this.status);
    }
    
    prioritiesSet(data: any) {
        this.priorities = data;
        this.parentRouteroutletService.sendPriorities.next(this.priorities);
    }
    
    tasksSet(data: any) {
        this.tasks = data;
        this.parentRouteroutletService.sendTasks.next(this.tasks);
    }
    
    logout() {
        this.cookieService.delete('userId');
        this.cookieService.delete('userName');
        this.userName = '';
        this.userId   = '';
        this.router.navigate(['/login']);
    }
    
    loadSettings() {
        this.loaderShow() 
            
        let body = new HttpParams();
        body = body.set('user_id', this.userId);

        this.apiService.call('get_settings', body).subscribe(result => {
            this.data = result;

            this.statusSet(this.data.status);
            this.prioritiesSet(this.data.priorities);
            this.tasksSet(this.data.tasks);
            
            this.users = this.data.users;
            
            this.parentRouteroutletService.sendUsers.next(this.users);

            this.loaderHide() 
        });
    }
}
