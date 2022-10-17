import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stuff } from 'src/app/models/stuff';
import { StuffService } from 'src/app/services/stuff.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  stuffs: Stuff[];

  constructor(private stuffService: StuffService, private router: Router) { }

  ngOnInit(): void {
    this.stuffService.getStuff()
    .subscribe((result: Stuff[]) => (this.stuffs = result))
  }

  returnToAdmin(){
    this.router.navigate(["/addProducts"])
  }

}
