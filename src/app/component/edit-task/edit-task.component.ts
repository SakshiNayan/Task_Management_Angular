import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService } from 'src/app/service/form-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  editId: any;
  updateTaskItem  : any = {}
  constructor(
    private formDataService: FormDataService,
    private activeRoute: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.editId = this.activeRoute.snapshot.params['id'];

    this.formDataService.getByIDFormData(this.editId, FormData).subscribe((item : any)=>{
      this.updateTaskItem = item;
    })
  }


  updateFormData(editId : number) {
      this.formDataService.updateFormData(editId, this.updateTaskItem).subscribe(
        () => {
          //this.resetForm();
          this.updateTaskItem ={}
          alert('task updated Successfully')
          this.router.navigate(['/viewtask'])
        },
        (error : any) => {
          console.error('Error updating form data', error);
        }
      );
  }

}
