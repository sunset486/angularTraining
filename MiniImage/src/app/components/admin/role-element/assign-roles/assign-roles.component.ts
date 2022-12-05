import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleListResponse, UsernameListResponse } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.component.html',
  styleUrls: ['./assign-roles.component.css']
})
export class AssignRolesComponent implements OnInit {
  assignRoleForm: FormGroup
  userSelectList: string[]
  roleSelectList: string[]

  constructor(private authService: AuthService, private router: Router) { 
    this.assignRoleForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'role': new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.authService.getUsersOnly()
    .subscribe({
      next:(res) =>{
        this.userSelectList = res
        console.log(this.userSelectList)
      }
    })

    this.authService.getRolesOnly()
    .subscribe({
      next:(res: RoleListResponse) =>{
        this.roleSelectList = res.roles
      }
    })
  }

  returnToAdmin(){
    this.router.navigate(["/addRoles"])
  }

}
