import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleModel } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rolemain',
  templateUrl: './role-main.component.html',
  styleUrls: ['./role-main.component.css']
})
export class RoleMainComponent implements OnInit {
  roleForm: FormGroup
  confirmFlag: boolean
  errorFlag: boolean

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.roleForm = new FormGroup({
      'name': new FormControl('', [Validators.required])
    })
    this.confirmFlag = false
    this.errorFlag = false
  }

  getRolesList(){
    this.router.navigate(["/fetchedUsersWithRoles"])
  }

  goToAssignRoles(){
    this.router.navigate(["/assignRoles"])
  }

  formValidation(validatedControl: string){
    return this.roleForm.get(validatedControl)?.invalid && this.roleForm.get(validatedControl)?.touched
  }

  validationError(validatedControl: string, errorName: string){
    return this.roleForm.get(validatedControl)?.hasError(errorName)
  }

  submit(form: FormGroup) {
    const role: RoleModel = {
      name: form.get('name')?.value
    }

    this.authService.addNewRole(role)
    .subscribe({
      next:(_)=>{
        this.router.navigate(["/addRoles"])
        this.confirmFlag = true
        setTimeout(()=>{
          this.confirmFlag = false
        }, 2000)
      },
      error: (err: HttpErrorResponse)=>{
        this.router.navigate(["/addRoles"])
        console.log(err.message)
        this.errorFlag = true
        setTimeout(()=>{
          this.errorFlag = false
        }, 2000)
      }
    })
  }
}
