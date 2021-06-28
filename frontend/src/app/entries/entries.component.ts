import { Component, OnInit } from '@angular/core';
import { MemeServiceService } from '../meme-service.service'
import { Hero } from '../hero';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Emitters} from '../emitter/emitters';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
  
  message = '';
  cap = 'Really Catchy';
  name = '';
  authenticated = false;
  submitted = false;
  constructor(private meme: MemeServiceService,
    private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
    this.http.get('http://localhost:8081/user/me', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.name}`;
        this.name = res.name;
        Emitters.authEmitter.emit(true);
      },
      (err: any) => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
  }
  model = new Hero(this.name, this.cap, 'URL');
  saveMeme(): void {
    const data = {
      name: this.name,
      caption: this.model.caption,
      url: this.model.url
    };

    this.meme.create(data)
    .subscribe(() => this.router.navigate(['/meme']));
  }


}
