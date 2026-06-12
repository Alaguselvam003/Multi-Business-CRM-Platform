import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ThemeService } from '../../services/theme.service';

const fallbackRevenue = [
  { month: 'Jan', revenue: 42000 }, { month: 'Feb', revenue: 58000 }, { month: 'Mar', revenue: 51000 },
  { month: 'Apr', revenue: 67000 }, { month: 'May', revenue: 74000 }, { month: 'Jun', revenue: 89000 },
];

const fallbackLeads = [
  { stage: 'New', count: 40 }, { stage: 'Contacted', count: 30 }, { stage: 'Proposal', count: 20 },
  { stage: 'Negotiation', count: 12 }, { stage: 'Won', count: 8 },
];

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit {
  isLoading = false;
  errorMessage = '';
  revenue = fallbackRevenue;
  leads = fallbackLeads;

  constructor(private apiService: ApiService, public themeService: ThemeService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    let completed = 0;
    const checkComplete = () => {
      completed++;
      if (completed === 2) {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    };

    this.apiService.getRevenueTrend()?.subscribe({
      next: (r) => {
        this.revenue = r.data || fallbackRevenue;
        checkComplete();
      },
      error: () => {
        checkComplete();
      }
    });

    this.apiService.getLeadConversion()?.subscribe({
      next: (r) => {
        this.leads = r.data || fallbackLeads;
        checkComplete();
      },
      error: () => {
        checkComplete();
      }
    });
  }

  getMaxRevenue() {
    return Math.max(...this.revenue.map(r => r.revenue), 1);
  }

  getMaxLeads() {
    return Math.max(...this.leads.map(l => l.count), 1);
  }
}
