import { Component, OnInit } from '@angular/core';
declare var d3: any;

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.drawSimpleLineChart();
    this.drawLineChart();
    this.drawGridLines();
  }

  drawSimpleLineChart(){
    // Set the dimensions of the canvas / graph
    var	margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

    // Parse the date / time
    var	parseDate = d3.time.format("%d-%b-%y").parse;

    // Set the ranges
    var	x = d3.time.scale().range([0, width]);
    var	y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var	xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

    var	yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

    // Define the line
    var	valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });
      
    // Adds the svg canvas
    var	svg = d3.select("#simple-line-chart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.csv("assets/data_simple_line.csv", function(error, data) {
      data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
      });

      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain([0, d3.max(data, function(d) { return d.close; })]);

      // Add the valueline path.
      svg.append("path")	
        .attr("class", "line")
        .attr("d", valueline(data));

      // Add the X Axis
      svg.append("g")		
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      // Add the Y Axis
      svg.append("g")		
        .attr("class", "y axis")
        .call(yAxis);
    });
  }

  drawLineChart(){
    const svg = d3.select("#line-chart svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const parseDate = d3.time.format("%d-%b-%y").parse;

    const x = d3.time.scale().range([0, width]);

    const y = d3.scale.linear().rangeRound([height, 0]);

    const line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

    d3.tsv("assets/data_line.tsv", function(d) {
      d.date = parseDate(d.date);
      d.close = +d.close;
      return d;
    }, function(error, data) {
      if (error) throw error;
    
      x.domain(d3.extent(data, function(d) { return d.date}));
      y.domain(d3.extent(data, function(d) { return d.close; }));
      const xAxis = d3.svg.axis().scale(x);
      const yAxis = d3.svg.axis().scale(y).orient("left");
      g.append("g")
          .attr("transform", "translate(0," + height + ")")
          .attr("class", "x axis")
          .call(xAxis)
          .select(".domain")
          // .remove();
    
      g.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Price ($)");
    
      g.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", line);
    });
  }

  drawGridLines(){
    // define dimensions of graph
		var m = [80, 80, 80, 80]; // margins
		var w = 700 - m[1] - m[3]; // width
    var h = 500 - m[0] - m[2]; // height
    
		var data = [3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7];

		var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
		var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);

		var line = d3.svg.line()
			.x(function(d,i) {
				return x(i); 
			})
			.y(function(d) {
				return y(d); 
      });
      
    var graph = d3.select("#graph").append("svg:svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
    .append("svg:g")
    .attr("transform", `translate(${m[3]},${m[0]})`);

    var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
    // Add the x-axis.
    graph.append("svg:g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

    var yAxisLeft = d3.svg.axis().scale(y).tickSize(-w).tickSubdivide(true).orient("left");
    // Add the y-axis to the left
    graph.append("svg:g")
          .attr("class", "y axis")
          .attr("transform", `translate(0,0)`)
          .call(yAxisLeft);
    
    // do this AFTER the axes above so that the line is above the tick-lines
    graph.append("svg:path").attr("d", line(data));
  }

}
