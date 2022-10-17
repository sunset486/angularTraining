import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryResponse } from 'src/app/interfaces/category-resource';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  categoryForm: FormGroup
  confirmFlag: boolean
  errorFlag: boolean

  constructor(private catService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      'name': new FormControl('', [Validators.required])
    })
    this.confirmFlag = false
    this.errorFlag = false
  }

  formValidation(validatedControl: string){
    return this.categoryForm.get(validatedControl)?.invalid && this.categoryForm.get(validatedControl)?.touched
  }

  validationError(validatedControl: string, errorName: string){
    return this.categoryForm.get(validatedControl)?.hasError(errorName)
  }
    
  submit(form: FormGroup) {
    const category: CategoryResponse = {
      name: form.get('name')?.value
    }

    this.catService.addCategory(category)
    .subscribe({
      next:(_)=>{
        this.router.navigate(["/addCategories"])
        this.confirmFlag = true
        setTimeout(()=>{
          this.confirmFlag = false
        }, 2000)
      },
      error: (err: HttpErrorResponse)=>{
        this.router.navigate(["/addCategories"])
        console.log(err.message)
        this.errorFlag = true
        setTimeout(()=>{
          this.errorFlag = false
        }, 2000)
      }
    })
  }
  
  getCats(){
    this.router.navigate(["/fetchedCategories"])
  }

}
