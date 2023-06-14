import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService } from 'src/app/service/form-data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  minDate: string;
  endMinDate: any;
  editId: any;
  submitted = false;
  updateTaskItem!: FormGroup<any>;
  editDataDetails: any;
  constructor(
    private formDataService: FormDataService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.endMinDate = today.toISOString().split('T')[0];
    
    this.updateTaskItem = this.formBuilder.group({
      task_description: ['', Validators.required],
      start_time: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      end_time: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
    })
  }

  ngOnInit() {
    this.editId = this.activeRoute.snapshot.params['id'];
    this.formDataService.getByIDFormData(this.editId, FormData).subscribe((item: any) => {
      this.editDataDetails = item;
      this.minDate = new Date(item.start_time).toISOString().split('T')[0];
      this.endMinDate = new Date(item.start_time).toISOString().split('T')[0];
      this.updateTaskItem.controls['task_description'].setValue(item.task_description);
      this.updateTaskItem.controls['start_time'].setValue(this.minDate);
      this.updateTaskItem.controls['end_time'].setValue(new Date(item.end_time).toISOString().split('T')[0]);
    });

  }

  get form() { return this.updateTaskItem.controls; }

  updateFormData(editId: number) {
    this.submitted = true;

    if (this.updateTaskItem.invalid) {
      // alert('please enter the fields !');
      return;
    }
    var results = this.updateTaskItem.value;
    this.formDataService.updateFormData(editId, results).subscribe(
      (results) => {
        //this.resetForm();
        console.log(results)
        this.updateTaskItem = results
        alert('Task updated Successfully!')
        this.router.navigate(['/viewtask'])
      },
      (error: any) => {
        console.error('Error updating form data', error);
      }
    );
  }

}
