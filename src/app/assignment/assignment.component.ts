import { Component, OnInit } from '@angular/core';
import { getRandomString } from 'selenium-webdriver/safari';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  onClick=false;
  numberOfTime=0;
  clicks=[];

  constructor() { }

  ngOnInit() {
  }

  toggleClick()
  {

this.onClick=!this.onClick;
this.clicks.push(this.numberOfTime+1 );
  }
  getColor()
  {
    
    return this.clicks[4]>=4 ? 'green':'transparent';
  }

}
