import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';

import { AuthService } from '../../services/auth-service/auth.service';
import { StorageService } from '../../services/storage-service/storage.service';

import { TokenResponse } from '../../models/auth/tokenResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  passwordVisible: boolean = false;
  errorMessage: string = '';

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  submitForm() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    this.authService.login(this.form.value).subscribe({
      next: (response: TokenResponse) => {
        this.storageService.set('token', response.token);
        window.location.href = '/customer-search';
      },
      error:(err) => {
        this.errorMessage = "Wrong username or password. Please try again!"
        this.form.reset();
      }
    });
  }
}
