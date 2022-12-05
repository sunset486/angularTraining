import { ɵparseCookieValue } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse, LoginModel } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  errorCheck: boolean
  errorMsg: string = ""

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }

  formValidation(validatedControl: string){
    return this.loginForm.get(validatedControl)?.invalid && this.loginForm.get(validatedControl)?.touched
  }

  validationError(validatedControl: string, errorName: string){
    return this.loginForm.get(validatedControl)?.hasError(errorName)
  }

  goToRegister(){
    this.router.navigate(["/register"])
  }

  submit(form: FormGroup) {
    this.errorCheck = false
    const user: LoginModel = {
      email: form.get('email')?.value,
      password: form.get('password')?.value
    }
    this.authService.login(user)
    .subscribe({
      next: (res: AuthResponse) => {
        localStorage.setItem("username", res.username)
        localStorage.setItem("token", res.token)
        localStorage.setItem("isUserAuthenticated", String(res.isUserAuthenticated))
        console.log(res.isUserAuthenticated)
        console.log(localStorage.getItem("isUserAuthenticated"))
        this.authService.sendAuthStateChangeNotification(res.isUserAuthenticated)
        this.authService.isUserAuthenticated = true
        this.router.navigate(["/"])
      },
      error: (err: HttpErrorResponse)=> {
        this.errorMsg = err.message
        console.log(err.message)
        this.errorCheck = true
        this.router.navigate(["/login"])
      }})
  }

  isLoading(){
    return this.authService.isLoading
  }
}

