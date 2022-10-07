import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlersService implements HttpInterceptor{

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = ''
        if(error.error instanceof ErrorEvent){
          errorMsg = 'Error: ${error.error.message}'
          console.log(errorMsg)
        }else{
          errorMsg = this.handleError(error)
          console.log(errorMsg)
        }
        return throwError(()=> new Error(errorMsg))
      })
    )
  }

  handleError(error: HttpErrorResponse){   
    switch(error.status){
      case 400:
        return this.handleBadRequest(error)
      case 401:
        return this.handleUnauthorized(error)
      case 403:
        return this.handleForbidden(error)
      case 404:
        return this.handleNotFound(error)
    }
  }

  handleForbidden(error: HttpErrorResponse){
    this.router.navigate(["/403"], {queryParams: {returnUrl: this.router.url}});
    return error.message
  }

  handleUnauthorized(error: HttpErrorResponse){
    if(this.router.url == "/login"){
      return "Authentication failed. Incorrect email/password"
    }
    else{
      this.router.navigate(['/login'])
      return error.message
    }
  }

  handleBadRequest(error: HttpErrorResponse){
    if(this.router.url == '/register'){
      let message = ''
      const values = Object.values(error.error.errors)
      values.map((m)=> {
        message += m+ '\n';
      })
      return message
    }
    else{
      this.router.navigate(["/register"])
      return error.error.message
    }
  }

  handleNotFound(error: HttpErrorResponse){
    this.router.navigate(["/404"]);
    return error
  }
}
