import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm : FormGroup;
  constructor(
    private http: HttpClient,
    private router : Router,
    private formBuilder: FormBuilder
    ){
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

    login() {
      if (this.loginForm.invalid) {
        return;
      }
      // this.http.post('http://localhost:3000/login', this.loginData)
      //   .subscribe((response: any) => {
      //     localStorage.setItem('token', response.token);
      //     this.router.navigate(['/Home']);
      //   }, (error) => {
      //     console.error('Error during login:', error);
      //   });
      const loginData = this.loginForm.value;

      this.http.post('http://localhost:3000/login', loginData)
        .subscribe(
          (response : any) => {
            console.log('Login successful');
            localStorage.setItem('token', response.token);
            this.router.navigate(['/Home']);
            // Handle successful login (e.g., redirect to a dashboard page)
          },
          error => {
            console.error('Error during login:', error);
            // Handle login error (e.g., display an error message)
          }
        );

    }
}
