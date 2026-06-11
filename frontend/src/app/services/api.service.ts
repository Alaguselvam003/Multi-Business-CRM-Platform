import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Auth
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  registerCompany(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register-company`, data);
  }

  registerEmployee(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register-employee`, data);
  }

  sendOtp(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/send-otp`, data);
  }

  verifyOtp(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/verify-otp`, data);
  }

  getSessions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/sessions`);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/logout`, {});
  }

  // Customers
  getCustomers(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/customers?page=${page}&limit=${limit}`);
  }

  getCustomerById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/customers/${id}`);
  }

  createCustomer(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/customers`, data);
  }

  updateCustomer(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/customers/${id}`, data);
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/customers/${id}`);
  }

  // Leads
  getLeads(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/leads?page=${page}&limit=${limit}`);
  }

  getLeadById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/leads/${id}`);
  }

  createLead(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/leads`, data);
  }

  updateLead(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/leads/${id}`, data);
  }

  deleteLead(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/leads/${id}`);
  }

  updateLeadStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/leads/${id}/status`, { status });
  }

  // Tasks
  getTasks(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks?page=${page}&limit=${limit}`);
  }

  createTask(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks`, data);
  }

  updateTask(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, data);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`);
  }

  // Invoices
  getInvoices(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoices?page=${page}&limit=${limit}`);
  }

  createInvoice(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/invoices`, data);
  }

  updateInvoice(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/invoices/${id}`, data);
  }

  generateInvoicePDF(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoices/${id}/pdf`);
  }

  // Employees
  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employees`);
  }

  createEmployee(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employees`, data);
  }

  updateEmployee(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/employees/${id}`, data);
  }

  // Analytics
  getDashboard(): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/dashboard`);
  }

  getLeadConversion(): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/lead-conversion`);
  }

  getRevenueTrend(months: number = 12): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/revenue?months=${months}`);
  }

  getSalesPerformance(): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/sales-performance`);
  }

  // Projects
  getProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects`);
  }

  createProject(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/projects`, data);
  }

  // Support Tickets
  getTickets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tickets`);
  }

  createTicket(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tickets`, data);
  }
}
