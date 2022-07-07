import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Ng2IzitoastService } from "ng2-izitoast";
import { catchError, concatMap, Observable, throwError } from "rxjs";
import { JwtDTO } from "../models/jwt-dto";
import { LoginService } from "../services/login.service";
import { TokenStorageService } from "../services/token-storage.service";

const AUTHORIZATION = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenStorageService: TokenStorageService,
    private loginService: LoginService,
    private router: Router,
    private iziToast: Ng2IzitoastService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.tokenStorageService.isLogged()) {
      return next.handle(req);
    }

    let intReq = req;
    const token = this.tokenStorageService.getToken();

    intReq = this.addToken(req, token);

    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        const dto: JwtDTO = new JwtDTO(this.tokenStorageService.getToken());
        return this.loginService.refresh(dto).pipe(concatMap((data: any) => {
          console.log('Actualizando token...');
          this.tokenStorageService.setToken(data.token);
          intReq = this.addToken(req, data.token);
          return next.handle(intReq);
        }));
      } else {
        this.tokenStorageService.logOut();
        this.iziToast.error({
          title: 'Sesión caducada',
          message: 'Vuelva a iniciar sesión',
          position: 'bottomRight'
        });
        this.tokenStorageService.isLoggedIn.next(false);
        this.router.navigate(['/']);
        return throwError(err.message);
      }
    }));
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
