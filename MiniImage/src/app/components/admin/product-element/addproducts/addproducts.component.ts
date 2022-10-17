import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StuffResource } from 'src/app/interfaces/stuff-resource';
import { Stuff } from 'src/app/models/stuff';
import { StuffService } from 'src/app/services/stuff.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddProductsComponent implements OnInit {
  productForm: FormGroup
  findProductForm: FormGroup
  errorCheck: boolean
  errorMsg: string = ""

  constructor(private stuffService: StuffService, private router: Router) { 
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'price': new FormControl('', [Validators.required]),
      'categoryId': new FormControl('', [Validators.required]),
      'imagesource': new FormControl('', [Validators.required])
    })
    this.findProductForm = new FormGroup({
      'id': new FormControl('', [Validators.required])
    })
  }

  formValidation(validatedControl: string){
    return this.productForm.get(validatedControl)?.invalid && this.productForm.get(validatedControl)?.touched
  }

  validationError(validatedControl: string, errorName: string){
    return this.productForm.get(validatedControl)?.hasError(errorName)
  }
  
  goToList(){
    this.router.navigate(["/fetchedList"])
  }

  submit(form: FormGroup){
    this.errorCheck = false
    const product: StuffResource = {
      name: form.get('name')?.value,
      price: form.get('price')?.value,
      categoryId: form.get('categoryId')?.value,
      imgSource: form.get('imagesource')?.value
    }
    this.stuffService.addStuff(product)
    .subscribe({
      next: (_) => {
        this.router.navigate(["/addProducts"])
      },
      error: (err: HttpErrorResponse)=> {
        this.errorMsg = err.message
        this.errorCheck = true
        console.log(this.errorMsg)
        this.router.navigate(["/addProducts"])
      }})
  }

  submitFind(form: FormGroup){
    const id = form.get("id")?.value
    this.stuffService.getOneStuff(id)
    .subscribe({
      next: (res: Stuff) => {
        this.router.navigate(["/addProducts"])
        console.log(res)
      },
      error: (err: HttpErrorResponse)=> {
        this.errorMsg = err.message
        this.errorCheck = true
        console.log(this.errorMsg)
        this.router.navigate(["/addProducts"])
      }})

  }
}
