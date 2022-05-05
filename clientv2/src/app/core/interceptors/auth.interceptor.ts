import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private ahs: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.ahs.isLoggedIn) {
      const authorizedRequest = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.ahs.token}`,
        }),
      });
      return next.handle(authorizedRequest);
    } else {
      return next.handle(request);
    }
  }
}
