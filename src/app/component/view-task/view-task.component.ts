import { Component, OnInit } from '@angular/core';
 //import { HttpClient } from '@angular/common/http';
import { FormDataService } from 'src/app/service/form-data.service';

interface FormData {
  id: number;
  firstname : string;
  lastname : string;
  email : string;
  task_description : string;
  start_time :  number;
  end_time: number;
  status : string
}

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  formDataList : FormData[]=[];
  formData: FormData ={
    id : 0,
    firstname : '',
    lastname : '',
    email : '',
    task_description : '',
    start_time : 0 ,
    end_time: 0,
    status : ''
  };


  constructor(private formDataService: FormDataService) {}

  ngOnInit() {
    this.fetchFormData();
  }

  fetchFormData() {
    this.formDataService.getFormData().subscribe(
      (data : any) => {
        this.formDataList = data;
      },
      (error : any) => {
        console.error('Error fetching form data', error);
      }
    );
  }

  // addFormData() {
  //   this.formDataService.addFormData(this.formData).subscribe(
  //     () => {
  //       //this.resetForm();
  //       this.fetchFormData();
  //     },
  //     (error : any) => {
  //       console.error('Error adding form data', error);
  //     }
  //   );
  // }

  // updateFormData(id: number) {
  //   this.formDataService.updateFormData(id, this.formData).subscribe(
  //     () => {
  //       //this.resetForm();
  //       this.fetchFormData();
  //     },
  //     (error : any) => {
  //       console.error('Error updating form data', error);
  //     }
  //   );
  // }

  deleteFormData(id: number) {
    this.formDataService.deleteFormData(id).subscribe(
      () => {
        this.fetchFormData();
      },
      (error : any) => {
        console.error('Error deleting form data', error);
      }
    );
  }

}

