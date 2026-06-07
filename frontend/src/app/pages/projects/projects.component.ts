import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ThemeService } from '../../services/theme.service';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  form: any = { name: '', description: '', status: 'planning', progress: 0, start_date: '', end_date: '' };
  showForm = false;
  statuses = ['planning', 'in-progress', 'completed', 'on-hold'];

  readonly Plus = Plus;

  constructor(private apiService: ApiService, public themeService: ThemeService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.apiService.getProjects().subscribe({
      next: (r) => this.projects = r.data || [],
      error: () => {}
    });
  }

  save() {
    this.apiService.createProject(this.form).subscribe(() => {
      this.form = { name: '', description: '', status: 'planning', progress: 0, start_date: '', end_date: '' };
      this.showForm = false;
      this.load();
    });
  }

  statusColor(s: string) {
    const colors: any = {
      planning: 'bg-blue-100 text-blue-700',
      'in-progress': 'bg-yellow-100 text-yellow-700',
      completed: 'bg-green-100 text-green-700',
      'on-hold': 'bg-slate-100 text-slate-600'
    };
    return colors[s] || '';
  }
}
