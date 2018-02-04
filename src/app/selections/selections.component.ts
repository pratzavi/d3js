import { Component, OnInit } from '@angular/core';
declare var d3: any;


@Component({
  selector: 'app-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.css']
})
export class SelectionsComponent implements OnInit {
  private pSelector;
  private arraySelector: Array<any>;
  classSelector;
  idSelector;

  constructor() { 
    
  }

  ngOnInit() {
    
  }

  showResults(){
    this.pSelector = d3.select("p").text();
    this.arraySelector = d3.selectAll("p b");
    this.classSelector = d3.selectAll('.methods p');
    this.idSelector = d3.select("#concept");
  }

}
