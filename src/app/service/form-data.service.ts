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

  getFormData(user_id:any,role:number): Observable<any> {
    return this.http.get(this.apiUrl+'?user_id='+user_id+'&role='+role);
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

  getUserData(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/user-list`);
  }

  Updatestatustrack(status : string,id:any): Observable<any>{
    const res = this.http.get('http://localhost:3000/api/statusUpdate?status='+status+'&id='+id);
    console.log(res)
    return  res;
  }
 

}
