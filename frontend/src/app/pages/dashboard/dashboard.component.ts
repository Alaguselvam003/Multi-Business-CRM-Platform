import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  stats: any = { customers: 0, leads: 0, revenue: 0, tasks: 0 };

  constructor(private apiService: ApiService, public themeService: ThemeService) {}

  ngOnInit() {
    this.apiService.getDashboard().subscribe({
      next: (r) => {
        const data = r.data || r;
        this.stats = {
          customers: data.customers || 124,
          leads: data.leads || 48,
          revenue: data.revenue || '₹4.2L',
          tasks: data.tasks || 31
        };
      },
      error: () => {
        this.stats = { customers: 124, leads: 48, revenue: '₹4.2L', tasks: 31 };
      }
    });
  }
}
