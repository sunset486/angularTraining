import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StuffResource } from 'src/app/interfaces/stuff-resource';
import { Category } from 'src/app/models/category';
import { Stuff } from 'src/app/models/stuff';
import { CategoryService } from 'src/app/services/category.service';
import { StuffService } from 'src/app/services/stuff.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  updateProductForm: FormGroup
  stuffs: Stuff[]
  cats: Category[]

  constructor(private stuffService: StuffService, private catService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.updateProductForm = new FormGroup({
      'id': new FormControl('', [Validators.required]),
      'name': new FormControl('', [Validators.required]),
      'price': new FormControl('', [Validators.required]),
      'categoryId': new FormControl('', [Validators.required]),
      'imagesource': new FormControl('', [Validators.required])
    })
    this.stuffService.getStuff()
    .subscribe((result: Stuff[]) => (this.stuffs = result))
    this.catService.getCategories()
    .subscribe((result: Category[]) => (this.cats = result))
  }

  formValidation(validatedControl: string){
    return this.updateProductForm.get(validatedControl)?.invalid && this.updateProductForm.get(validatedControl)?.touched
  }

  validationError(validatedControl: string, errorName: string){
    return this.updateProductForm.get(validatedControl)?.hasError(errorName)
  }

  backToProducts(){
    this.router.navigate(["/addProducts"])
  }

  submit(form: FormGroup){
    const product: StuffResource = {
      name: form.get('name')?.value,
      price: form.get('price')?.value,
      categoryId: form.get('categoryId')?.value,
      imgSource: form.get('imagesource')?.value
    }
    const productId = form.get('id')?.value

    this.stuffService.updateStuff(productId, product)
    .subscribe({
      next: (_) => {
        this.router.navigate(["/updateProduct"])
      },
      error: (err: HttpErrorResponse)=> {
        console.log(err.message)
        this.router.navigate(["/updateProduct"])
      }})
  }

}
