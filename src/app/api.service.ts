import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }
    
    call(method: string, body: HttpParams) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type':  'application/x-www-form-urlencoded'
            })
        };

        return this.http.post('https://purple-valley.com/miprueba_api/' + method + '.php', body, options)
    }
    
    callWithMedia(method: string, body: FormData) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type':  'application/x-www-form-urlencoded'
            })
        };

        return this.http.post('https://purple-valley.com/miprueba_api/' + method + '.php', body)
    }
}
