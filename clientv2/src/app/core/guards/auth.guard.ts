import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private ahs: AuthService,
    private ns: NotificationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.ahs.isLoggedIn) {
      this.ns.showNotification("error", "Hozzáférés megtagadva", 1000);
      this.router.navigate(['/auth/login']);
    }
    return this.ahs.isLoggedIn;
  }

}
