import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {
  userRole?: string
  isAdminLoggedIn: boolean
  isVisitor: Boolean

  constructor(private authService: AuthService) {
    this.isVisitor = true
   }
  
  ngOnInit(): void {
    this.checkIfVisitor()

  }
  ngDoCheck(): void {
    this.checkUserRole()
    this.checkIfAdmin()
  }

  checkUserRole(){
    this.userRole = this.authService.getUserRole()
  }

  checkIfVisitor(){
    var userStatus = localStorage.getItem("isUserAuthenticated")
    console.log(userStatus)
    if (userStatus == "true"){
      console.log('false')
      return this.isVisitor = false
    }
    return this.isVisitor = true
  }

  checkIfAdmin(){
    if(this.userRole == "admin"){
      this.isAdminLoggedIn = true
    }
  }


}
