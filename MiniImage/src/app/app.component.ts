import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stuff } from './models/stuff';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MiniImage'
  products: Stuff[] = []
  loggedUser : string
  isUserAuthenticated: boolean

  constructor (private authService : AuthService, private router: Router){ }

  ngOnInit(): void{
    this.authService.authChanged
    .subscribe(res=>{
      this.isUserAuthenticated = res;
    })
  }


  isUserAdmin(){

  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
