import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginUser } from '../loginuser';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  

  model = new LoginUser('', '');  
  error: any;
  constructor( private userlogin: LoginService,
    private router: Router ) {  }

  authUser(): void {
    const data = {
      email: this.model.email,
      password: this.model.password
    };
    console.log(this.model);
    this.userlogin.create(data,true)
      .subscribe(
        res =>{
          console.log(res);
          () => this.router.navigate(['/meme']);
        },
        err => {
          console.log(err);
          this.error = err;
        });
  }

  ngOnInit(): void {
  }

}
