import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductsComponent } from 'src/app/components/admin/addproducts/addproducts.component';
import { AddCategoriesComponent } from 'src/app/components/admin/addcategories/addcategories.component';
import { AssignRolesComponent } from 'src/app/components/admin/assignroles/assignroles.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddProductsComponent,
    AddCategoriesComponent,
    AssignRolesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
