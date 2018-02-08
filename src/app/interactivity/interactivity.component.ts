import { Component, OnInit } from '@angular/core';
declare var d3: any;

@Component({
  selector: 'app-interactivity',
  templateUrl: './interactivity.component.html',
  styleUrls: ['./interactivity.component.css']
})
export class InteractivityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    d3.select('#svg-container').on('mouseover', function(){
      console.log(d3.event);
      console.log(d3.mouse(this));
      d3.select(this)
        .append('circle')
        .attr('cx', d3.mouse(this)[0])
        .attr('cy', d3.mouse(this)[1])
        .attr('r', 10)
        .attr('fill', '#f00');
    })
  }

}
