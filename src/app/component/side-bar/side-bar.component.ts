import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/service/form-data.service';
import { loginDetailInterface } from 'src/app/service/login.interface';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  username: string = '';
  loginDetails: loginDetailInterface | undefined;

  constructor(
    private serviceFile: FormDataService,
    private router : Router
  ) {
    this.serviceFile.loginDetails.subscribe(values => {
      this.loginDetails = values;
      this.username = this.loginDetails?.user?.username as string;
    })
  }
  ngOnInit(): void {
    //   try{
    //     this.user= JSON.parse(localStorage.getItem("username"));
    //  }catch(error){}
  }
  logut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
