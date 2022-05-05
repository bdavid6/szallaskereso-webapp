import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  get username(): AbstractControl {
    return this.loginForm.get('username') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password') as AbstractControl;
  }

  constructor(
    private fb: FormBuilder,
    private ahs: AuthService
  ) { }

  ngOnInit(): void {
  }

  async loginButton(): Promise<void> {
    if (!this.loginForm.valid) {
      return;
    }
    await this.ahs.login(this.loginForm.value);
  }

}
