import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: LoginService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe({
        next: (res:any) => {
          console.log('Login successful:', res);

          // Save token to localStorage or service if needed
          localStorage.setItem('adminToken', res.data.token);

          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        }
      });
    }
  }
}