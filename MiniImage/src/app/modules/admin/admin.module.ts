import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductsComponent } from 'src/app/components/admin/product-element/add-products/add-products.component';
import { AddCategoriesComponent } from 'src/app/components/admin/category-element/add-categories/add-categories.component';
import { RoleMainComponent } from 'src/app/components/admin/role-element/role-main/role-main.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from 'src/app/components/admin/category-element/category/category.component';
import { CategoryService } from 'src/app/services/category.service';
import { CategoriesComponent } from 'src/app/components/admin/category-element/categories/categories.component';
import { StuffService } from 'src/app/services/stuff.service';



@NgModule({
  declarations: [
    AddProductsComponent,
    AddCategoriesComponent,
    CategoriesComponent,
    CategoryComponent,
    RoleMainComponent
  ],
  providers:[
    StuffService,
    CategoryService
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
