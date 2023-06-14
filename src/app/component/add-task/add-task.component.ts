import { Component, OnInit, Input } from '@angular/core';
import { FormDataService } from '../../service/form-data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  // @Input() min: any;
  // yesterday = new Date();

  minDate: string;
  endMinDate: any;
  taskData!: FormGroup<any>;
  submitted = false;
  userList: any[] = [];

  constructor(private formDataService: FormDataService,
    private router: Router,
    private formBuilder: FormBuilder) {

    // this.yesterday.setDate(this.yesterday.getDate() - 0);
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.endMinDate = today.toISOString().split('T')[0];

  }

  ngOnInit(): void {
    this.getUserList();

    this.taskData = this.formBuilder.group({
      user_id: ['', Validators.required],
      task_description: ['', Validators.required],
      start_time: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      end_time: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      status: ['pending']
    })
  }

  get form() { return this.taskData.controls; }

  getUserList() {
    this.formDataService.getUserData().subscribe(
      (result) => {
        console.log(result)
        this.userList = result;
      }, (error) => {
        console.log(error, '------------');
      }
    )
  }

  onAddTask() {
    this.submitted = true;
    if (this.taskData.invalid) {
      return;
    };
    var data = this.taskData.value;
    this.formDataService.addFormData(data).subscribe(
      (data) => {
        this.taskData = data;
        alert('Task Added Successfully!')
        this.router.navigate(['/viewtask']);
      },
      (error) => {
        console.error('Error adding form data', error);
      }
    );
  }

}
