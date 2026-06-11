import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  darkMode = false;
  email = 'demo@zenjade.com';
  password = 'demo123';
  rememberMe = false;
  loading = false;
  error = '';
  
  // Expose icons to template
  readonly Moon = Moon;
  readonly Sun = Sun;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  handleLogin() {
    this.loading = true;
    this.error = '';
    
    this.apiService.login({ email: this.email, password: this.password, rememberMe: this.rememberMe }).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.authService.setUserInfo(response.user);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
