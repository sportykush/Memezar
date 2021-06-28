import { Component, OnInit } from '@angular/core';
import {Emitters} from '../emitter/emitters';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  authenticated = false;

  constructor(    private http: HttpClient) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
  }
  logout(): void {
    this.http.post('http://localhost:8081/user/logout', {}, {withCredentials: true})
      .subscribe(() => this.authenticated = false);
  }
}
