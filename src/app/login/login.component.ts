import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteroutletService } from '../routeroutlet.service';
import { ApiService } from '../api.service';
import { HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    email = '';
    password = '';
    data: any;
  
    constructor(private cookieService: CookieService, private routeroutletService: RouteroutletService, private router: Router, private apiService: ApiService) { }

    ngOnInit(): void {

    }
    
    login() {
        if(this.email != '' && this.password != '') {
            this.routeroutletService.showLoader.next('');
            
            let body = new HttpParams();
            body = body.set('email', this.email);
            body = body.set('password', this.password);
            
            this.apiService.call('login', body).subscribe(result => {
                this.data = result;
                
                if(this.data.success) {
                    this.cookieService.set('userId', this.data.userId);
                    this.cookieService.set('userName', this.data.userName);
                    this.routeroutletService.setUserId.next(this.data.userId);
                    this.routeroutletService.setUserName.next(this.data.userName);
                    this.router.navigate(['/dashboard']);
                    
                    this.routeroutletService.getSettings.next('');
                } else {
                    this.routeroutletService.showAlert.next({message: this.data.message, type: 'danger'});
                }
                
                this.routeroutletService.hideLoader.next('');
            });
        } else {
            this.routeroutletService.showAlert.next({message: 'Todos los campos son requeridos', type: 'danger'});
        }
    }
}