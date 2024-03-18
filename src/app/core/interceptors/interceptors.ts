import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { KONSTANTE } from '../helpers/consts';

@Injectable()

export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('interceptor')
    console.log(req)
    console.log(btoa('Lorena'))

    this.loader.show();

    return next.handle(this.headers(req)).pipe(
      finalize(() => {
        this.loader.hide();
      }));
  }

  headers(req: HttpRequest<any>): HttpRequest<any> {
    const isLoggedIn: boolean = (sessionStorage.getItem(KONSTANTE.IS_LOGGED_IN) || 'false') === 'true';
    const userBase64 = btoa(sessionStorage.getItem(KONSTANTE.USER_LOGGED_IN) || '{}');
    const headers = {
      'Autorization': 'Bearer ' + userBase64
    };

    if (isLoggedIn) {
      return req.clone({
        setHeaders: headers
      });
    }
    else {
      return req;
    }
  }
}