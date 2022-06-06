import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { HttpParams } from '@angular/common/http';
import { RouteroutletService } from '../routeroutlet.service';
import { ParentrouteroutletService } from '../parentrouteroutlet.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common'

declare var window: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    getStatusSubscription: Subscription;
    getPrioritiesSubscription: Subscription;
    getUserSubscription: Subscription;
    getTasksSubscription: Subscription;
    objectKeys = Object.keys;
    status: any;
    priorities: any;
    users: any;
    tasks: any;
    data: any;
    taskModal: any;
    currentTask: any;
    taskId          = '';
    taskTitle       = '';
    taskDescription = '';
    startDate       = '';
    endDate         = '';
    taskStatus      = '';
    taskPriority    = '';
    taskUser        = '';
    fileUrl         = '';
    taskForm        = new FormGroup({
        fileControl: new FormControl()
    });
    
    constructor(public datepipe: DatePipe, private cookieService: CookieService, private routeroutletService: RouteroutletService, private apiService: ApiService, private parentRouteroutletService: ParentrouteroutletService) { 
        this.getStatusSubscription = this.parentRouteroutletService.sendStatus.subscribe($event => {
            this.getStatus($event);
        });
        
        this.getPrioritiesSubscription = this.parentRouteroutletService.sendPriorities.subscribe($event => {
            this.getPriorities($event);
        });
        
        this.getUserSubscription = this.parentRouteroutletService.sendUsers.subscribe($event => {
            this.getUsers($event);
        });
        
        this.getTasksSubscription = this.parentRouteroutletService.sendTasks.subscribe($event => {
            this.getTasks($event);
        });
    }

    ngOnInit(): void {
        this.taskModal = new window.bootstrap.Modal(
            document.getElementById('taskModal')
        );
    }
    
    saveTask() {
        this.taskModal.hide();
        this.routeroutletService.showLoader.next('');
        
        const currentUserId = this.cookieService.get('userId');
        const formData      = new FormData();
        
        if(this.taskForm.get('fileControl') !== null) {
            formData.append('file', this.taskForm.get('fileControl')!.value);
        }
        
        if(this.taskId != '') {
            formData.append('id', this.taskId);
        }
        
        const sd = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
        const ed = this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
        
        formData.append('title', this.taskTitle);
        formData.append('description', this.taskDescription);
        formData.append('start_date', sd!);
        formData.append('end_date', ed!);
        formData.append('status_id', this.taskStatus);
        formData.append('priority_id', this.taskPriority);
        formData.append('user_id', this.taskUser);
        formData.append('created_by', currentUserId);
        
        this.apiService.callWithMedia('save_task', formData).subscribe(result => {
            this.data = result;
            
            if(this.data.success) {
                this.routeroutletService.setTasks.next(this.data.tasks);
                this.routeroutletService.showAlert.next({message: this.data.message, type: 'success'});
            } else {
                this.routeroutletService.showAlert.next({message: this.data.message, type: 'danger'});
            }
                
            this.routeroutletService.hideLoader.next('');
            
            this.currentTask     = null;
            this.taskId          = '';
            this.taskTitle       = '';
            this.taskDescription = '';
            this.startDate       = '';
            this.endDate         = '';
            this.fileUrl         = '';
            this.taskStatus      = '';
            this.taskPriority    = '';
            this.taskUser        = '';
        });
    }
    
    onFileChange(event: any) {
        if(event.target.files.length > 0) {
            const file = event.target.files[0];
            
            this.taskForm.patchValue({fileControl: file});
        }
    }
    
    getStatus(data: any) {
        this.status = data;
    }
    
    getPriorities(data: any) {
        this.priorities = data;
    }
    
    getUsers(data: any) {
        this.users = data;
    }
    
    getTasks(data: any) {
        this.tasks = data;
    }
    
    setCurrentTask(thisTaskId: string, thisTask: any) {
        this.currentTask = thisTask;
        this.taskModal.show();
        
        if(thisTask != null) {
            this.taskId          = thisTaskId;
            this.taskTitle       = thisTask.title;
            this.taskDescription = thisTask.description;
            this.startDate       = thisTask.startDate;
            this.endDate         = thisTask.endDate;
            this.fileUrl         = thisTask.file;
            this.taskStatus      = thisTask.statusId;
            this.taskPriority    = thisTask.priorityId;
            this.taskUser        = thisTask.responsibleId;
        } else {
            this.taskId          = '';
            this.taskTitle       = '';
            this.taskDescription = '';
            this.startDate       = '';
            this.endDate         = '';
            this.fileUrl         = '';
            this.taskStatus      = '';
            this.taskPriority    = '';
            this.taskUser        = '';
        }
    }
}
