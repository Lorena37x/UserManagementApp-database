import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { KONSTANTE } from '../helpers/consts';
import { Buffer } from "buffer";

@Injectable()

export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loader.show();

    return next.handle(this.headers(req)).pipe(
      finalize(() => {
        this.loader.hide();
      }));
  }

  headers(req: HttpRequest<any>): HttpRequest<any> {
    
    const isLoggedIn: boolean = (sessionStorage.getItem(KONSTANTE.IS_LOGGED_IN) || 'false') === 'true';
    const authUser: string = sessionStorage.getItem(KONSTANTE.USER_LOGGED_IN) || '{}';
    const userBase64 = Buffer.from(authUser).toString('base64');
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