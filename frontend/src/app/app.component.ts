import { Component } from '@angular/core';
import { MemeServiceService } from './meme-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memezar';
  data = [];
  constructor (private meme: MemeServiceService) {
    this.meme.getAll().subscribe( data =>{
      console.log(data);
      this.data = data;
    })
  }
}