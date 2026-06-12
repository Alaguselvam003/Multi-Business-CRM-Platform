import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ThemeService } from '../../services/theme.service';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './invoices.component.html'
})
export class InvoicesComponent implements OnInit {
  isLoading = false;
  errorMessage = '';
  invoices: any[] = [];
  form: any = { invoice_number: '', amount: '', tax: '', status: 'draft', due_date: '' };
  showForm = false;
  statuses = ['draft', 'sent', 'paid', 'overdue'];

  readonly Plus = Plus;

  constructor(private apiService: ApiService, public themeService: ThemeService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    this.apiService.getInvoices()?.subscribe({
      next: (r) => {
        this.invoices = r.data || [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load data.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  save() {
    this.apiService.createInvoice(this.form).subscribe(() => {
      this.form = { invoice_number: '', amount: '', tax: '', status: 'draft', due_date: '' };
      this.showForm = false;
      this.load();
    });
  }

  statusColor(s: string) {
    const colors: any = {
      draft: 'bg-slate-100 text-slate-600',
      sent: 'bg-blue-100 text-blue-600',
      paid: 'bg-green-100 text-green-700',
      overdue: 'bg-red-100 text-red-600'
    };
    return colors[s] || '';
  }
}
