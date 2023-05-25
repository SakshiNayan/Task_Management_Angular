import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;


  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder : FormBuilder
  ) { 
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  register() {
    if (this.registrationForm.invalid) {
      return;
    }
    // this.http.post('http://localhost:3000/register', this.registerData)
    //   .subscribe((response: any) => {
        // localStorage.setItem('token', response.token);
        // localStorage.setItem('username', response.username)
        // this.router.navigate(['/login']);
    //   }, (error) => {
    //     console.error('Error during registration:', error);
    //   });

    const registrationData = this.registrationForm.value;

    this.http.post('http://localhost:3000/register', registrationData)
      .subscribe(
        (response: any) => {
          console.log('Registration successful');
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username)
          this.router.navigate(['/login']);
          
        },
        (error) => {
          console.error('Error during registration:', error);
          
        }
      );
  }

}
