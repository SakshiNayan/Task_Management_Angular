import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
 // user : any;
  constructor(){}
  ngOnInit(): void {
  //   try{
  //     this.user= JSON.parse(localStorage.getItem("username"));
  //  }catch(error){}
  }
}
