import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ThemeService } from '../../services/theme.service';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  form: any = { name: '', email: '', designation: '', department: '', status: 'active', join_date: '' };
  showForm = false;

  readonly Plus = Plus;

  constructor(private apiService: ApiService, public themeService: ThemeService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.apiService.getEmployees().subscribe({
      next: (r) => this.employees = r.data || [],
      error: () => {}
    });
  }

  save() {
    this.apiService.createEmployee(this.form).subscribe(() => {
      this.form = { name: '', email: '', designation: '', department: '', status: 'active', join_date: '' };
      this.showForm = false;
      this.load();
    });
  }
}
