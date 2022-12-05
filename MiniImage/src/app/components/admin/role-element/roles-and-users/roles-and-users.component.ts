import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchUsersWithRolesResponse } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-roles-and-users',
  templateUrl: './roles-and-users.component.html',
  styleUrls: ['./roles-and-users.component.css']
})
export class RolesAndUsersComponent implements OnInit {
  usrnameList: string[]
  roleList: string[]

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUsersRoles()
  }

  getUsersRoles(){
    this.authService.getUsersAndRolesList()
    .subscribe({
      next: (res: FetchUsersWithRolesResponse) => {
        this.usrnameList = res.users
        this.roleList = res.userRoles
      }
    })
  }

  returnToAdmin(){
    this.router.navigate(["/addRoles"])
  }
}
