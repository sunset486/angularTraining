import { Component, Input, OnInit } from '@angular/core';
import { Stuff } from 'src/app/models/stuff';

@Component({
  selector: 'app-stuffs-admin',
  templateUrl: './stuffs-admin.component.html',
  styleUrls: ['./stuffs-admin.component.css']
})
export class StuffsAdminComponent implements OnInit {
  @Input() stuff: Stuff = {} as Stuff
  constructor() { }

  ngOnInit(): void {
    
  }

}
