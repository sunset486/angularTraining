import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignroles',
  templateUrl: './assignroles.component.html',
  styleUrls: ['./assignroles.component.css']
})
export class AssignRolesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getRolesList(){
    this.router.navigate(["/fetchedUsersWithRoles"])
  }
}
