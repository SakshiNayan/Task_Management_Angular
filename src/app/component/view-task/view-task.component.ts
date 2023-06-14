import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { FormDataService } from 'src/app/service/form-data.service';
import { Router } from '@angular/router';
import { loginDetailInterface } from 'src/app/service/login.interface';

// interface FormData {
//   id: number;
//   firstname: string;
//   lastname: string;
//   email: string;
//   task_description: string;
//   start_time: number;
//   end_time: number;
//   status: string
// }

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  // statusItem : any[]=[];
  // status : string;
  formDataList: any[] = [];
  loginDetails: loginDetailInterface | undefined;
  user_id: any;
  role: number = 1;
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
    if (this.loginDetails?.user.id) {
      this.user_id = this.loginDetails?.user.id;
      this.role = this.loginDetails?.user.role;
      this.fetchFormData(this.loginDetails?.user.id, this.role);
    }
  }

  fetchFormData(user_id: any, role: number) {
    this.formDataService.getFormData(user_id, role).subscribe(
      (data: any) => {
        console.log(data)
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
        this.fetchFormData(this.user_id, this.role);
      },
      (error: any) => {
        console.error('Error deleting form data', error);
      }
    );
  }

  trackTask(task_id: any) {
    this.router.navigate(['/track-progess', task_id]);
  }

  // fetchStatustrack(status: any){
  //   this.formDataService.getStatustrack(status).subscribe(
  //     (data)=>{
  //       console.log(data);
  //       this.statusItem=data;
  //     }
  //   )
  // }

  // getStatusColor(): string {
  //   switch (this.status) {
  //     case 'pending':
  //       return 'red';
  //     case 'inprogress':
  //       return 'blue';
  //     case 'complete':
  //       return 'green';
  //     default:
  //       return '';
  //   }
  // }
  
}

