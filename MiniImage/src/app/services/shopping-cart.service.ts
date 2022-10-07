import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { Stuff } from '../models/stuff';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  @Input() shoppingCart: Stuff[] = []
  @Output() stuffEmitter = new EventEmitter<Stuff>()

  constructor() { }

  add(stuff:Stuff){
    this.shoppingCart.push(stuff)
    console.log(stuff)
  }

  get(){
    return this.shoppingCart
  }

  remove(stuff:Stuff){
    this.shoppingCart = this.shoppingCart.filter(s => s != stuff)
    console.log("removed item from cart")
  }
}
