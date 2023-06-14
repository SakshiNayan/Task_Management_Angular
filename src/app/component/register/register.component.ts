import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators ,ValidatorFn} from '@angular/forms';
//import {matchPasswoedValidator} from './match.validator'
//

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
      username: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required, Validators.minLength(6),Validators.maxLength(8)]]
    },
    {
      validator : this.passwordMatch('password', 'confirmPassword')
    }
    );



  }
  passwordMatch(controlName: string, matchingControlName: string): Validators {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

 

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  register() {
    if (this.registrationForm.invalid) {
      return;
    }

    const registrationData = this.registrationForm.value;

    this.http.post('http://localhost:3000/register', registrationData)
      .subscribe(
        (response: any) => {
          console.log('Registration successful');
          this.router.navigate(['/login']);
        },
        (error) => {
          if(error.status === 409){

            console.log(error.error.message, 'already exists');
            alert('User already exists');
            window.location.reload();

          }else{
            console.error('Error during registration:', error);
          }
          
        }
      );
  }

}
