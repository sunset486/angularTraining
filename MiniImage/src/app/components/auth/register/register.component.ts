import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  errorCheck: boolean
  errorMsg: string = ""

  constructor(private authService: AuthService, private router: Router) { 
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }

  formValidation(validatedControl: string){
    return this.registerForm.get(validatedControl)?.invalid && this.registerForm.get(validatedControl)?.touched
  }

  validationError(validatedControl: string, errorName: string){
    return this.registerForm.get(validatedControl)?.hasError(errorName)
  }

  submit(form: FormGroup){
    this.errorCheck = false
    const user: RegisterModel = {
      username: form.get('username')?.value,
      email: form.get('email')?.value,
      password: form.get('password')?.value
    }
    this.authService.register(user)
    .subscribe({
      next: (_) => {
        this.router.navigate(["/login"])
      },
      error: (err: HttpErrorResponse)=> {
        this.errorMsg = err.message
        this.errorCheck = true
        console.log(this.errorMsg)
        this.router.navigate(["/register"])
      }})
  }

  isLoading(){
    return this.authService.isLoading
  }
}
