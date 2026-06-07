import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ThemeService } from '../../services/theme.service';
import { LucideAngularModule, Plus, Trash2, Check } from 'lucide-angular';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  form: any = { title: '', description: '', priority: 'medium', status: 'open', due_date: '' };
  showForm = false;

  readonly Plus = Plus;
  readonly Trash2 = Trash2;
  readonly Check = Check;

  constructor(private apiService: ApiService, public themeService: ThemeService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.apiService.getTasks().subscribe({
      next: (r) => this.tasks = r.data || [],
      error: () => {}
    });
  }

  save() {
    this.apiService.createTask(this.form).subscribe(() => {
      this.form = { title: '', description: '', priority: 'medium', status: 'open', due_date: '' };
      this.showForm = false;
      this.load();
    });
  }

  complete(t: any) {
    this.apiService.updateTask(t.id, { ...t, status: 'completed' }).subscribe(() => this.load());
  }

  remove(id: string) {
    this.apiService.deleteTask(id).subscribe(() => this.load());
  }

  priorityColor(p: string) {
    const colors: any = {
      high: 'text-red-500',
      medium: 'text-yellow-500',
      low: 'text-green-500'
    };
    return colors[p] || '';
  }
}
