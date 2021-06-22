import { Component, OnInit } from '@angular/core';
// import {Emitters} from '../emitters/emitters';


@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  authenticated = false;
  constructor() { }

  ngOnInit(): void {
    // Emitters.authEmitter.subscribe(
    //   (auth: boolean) => {
    //     this.authenticated = auth;
    //   }
    // );
  }
  logout(): void {
    // this.http.post('http://localhost:8081/user/login', {}, {withCredentials: true})
    //   .subscribe(() => this.authenticated = false);
  }
}
