import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntriesComponent} from './entries/entries.component';
import {LoginComponent} from './login/login.component';
import { MemecardComponent } from './memecard/memecard.component';
import {SignupComponent} from './signup/signup.component';


const routes: Routes = [
  {path:'',redirectTo:'/meme',pathMatch:'full'},
  {path: 'post', component: EntriesComponent},
  {path: 'meme', component: MemecardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
