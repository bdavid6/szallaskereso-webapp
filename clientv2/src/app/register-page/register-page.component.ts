import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    username: [null, [Validators.required, Validators.minLength(5)]],
    password: [null, [Validators.required, Validators.minLength(5)]],
    name: [null, Validators.required],
    e_mail: [null, Validators.required],
  });

  get username(): AbstractControl {
    return this.registerForm.get('username') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.registerForm.get('password') as AbstractControl;
  }

  get name(): AbstractControl {
    return this.registerForm.get('name') as AbstractControl;
  }

  get e_mail(): AbstractControl {
    return this.registerForm.get('e_mail') as AbstractControl;
  }

  constructor(
    private fb: FormBuilder,
    private ahs: AuthService
  ) { }

  ngOnInit(): void {
  }

  async registerButton(formDirective: FormGroupDirective): Promise<void> {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      await this.ahs.register(this.registerForm.value);
      
      //clear
      //formDirective.resetForm();
      //this.registerForm.reset();

    } else {
      return;
    }
  }
}
