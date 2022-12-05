import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stuff } from './models/stuff';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'MiniImage'
  products: Stuff[] = []
  loggedUser : string
  isUserAuthenticated: boolean
  userRole: string
  userName: string

  constructor (private authService : AuthService, private router: Router){
    this.authService.authChanged
    .subscribe(res=>{
      this.isUserAuthenticated = res;
    })
  }

  ngOnInit(): void{
    
    if(this.authService.isUserLogged()){
      localStorage.setItem("isUserAuthenticated", String(this.authService.isUserAuthenticated))
      this.authService.sendAuthStateChangeNotification(true)
    }
  }

  ngDoCheck(): void {
    if(this.isUserAuthenticated == true){
      this.userRole = this.authService.getUserRole()
      this.userName = this.authService.getUsername()
    }else{
      this.userRole = ""
    }
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
