import { Component, OnInit } from '@angular/core';
declare const d3: any;

@Component({
  selector: 'app-charts-intro',
  templateUrl: './charts-intro.component.html',
  styleUrls: ['./charts-intro.component.css']
})
export class ChartsIntroComponent implements OnInit {
  interpolate:any = "basis";
  sorted_names = ['linear','step-before','step-after','basis','basis-open','basis-closed','bundle','cardinal','cardinal','cardinal-closed','monotone'];
  constructor() { }

  ngOnInit() {
  }

  svgBarWithD3(){
    const data = [50, 100, 120];

    const width = 1300,
        scaleFactor = 10,
        barHeight = 20;

    const graph = d3.select("#scales")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", barHeight * data.length);

    const bar = graph.selectAll("g")
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

  drawPath(){
    const lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
    { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
    { "x": 80,  "y": 5},  { "x": 100, "y": 60}];
    const lineData2 = [{x:0, y:0},
        {x:600,y:100},{x:600,y:0}];

    const line = d3.svg.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .interpolate(this.interpolate);
    d3.select('#ex-1').append('svg')
        .attr('height', 100)
        .attr('width', 600)
        .append('g')
        .selectAll('path')
        .data(lineData)
        .enter()
        .append('path')
        .attr('d', line(lineData))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");
  }

  customInterpolator(){
    const data = d3.range(20).map(function(i) {
        return {x: i / 19, y: (Math.sin(i / 3) + 2) / 4};
    });
    function interpolator(points) { return points.join("A 1 1 0 0 1 "); }
    const margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    const x = d3.scale.linear()
        .domain([0, 1])
        .range([0, width]);

    const y = d3.scale.linear()
        .domain([0, 1])
        .range([height, 0]);

    const xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    const yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    const line = d3.svg.line()
            .interpolate(interpolator) // custom interpolator
            .x(function(d) { return x(d.x); })
            .y(function(d) { return y(d.y); });
    
    const svg = d3.select("#custom-interpolator").append("svg")
        .datum(data)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("path")
        .attr("class", "line")
        .attr("d", line);

    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5);
  }
}
