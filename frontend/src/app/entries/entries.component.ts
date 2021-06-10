import { Component } from '@angular/core';
import { MemeServiceService } from '../meme-service.service'
import { Hero } from '../hero';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent {
  

  cap = 'Really Catchy';
  
  model = new Hero('name', this.cap, 'URL');  
  submitted = false;
  constructor(private meme: MemeServiceService) { }
  onSubmit() { this.submitted = true; }

  saveMeme(): void {
    const data = {
      name: this.model.name,
      caption: this.model.caption,
      url: this.model.url
    };

    this.meme.create(data)
      .subscribe(
        (        data: any) => {
          console.log(data);
          this.submitted = true;
        },
        (        err: any) => {
          console.log(err);
        });
  }

  // newTutorial(): void {
  //   this.submitted = false;
  //   this.model = {
  //     name: '',
  //     caption: '',
  //   };
  // }

}
