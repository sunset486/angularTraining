import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './components/admin/addcategories/addcategories.component';
import { AddProductsComponent } from './components/admin/addproducts/addproducts.component';
import { AssignRolesComponent } from './components/admin/assignroles/assignroles.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BadRequestComponent } from './components/errors/bad-request/bad-request.component';
import { ForbiddenComponent } from './components/errors/forbidden/forbidden.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { UnauthorizedComponent } from './components/errors/unauthorized/unauthorized.component';
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'shoppingCart', component:ShoppingCartComponent, canActivate: [AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'addProducts', component:AddProductsComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'addCategories', component:AddCategoriesComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'assignRoles', component:AssignRolesComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: '403', component:ForbiddenComponent},
  {path: '401', component:UnauthorizedComponent},
  {path: '400', component:BadRequestComponent},
  {path: '404', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
