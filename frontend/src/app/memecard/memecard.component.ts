import { Component, OnInit } from '@angular/core';
import { MemeServiceService } from '../meme-service.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-memecard',
  templateUrl: './memecard.component.html',
  styleUrls: ['./memecard.component.css']
})
export class MemecardComponent implements OnInit {


  ngOnInit(): void {
  }
  data = [];
  constructor (private meme: MemeServiceService) {
    this.meme.getAll().subscribe( data =>{
      console.log(data);
      this.data = data;
    })
  }
}
