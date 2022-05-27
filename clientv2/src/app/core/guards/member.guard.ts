import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate {
  constructor(
    private ahs: AuthService,
    private ns: NotificationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.ahs.isAdmin) {
      this.ns.showNotification("error", "Hozzáférés megtagadva", 1000);
      this.router.navigate(['']);
    }
    return !this.ahs.isAdmin;
  }
}
