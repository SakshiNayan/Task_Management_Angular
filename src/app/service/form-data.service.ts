import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginDetailInterface } from './login.interface';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private apiUrl = 'http://localhost:3000/api/formdata'; //api endpoint
  localStorageVal = localStorage.getItem('loginDetails') ? JSON.parse((localStorage.getItem('loginDetails')) as any) : null as any;
  public loginDetails = new BehaviorSubject<any>(this.localStorageVal);

  constructor(private http: HttpClient) { }

  getFormData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addFormData(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  updateFormData(id: number, formData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  deleteFormData(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getByIDFormData(id: number, formData: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, formData)
  }
}
