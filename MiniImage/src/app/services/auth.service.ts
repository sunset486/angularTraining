import { HttpClient, HttpHeaders} from '@angular/common/http';
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
  private userroleurl = "get-users-with-roles"
  
  private authChangeSub = new Subject<boolean>()
  authChanged = this.authChangeSub.asObservable()

  isLoading: boolean
  isUserAuthenticated: boolean
  passwordCheck: boolean
  username: string
  

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { 
    this.isLoading = false
    this.passwordCheck = true
    this.isUserAuthenticated = false
  }
  ngOnInit(): void {
  }

  sendAuthStateChangeNotification(isLoggedIn: boolean){
      this.authChangeSub.next(isLoggedIn)
  }

  login(loginBody: LoginModel){
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/${this.loginurl}`,
      loginBody,
      {responseType: 'json'})
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
    this.isUserAuthenticated = false
    localStorage.setItem("isUserAuthenticated", "false")
    sessionStorage.setItem("isUserAuthenticated", "false")
  }

  getUsersAndRolesList(){
    return this.http.get(`${environment.apiUrl}/${this.userroleurl}`, {responseType: 'json'})
  }

  isUserLogged(){
    const token = localStorage.getItem("token")
    return token && !this.jwtHelper.isTokenExpired(token)
  }

  getUserRole(){
    const token = localStorage.getItem("token")!
    const decodedToken = this.jwtHelper.decodeToken(token)
    if(decodedToken == null){
      return "Not logged in"
    }
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return role
  }
  
  getUsername(){
    const token = localStorage.getItem("token")!
    const decodedToken = this.jwtHelper.decodeToken(token)
    if(decodedToken == null){
      return "Not logged in"
    }
    const name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    return name
  }
}
