import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  user: any = {};
  name: string = '';
  saved = false;

  constructor(private authService: AuthService, public themeService: ThemeService) {}

  ngOnInit() {
    this.user = this.authService.getUserInfo() || {};
    this.name = this.user.name || '';
  }

  save() {
    this.authService.setUserInfo({ ...this.user, name: this.name });
    this.saved = true;
    setTimeout(() => this.saved = false, 2000);
  }
}
