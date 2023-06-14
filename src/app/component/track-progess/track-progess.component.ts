import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDataService } from 'src/app/service/form-data.service';

@Component({
  selector: 'app-track-progess',
  templateUrl: './track-progess.component.html',
  styleUrls: ['./track-progess.component.css']
})
export class TrackProgessComponent implements OnInit {
  taskDetails: any;
  // status: string;
  editId: any;
  progressBarActive: boolean = false;
  progressBarValue: number = 0;
  progressBarInterval: any;
  progressBarSpeed: number = 10; // Speed of progress in percentage per second
  startButton: boolean = false;
  endButton: boolean = false;
  constructor(
    private formDataService: FormDataService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.editId = this.activeRoute.snapshot.params['id'];
    this.formDataService.getByIDFormData(this.editId, FormData).subscribe((item: any) => {
      this.taskDetails = item;
      if (item.status == 'pending') {
        this.startButton = true;
      } else if (item.status == 'inprogress') {
        this.endButton = true;
      }
    })
  }

  startProgressBar(id: any) {
    this.progressBarInterval = setInterval(() => {
      this.progressBarValue += this.progressBarSpeed / 10;
      if (this.progressBarValue >= 100) {
        this.progressBarValue = 100;
        // this.endProgressBar(id);
      }
    }, 100);
    // this.status = 'Inprogess';
    this.updateStatus('inprogress', id);
  }

  endProgressBar(id: any) {
    clearInterval(this.progressBarInterval);
    this.progressBarActive = false;
    this.progressBarValue = 0;
    this.updateStatus('complete', id);
  }

  updateStatus(status: string, id: any) {
    this.formDataService.Updatestatustrack(status, id).subscribe((result) => {
      alert('sucessfull');
      this.router.navigate(['/viewtask']);
    }, (error) => {
      console.log(error, 'error');
    })
  }
}
