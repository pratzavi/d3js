import { Component, OnInit } from '@angular/core';
declare var d3: any;
declare var d3pie: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.pieChartWithArc();
    this.drawPieChart();
    this.drawDonutChart();
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
      .attr('class', 'pie')
      .append('path')
      .datum({endAngle: Math.PI})
      .attr('d', arc);

    svg
      .append('g')
      .attr('transform',`translate(${width/2},${height/2}) rotate(-90)`)
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('d', function(d){
        return arc({endAngle: Math.PI*scale(d)})
      })
      .style('fill', function(d){
        return colorScale(d);
      });
  }

  drawPieChart(){
    var svg = d3.select("#pie-chart2"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scale.category10();

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

      // Map it across with custom colors with this data set if
      const ageMap = data.map((d) => {return d.age});

      var arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      arc.append("path")
          .attr("d", path)
          .attr("fill", function(d, i) { return color(i); });

      arc.append("text")
          .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
          .attr("dy", "0.35em")
          .text(function(d) { return d.data.age; });
    });
  }


  drawDonutChart(){
    var svg = d3.select("#donut-chart"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scale.category10();

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.population; });

    var path = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70);

    var label = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    d3.csv("assets/data_pie.csv", function(d) {
      d.population = +d.population;
      return d;
    }, function(error, data) {
      if (error) throw error;

      // Map it across with custom colors with this data set if
      const ageMap = data.map((d) => {return d.age});

      var arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      arc.append("path")
          .attr("d", path)
          .attr("fill", function(d, i) { return color(i); });

      arc.append("text")
          .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
          .attr("dy", "0.35em")
          .text(function(d) { return d.data.age; });
    });
  }

  d3PiePlugin(){
    var pie = new d3pie("pieChart", {
            "header": {
              "title": {
                "text": "Lots of Programming Languages",
                "fontSize": 24,
                "font": "open sans"
              },
              "subtitle": {
                "text": "A full pie chart to show off label collision detection and resolution.",
                "color": "#999999",
                "fontSize": 12,
                "font": "open sans"
              },
              "titleSubtitlePadding": 9
            },
            "footer": {
              "color": "#999999",
              "fontSize": 10,
              "font": "open sans",
              "location": "bottom-left"
            },
            "size": {
              "canvasWidth": 590,
              "pieOuterRadius": "90%"
            },
            "data": {
              "sortOrder": "value-desc",
              "content": [
                {
                  "label": "JavaScript",
                  "value": 264131,
                  "color": "#2484c1"
                },
                {
                  "label": "Ruby",
                  "value": 218812,
                  "color": "#0c6197"
                },
                {
                  "label": "Java",
                  "value": 157618,
                  "color": "#4daa4b"
                },
                {
                  "label": "PHP",
                  "value": 114384,
                  "color": "#90c469"
                },
                {
                  "label": "Python",
                  "value": 95002,
                  "color": "#daca61"
                },
                {
                  "label": "C+",
                  "value": 78327,
                  "color": "#e4a14b"
                },
                {
                  "label": "C",
                  "value": 67706,
                  "color": "#e98125"
                },
                {
                  "label": "Objective-C",
                  "value": 36344,
                  "color": "#cb2121"
                },
                {
                  "label": "Shell",
                  "value": 28561,
                  "color": "#830909"
                },
                {
                  "label": "Cobol",
                  "value": 24131,
                  "color": "#923e99"
                },
                {
                  "label": "C#",
                  "value": 100,
                  "color": "#ae83d5"
                },
                {
                  "label": "Coldfusion",
                  "value": 68,
                  "color": "#bf273e"
                },
                {
                  "label": "Fortran",
                  "value": 218812,
                  "color": "#ce2aeb"
                },
                {
                  "label": "Coffeescript",
                  "value": 157618,
                  "color": "#bca44a"
                },
                {
                  "label": "Node",
                  "value": 114384,
                  "color": "#618d1b"
                },
                {
                  "label": "Basic",
                  "value": 95002,
                  "color": "#1ee67b"
                },
                {
                  "label": "Cola",
                  "value": 36344,
                  "color": "#b0ec44"
                },
                {
                  "label": "Perl",
                  "value": 32170,
                  "color": "#a4a0c9"
                },
                {
                  "label": "Dart",
                  "value": 28561,
                  "color": "#322849"
                },
                {
                  "label": "Go",
                  "value": 264131,
                  "color": "#86f71a"
                },
                {
                  "label": "Groovy",
                  "value": 218812,
                  "color": "#d1c87f"
                },
                {
                  "label": "Processing",
                  "value": 157618,
                  "color": "#7d9058"
                },
                {
                  "label": "Smalltalk",
                  "value": 114384,
                  "color": "#44b9b0"
                },
                {
                  "label": "Scala",
                  "value": 95002,
                  "color": "#7c37c0"
                },
                {
                  "label": "Visual Basic",
                  "value": 78327,
                  "color": "#cc9fb1"
                },
                {
                  "label": "Scheme",
                  "value": 67706,
                  "color": "#e65414"
                },
                {
                  "label": "Rust",
                  "value": 36344,
                  "color": "#8b6834"
                },
                {
                  "label": "FoxPro",
                  "value": 32170,
                  "color": "#248838"
                }
              ]
            },
            "labels": {
              "outer": {
                "pieDistance": 32
              },
              "inner": {
                "hideWhenLessThanPercentage": 3
              },
              "mainLabel": {
                "fontSize": 11
              },
              "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 0
              },
              "value": {
                "color": "#adadad",
                "fontSize": 11
              },
              "lines": {
                "enabled": true
              },
              "truncation": {
                "enabled": true
              }
            },
            "effects": {
              "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 400,
                "size": 8
              }
            },
            "misc": {
              "gradient": {
                "enabled": true,
                "percentage": 100
              }
            }
          });
  }
}
