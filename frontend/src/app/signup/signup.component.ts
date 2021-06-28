import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SignupService } from '../signup.service';
import { MemeUser } from '../memeuser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  model = new MemeUser('', '', '');  
  error: any;
  constructor( private usersignup: SignupService,
    private router: Router  ) {  }

  saveUser(): void {
    const data = {
      name: this.model.name,
      email: this.model.email,
      password: this.model.password
    };
    console.log(this.model);
    this.usersignup.create(data)
      .subscribe(
        res =>{
          console.log(res);
          () => this.router.navigate(['/login']);
        },
        err => {
          console.log(err);
          this.error = err;
        });
  }

}
