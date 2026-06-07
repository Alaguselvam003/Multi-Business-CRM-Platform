import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ThemeService } from '../../services/theme.service';
import { LucideAngularModule, Plus, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './leads.component.html'
})
export class LeadsComponent implements OnInit {
  leads: any[] = [];
  form: any = { name: '', company: '', email: '', phone: '', status: 'new', priority: 'medium', value: '' };
  showForm = false;
  statuses = ['new', 'contacted', 'follow-up', 'proposal', 'negotiation', 'won', 'lost'];

  readonly Plus = Plus;
  readonly Trash2 = Trash2;

  constructor(private apiService: ApiService, public themeService: ThemeService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.apiService.getLeads().subscribe({
      next: (r) => this.leads = r.data || [],
      error: () => {}
    });
  }

  save() {
    this.apiService.createLead(this.form).subscribe(() => {
      this.form = { name: '', company: '', email: '', phone: '', status: 'new', priority: 'medium', value: '' };
      this.showForm = false;
      this.load();
    });
  }

  remove(id: string) {
    this.apiService.deleteLead(id).subscribe(() => this.load());
  }

  statusColor(s: string) {
    const colors: any = {
      won: 'bg-green-100 text-green-700',
      lost: 'bg-red-100 text-red-700',
      new: 'bg-blue-100 text-blue-700'
    };
    return colors[s] || 'bg-yellow-100 text-yellow-700';
  }
}
