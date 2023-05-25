import { Component ,OnInit } from '@angular/core';
import { FormDataService } from '../../service/form-data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent  implements OnInit{
  // formDataList: FormData[] = [];
  taskData = new FormGroup({
    firstname : new FormControl(''),
    lastname : new FormControl(''),
    email : new FormControl(''),
    task_description : new FormControl(''),
    start_time : new FormControl(''),
    end_time : new FormControl(''),
    status : new FormControl('')
  }) 
  constructor( private formDataService : FormDataService){}

  ngOnInit(): void {
  }

  onAddTask(){
  }

}
