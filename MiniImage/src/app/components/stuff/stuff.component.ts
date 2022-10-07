import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Stuff } from 'src/app/models/stuff'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.css']
})
export class StuffComponent implements OnInit {

  @Input() stuff: Stuff = {} as Stuff
  isInCart: boolean = false;
  isUserAuthenticated: boolean
  constructor(private shoppingCartService : ShoppingCartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authChanged
    .subscribe(res=>{
      this.isUserAuthenticated = res;
    })
  }


  fillCart() {
    this.shoppingCartService.add(this.stuff)
    this.isInCart = true;
  }

  removeFromCart(){
    this.shoppingCartService.remove(this.stuff)
    this.isInCart = false;
  }
}
