import { HttpClient} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, FetchUsersWithRolesResponse, LoginModel, RegisterModel, RegisterResponse, RoleModel, RoleResponse, UsernameListResponse, RoleListResponse} from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  private loginurl = "login"
  private registerurl = "register"
  private logouturl = "logout"

  private userroleurl = "get-users-with-roles"
  private usernamesonly = "get-all-users"
  private rolesonly = "get-all-roles"
  private addroleurl = "add-role"
  
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

  //#region LOGIN/REGISTRATION
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
  }
  //#endregion

  //#region 
  getUsersAndRolesList(): Observable<FetchUsersWithRolesResponse>{
    return this.http.get<FetchUsersWithRolesResponse>(`${environment.apiUrl}/${this.userroleurl}`, {responseType: "json"})
  }

  addNewRole(newRoleBody: RoleModel): Observable<any>{
    return this.http.post<RoleResponse>(`${environment.apiUrl}/${this.addroleurl}`, newRoleBody, {responseType: "json"})
  }

  getUsersOnly(){
    return this.http.get<UsernameListResponse>(`${environment.apiUrl}/${this.usernamesonly}`, {responseType: "json"})
  }

  getRolesOnly(){
    return this.http.get<RoleListResponse>(`${environment.apiUrl}/${this.rolesonly}`, {responseType: "json"})
  }

  //#region TOKEN FUNCTIONS
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
  //#endregion
}
