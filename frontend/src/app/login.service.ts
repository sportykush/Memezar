import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8081/user/login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  
  create(data: any,value: any) {
    return this.http.post(baseUrl, data, {withCredentials: value});
  }
}
