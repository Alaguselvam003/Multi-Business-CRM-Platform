import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, LayoutDashboard, Users, TrendingUp, 
  CheckSquare, FileText, UserCheck, FolderOpen, BarChart2, 
  Headphones, Settings, LogOut, Sun, Moon 
} from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/customers', label: 'Customers', icon: Users },
    { path: '/leads', label: 'Leads', icon: TrendingUp },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare },
    { path: '/invoices', label: 'Invoices', icon: FileText },
    { path: '/employees', label: 'Employees', icon: UserCheck },
    { path: '/projects', label: 'Projects', icon: FolderOpen },
    { path: '/analytics', label: 'Analytics', icon: BarChart2 },
    { path: '/support', label: 'Support', icon: Headphones },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  readonly LogOut = LogOut;
  readonly Sun = Sun;
  readonly Moon = Moon;

  constructor(
    private authService: AuthService, 
    private router: Router,
    public themeService: ThemeService
  ) {}

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
