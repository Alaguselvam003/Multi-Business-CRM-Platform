import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ThemeService } from '../../services/theme.service';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './support.component.html'
})
export class SupportComponent implements OnInit {
  tickets: any[] = [];
  form: any = { title: '', description: '', priority: 'medium', status: 'open' };
  showForm = false;
  priorities = ['low', 'medium', 'high', 'urgent'];

  readonly Plus = Plus;

  constructor(private apiService: ApiService, public themeService: ThemeService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.apiService.getTickets().subscribe({
      next: (r) => this.tickets = r.data || [],
      error: () => {}
    });
  }

  save() {
    this.apiService.createTicket(this.form).subscribe(() => {
      this.form = { title: '', description: '', priority: 'medium', status: 'open' };
      this.showForm = false;
      this.load();
    });
  }

  priorityColor(p: string) {
    const colors: any = {
      high: 'bg-red-100 text-red-600',
      medium: 'bg-yellow-100 text-yellow-600',
      low: 'bg-green-100 text-green-700',
      urgent: 'bg-red-200 text-red-800'
    };
    return colors[p] || '';
  }
}
