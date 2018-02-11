import { Component, OnInit } from '@angular/core';
declare var d3: any;

@Component({
  selector: 'app-charts-intro',
  templateUrl: './charts-intro.component.html',
  styleUrls: ['./charts-intro.component.css']
})
export class ChartsIntroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  svgBarWithD3(){
    var data = [50, 100, 120];

    var width = 1300,
        scaleFactor = 10,
        barHeight = 20;

    var graph = d3.select("#scales")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", barHeight * data.length);

    var bar = graph.selectAll("g")
                  .data(data)
                  .enter()
                  .append("g")
                  .attr("transform", function(d, i) {
                      return "translate(0," + i * barHeight + ")";
                  });

    bar.append("rect")
       .attr("width", function(d) {
           return d * scaleFactor;
       })
       .attr("height", barHeight - 1);

    bar.append("text")
       .attr("x", function(d) { return (d*scaleFactor); })
       .attr("y", barHeight / 2)
       .attr("dy", ".35em")
       .text(function(d) { return d; });
  }
}
