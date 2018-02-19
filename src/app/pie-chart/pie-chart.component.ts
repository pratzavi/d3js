import { Component, OnInit } from '@angular/core';
declare var d3: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.pieChartWithArc();
    // this.drawPieChart();
  }

  pieChartWithArc(){
    const svg = d3.select("#pie-chart1");
    const width = svg.attr("width");
    const height = svg.attr("height");
    const arc = d3.svg.arc()
                .innerRadius(Math.min(width/6, height/6))
                .outerRadius(Math.min(width/3, height/3))
                .startAngle(0);
    const data = [10,20,50,40,15,7.5];
    const scale = d3.scale.linear()
                  .domain(d3.extent(data))
                  .range([0, Math.PI]);
    const colorScale = d3.scale.linear()
                  .domain(d3.extent(data))
                  .range(['#f00', '#0f0']);
    svg
      .append('g')
      .attr('transform',`translate(${width/2},${height/2}) rotate(-90)`)
      .append('path')
      .datum({endAngle: Math.PI})
      .attr('d', arc);

    svg
      .append('g')
      .attr('transform',`translate(${width/2},${height/2}) rotate(-90)`)
      .append('path')
      .datum(data)
      .attr('d', function(d){
        d.forEach(function(c){
          return arc({
            endAngle: scale(c)
          })
        });
      })
      .style('fill', function(d){
        console.log(d);
        return colorScale(d);
      });
  }

  drawPieChart(){
    var svg = d3.select("#pie-chart2"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scale.ordinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.population; });

    var path = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var label = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    d3.csv("assets/data_pie.csv", function(d) {
      d.population = +d.population;
      return d;
    }, function(error, data) {
      if (error) throw error;

      var arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      arc.append("path")
          .attr("d", path)
          .attr("fill", function(d) { return color(d.data.age); });

      arc.append("text")
          .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
          .attr("dy", "0.35em")
          .text(function(d) { return d.data.age; });
    });
  }
}
