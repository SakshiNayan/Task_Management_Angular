import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { FormDataService } from 'src/app/service/form-data.service';
import { Router } from '@angular/router';
import { loginDetailInterface } from 'src/app/service/login.interface';

interface FormData {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  task_description: string;
  start_time: number;
  end_time: number;
  status: string
}

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  formDataList: FormData[] = [];
  formData: FormData = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    task_description: '',
    start_time: 0,
    end_time: 0,
    status: ''
  };
  loginDetails: loginDetailInterface | undefined;

  constructor(
    private formDataService: FormDataService,
    private router: Router,
  ) {
    this.formDataService.loginDetails.subscribe(
      value => {
        this.loginDetails = value;
      }
    )
  }

  ngOnInit() {
    this.fetchFormData();
  }

  fetchFormData() {
    this.formDataService.getFormData().subscribe(
      (data: any) => {
        this.formDataList = data;
      },
      (error: any) => {
        console.error('Error fetching form data', error);
      }
    );
  }

  updateTask(id: number) {
    this.router.navigate(['/editTask', id]);
  }



  deleteFormData(id: number) {
    this.formDataService.deleteFormData(id).subscribe(
      () => {
        alert('TaskData Deleted Successfully!')
        this.fetchFormData();
      },
      (error: any) => {
        console.error('Error deleting form data', error);
      }
    );
  }

}

