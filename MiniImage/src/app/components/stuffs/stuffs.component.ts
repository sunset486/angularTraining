import { Component, Input, OnInit, Output } from '@angular/core';
import { StuffService } from 'src/app/services/stuff.service';
import { Stuff } from 'src/app/models/stuff';

@Component({
  selector: 'app-stuffs',
  templateUrl: './stuffs.component.html',
  styleUrls: ['./stuffs.component.css']
})
export class StuffsComponent implements OnInit {
  stuffs: Stuff[] = []; 
  isShowingList: boolean;
  
  constructor(private stuffService: StuffService) { 
    this.isShowingList = false;
  }

  ngOnInit(): void {
    this.stuffService.getStuff()
    .subscribe((result: Stuff[]) => (this.stuffs = result))
  }
}
