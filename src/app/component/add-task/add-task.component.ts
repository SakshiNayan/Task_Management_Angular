import { Component ,OnInit } from '@angular/core';
import { FormDataService } from '../../service/form-data.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent  implements OnInit{

  taskData : any ={};
  constructor( private formDataService : FormDataService,
    private router : Router){}

  ngOnInit(): void {
  }

  onAddTask() {
    this.formDataService.addFormData(this.taskData).subscribe(
      () => {
        //this.resetForm();
        this.taskData={};
        alert('Task Added Successfully!')
        this.router.navigate(['/viewtask']);

      },
      (error) => {
        console.error('Error adding form data', error);
      }
    );
  }

}
