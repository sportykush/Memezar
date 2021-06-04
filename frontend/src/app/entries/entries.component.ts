import { Component } from '@angular/core';

import { Hero } from '../hero';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent {

  cap = 'Really Catchy';
  
  model = new Hero(18, 'name', this.cap, 'URL');  
  submitted = false;

  onSubmit() { this.submitted = true; }


}
