import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role, User } from '../interfaces/user';
import { NotificationService } from './notification.service';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends User {
  token: string;
  role: Role;
}

const UserStorageKey = 'user';
const TokenStorageKey = 'token';
const RoleStorageKey = 'role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null;

  get user(): User {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(
        sessionStorage.getItem(UserStorageKey) as string
      );
    }
    return this.currentUser as User;
  }

  get role(): Role {
    if (!this.currentRole) {
      this.currentRole = sessionStorage.getItem(RoleStorageKey) as Role;
    }
    return this.currentRole as Role;
  }

  private currentToken: string | null = null;

  private currentRole: Role | null = null;

  get token(): string {
    if (!this.currentToken) {
      this.currentToken = sessionStorage.getItem(TokenStorageKey) as string;
    }
    return this.currentToken as string;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get isAdmin(): boolean {
    return this.user.role === Role.ADMIN;
  }

  constructor(
    private http: HttpClient,
    private ns: NotificationService,
    private router: Router
  ) { }

  async login(loginRequest: LoginRequest): Promise<void> {
    const user = await this.http
      .post<LoginResponse>('/api/auth/login', loginRequest)
      .toPromise()
      .catch((error: any) => {

        if (error.status == 401) {
          console.log(error);
          this.ns.showNotification("error", "Sikertelen bejelentkezés", 1200);
          this.router.navigate(['auth/login']);
        }
      });
    this.setUser(user!);
  }

  async register(user: User): Promise<void> {
    await this.http
      .post<User>('/api/auth/register', user)
      .toPromise()
      .catch((error: any) => {

        if (error.status == 409) {
          console.log(error);
          this.ns.showNotification("error", "Foglalt felhasználónév", 1200);
          this.router.navigate(['auth/register']);
        } else if(error.status == 408) {
          console.log(error);
          this.ns.showNotification("error", "Már használt email cím", 1200);
          this.router.navigate(['auth/register']);
        } else {
          this.ns.showNotification("success", "Sikeres regisztráció", 1200);
          this.router.navigate(['auth/login']);
        }
      },
      );
  }

  logout(): void {
    this.setUser(null);
    localStorage.clear();
  }

  private setUser(user: LoginResponse | null): void {
    if (user) {
      sessionStorage.setItem(TokenStorageKey, user.token);
      sessionStorage.setItem(UserStorageKey, JSON.stringify(user));
      sessionStorage.setItem(RoleStorageKey, user.role);
      document.cookie = `${TokenStorageKey}=${user.token}`;
      document.cookie = `${UserStorageKey}=${JSON.stringify(user)}`;
      document.cookie = `${RoleStorageKey}=${user.role}`;

      this.ns.showNotification("success", "Sikeres bejelentkezés", 1200);
      this.router.navigate(['']);
    } else {
      sessionStorage.removeItem(TokenStorageKey);
      sessionStorage.removeItem(UserStorageKey);
      sessionStorage.removeItem(RoleStorageKey);
    }
    this.currentUser = user;
    this.currentToken = user?.token || null;
    this.currentRole = user?.role || null;
  }
}
