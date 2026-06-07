import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ThemeService } from '../../services/theme.service';
import { LucideAngularModule, Plus, Trash2, Pencil } from 'lucide-angular';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  form: any = { name: '', email: '', phone: '', status: 'Active' };
  editing: string | null = null;
  showForm = false;

  readonly Plus = Plus;
  readonly Trash2 = Trash2;
  readonly Pencil = Pencil;

  constructor(private apiService: ApiService, public themeService: ThemeService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.apiService.getCustomers().subscribe({
      next: (r) => this.customers = r.data || [],
      error: () => {}
    });
  }

  save() {
    if (this.editing) {
      this.apiService.updateCustomer(this.editing, this.form).subscribe(() => this.resetAndLoad());
    } else {
      this.apiService.createCustomer(this.form).subscribe(() => this.resetAndLoad());
    }
  }

  resetAndLoad() {
    this.form = { name: '', email: '', phone: '', status: 'Active' };
    this.editing = null;
    this.showForm = false;
    this.load();
  }

  remove(id: string) {
    this.apiService.deleteCustomer(id).subscribe(() => this.load());
  }

  edit(c: any) {
    this.form = { ...c };
    this.editing = c.id;
    this.showForm = true;
  }
}
