import { Component, OnInit } from '@angular/core';
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
export class SidebarComponent implements OnInit {
  navItems: any[] = [];

  readonly LogOut = LogOut;
  readonly Sun = Sun;
  readonly Moon = Moon;

  constructor(
    private authService: AuthService, 
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    const role = this.authService.getUserRole();
    const isAdmin = role === 'Super Admin' || role === 'Company Admin';

    this.navItems = [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, show: true },
      { path: '/customers', label: 'Customers', icon: Users, show: isAdmin || role === 'Sales Executive' || role === 'Manager' || role === 'Viewer' },
      { path: '/leads', label: 'Leads', icon: TrendingUp, show: isAdmin || role === 'Sales Executive' || role === 'Manager' || role === 'Viewer' },
      { path: '/tasks', label: 'Tasks', icon: CheckSquare, show: isAdmin || role === 'Employee' || role === 'Manager' || role === 'Viewer' },
      { path: '/invoices', label: 'Invoices', icon: FileText, show: isAdmin || role === 'Manager' },
      { path: '/employees', label: 'Employees', icon: UserCheck, show: isAdmin || role === 'HR' },
      { path: '/projects', label: 'Projects', icon: FolderOpen, show: isAdmin || role === 'Manager' },
      { path: '/analytics', label: 'Analytics', icon: BarChart2, show: isAdmin },
      { path: '/support', label: 'Support', icon: Headphones, show: isAdmin || role === 'Support Executive' },
      { path: '/settings', label: 'Settings', icon: Settings, show: true }
    ].filter(item => item.show);
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
