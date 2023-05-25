import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface FormData {
  firstname : string;
  lastname : string;
  email : string;
  task_description : string;
  start_time :  number;
  end_time: number;
  status : string
}

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private apiUrl = 'api/formdata'; //api endpoint

  constructor(private http : HttpClient) { }

  getFormData(): Observable<FormData[]> {
    return this.http.get<FormData[]>(this.apiUrl);
  }

  addFormData(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  updateFormData(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  deleteFormData(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
