import { Component, OnInit } from '@angular/core';
import { MemeServiceService } from '../meme-service.service';
import {Emitters} from '../emitter/emitters';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-memecard',
  templateUrl: './memecard.component.html',
  styleUrls: ['./memecard.component.css']
})
export class MemecardComponent implements OnInit {
  message = '';
  authenticated = false;
  name = '';
  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
    this.http.get('http://localhost:8081/user/me', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.name}`;
        Emitters.authEmitter.emit(true);
      },
      (err: any) => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
  }
  data = [];
  constructor (private http: HttpClient,private meme: MemeServiceService) {
    this.meme.getAll().subscribe( data =>{
      console.log(data);
      this.data = data.reverse();
    })
  }
}
