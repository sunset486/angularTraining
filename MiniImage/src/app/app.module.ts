import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StuffService } from './services/stuff.service';
import { StuffsModule } from './modules/stuffs/stuffs.module';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AuthModule } from './modules/auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AdminModule } from './modules/admin/admin.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ErrorHandlersService } from './services/validators_and_handlers/error-handlers.service';
import { ForbiddenComponent } from './components/errors/forbidden/forbidden.component';
import { UnauthorizedComponent } from './components/errors/unauthorized/unauthorized.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { BadRequestComponent } from './components/errors/bad-request/bad-request.component';
import { AdminWelcomeComponent } from './components/admin/admin-welcome/admin-welcome.component';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/admin/product-element/product-list/product-list.component';
import { StuffsAdminComponent } from './components/admin/product-element/stuffs-admin/stuffs-admin.component';
import { RolesAndUsersComponent } from './components/admin/role-element/roles-and-users/roles-and-users.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateProductComponent } from './components/admin/product-element/update-product/update-product.component';
import { AssignRolesComponent } from './components/admin/role-element/assign-roles/assign-roles.component';

export function retrieveToken(){
  return localStorage.getItem("token")
}

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    ForbiddenComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    BadRequestComponent,
    AdminWelcomeComponent,
    HomeComponent,
    ProductListComponent,
    StuffsAdminComponent,
    RolesAndUsersComponent,
    UpdateProductComponent,
    AssignRolesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StuffsModule,
    AuthModule,
    AdminModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: retrieveToken,
        allowedDomains: ["localhost:7020"],
        disallowedRoutes: []
      }
    }),
    NoopAnimationsModule
  ],
  providers: [StuffService, 
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlersService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
