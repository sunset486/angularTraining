import { HttpClient} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, LoginModel, RegisterModel, RegisterResponse} from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  private loginurl = "login"
  private registerurl = "register"
  private logouturl = "logout"
  
  private authChangeSub = new Subject<boolean>()
  authChanged = this.authChangeSub.asObservable()
  isUserAuthenticated: boolean

  isLoading: boolean
  passwordCheck: boolean
  username: string
  

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { 
    this.isUserAuthenticated = false
    this.isLoading = false
    this.passwordCheck = true
  }
  ngOnInit(): void {
  }

  sendAuthStateChangeNotification(isLoggedIn: boolean){
      this.authChangeSub.next(isLoggedIn)
  }

  login(loginBody: LoginModel){
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/${this.loginurl}`,
      loginBody)
  }

  register(registerBody: RegisterModel) {
    return this.http.post<RegisterResponse>(
      `${environment.apiUrl}/${this.registerurl}`,
      registerBody)
  }

  logout(){
    this.http.post(`${environment.apiUrl}/${this.logouturl}`, {}, {responseType: 'text'})
    localStorage.clear()
    this.sendAuthStateChangeNotification(false)
    
  }

  isUserLogged(){
    const token = localStorage.getItem("token")
    return token && !this.jwtHelper.isTokenExpired(token)
  }

  isUserAdmin(){
    const token = localStorage.getItem("token")!
    const decodedToken = this.jwtHelper.decodeToken(token)
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    if(role == "admin")
      return role
  }  
}
