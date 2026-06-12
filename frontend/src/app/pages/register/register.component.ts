import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  darkMode = false;
  registerType: 'company' | 'employee' = 'company';
  
  // Form Fields
  name = '';
  companyName = '';
  email = '';
  password = '';
  department = '';
  role = 'Employee';

  loading = false;
  error = '';
  success = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  handleRegister() {
    this.loading = true;
    this.error = '';
    this.success = '';
    
    if (this.registerType === 'company') {
      const payload = { name: this.name, companyName: this.companyName, email: this.email, password: this.password };
      this.apiService.registerCompany(payload).subscribe({
        next: (res) => {
          this.success = 'Registration successful! Proceeding to OTP verification...';
          setTimeout(() => this.router.navigate(['/otp-verification'], { queryParams: { email: this.email } }), 1500);
        },
        error: (err) => {
          if (err.error?.errors && err.error.errors.length > 0) {
            this.error = err.error.errors.map((e: any) => `${e.path}: ${e.msg}`).join(', ');
          } else {
            this.error = err.error?.message || 'Registration failed';
          }
          this.loading = false;
        }
      });
    } else {
      const payload = { name: this.name, email: this.email, password: this.password, department: this.department, role: this.role };
      this.apiService.registerEmployee(payload).subscribe({
        next: (res) => {
          this.success = 'Employee account created! Proceeding to OTP verification...';
          setTimeout(() => this.router.navigate(['/otp-verification'], { queryParams: { email: this.email } }), 1500);
        },
        error: (err) => {
          if (err.error?.errors && err.error.errors.length > 0) {
            this.error = err.error.errors.map((e: any) => `${e.path}: ${e.msg}`).join(', ');
          } else {
            this.error = err.error?.message || 'Registration failed';
          }
          this.loading = false;
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
