import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private storage: StorageService) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
  }

  setUserInfo(info: any): void {
    localStorage.setItem('userInfo', JSON.stringify(info));
  }

  getUserInfo(): any {
    const info = localStorage.getItem('userInfo');
    return info ? JSON.parse(info) : null;
  }

  getUserRole(): string {
    const user = this.getUserInfo();
    return user ? user.role : 'Viewer';
  }

  hasRole(allowedRoles: string[]): boolean {
    const role = this.getUserRole();
    return allowedRoles.includes(role) || role === 'Super Admin' || role === 'Company Admin';
  }
}
