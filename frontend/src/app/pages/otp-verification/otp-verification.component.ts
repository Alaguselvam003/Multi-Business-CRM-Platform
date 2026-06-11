import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './otp-verification.component.html'
})
export class OtpVerificationComponent implements OnInit {
  darkMode = false;
  email = '';
  code = '';
  otpType: 'email' | 'sms' = 'email';
  
  loading = false;
  error = '';
  success = '';
  otpSent = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email = params['email'];
      }
    });
  }

  sendOtp() {
    this.loading = true;
    this.error = '';
    this.success = '';
    
    this.apiService.sendOtp({ email: this.email, type: this.otpType }).subscribe({
      next: (res) => {
        this.success = res.message || 'OTP Sent successfully!';
        this.otpSent = true;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to send OTP';
        this.loading = false;
      }
    });
  }

  verifyOtp() {
    this.loading = true;
    this.error = '';
    this.success = '';

    this.apiService.verifyOtp({ email: this.email, code: this.code, type: this.otpType }).subscribe({
      next: (res) => {
        this.success = res.message || 'OTP Verified! You can now login.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Invalid OTP';
        this.loading = false;
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
