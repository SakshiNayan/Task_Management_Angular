import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/service/form-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginerrormsg  : string ='';
  loginForm: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private serviceFile: FormDataService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginData = this.loginForm.value;
    this.http.post('http://localhost:3000/login', loginData)
      .subscribe(
        (response: any) => {
          console.log('Login successful');
          this.serviceFile.loginDetails.next(response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('loginDetails', JSON.stringify(response));
          this.router.navigate(['/Home']);

        },
        error => {
          this.loginerrormsg = 'Enter the Valid Username and Password!';
          console.error('Error during login:', error);
          // Handle login error (e.g., display an error message)
        }
      );

  }
}
