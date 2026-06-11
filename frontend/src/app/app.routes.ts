import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OtpVerificationComponent } from './pages/otp-verification/otp-verification.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { LeadsComponent } from './pages/leads/leads.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { SupportComponent } from './pages/support/support.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'otp-verification', component: OtpVerificationComponent },
  { 
    path: '', 
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'leads', component: LeadsComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'support', component: SupportComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
