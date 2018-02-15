import { Component, OnInit } from '@angular/core';
declare var d3: any;

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.drawBarChart();
    this.withNegValues();
    this.barChartWithLabels();
    // this.drawStackedBarChart();
  }

  drawBarChart(){
    const svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

    const x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1),
        y = d3.scale.linear().rangeRound([height, 0]);

    const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("assets/data.tsv", function(d) {
      d.frequency = +d.frequency;
      return d;
    }, function(error, data) {
      if (error) throw error;
    
      x.domain(data.map(function(d) { return d.letter; }));
      y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

      const xAxis = d3.svg.axis().scale(x);
      const yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
    
      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);
    
      g.append("g")
          .attr("class", "axis axis--y")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Frequency");
    
      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.letter); })
          .attr("y", function(d) { return y(d.frequency); })
          .attr("width", x.rangeBand())
          .attr("height", function(d) { return height - y(d.frequency); });
    });
  }

  drawStackedBarChart(){
    const svg = d3.select("svg#bar-chart2"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scale.ordinal()
    .rangeRoundBands([0, width],0.05,.01);

    const y = d3.scale.linear()
    .rangeRound([height, 0]);

    const z = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    let headers;
    d3.tsv("assets/data_bar.tsv", function(d, i:number, cols) {
      let columns = Object.keys(d);
      headers = columns;
      d.columns = columns;
      for (var i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
        d.total = t;
      return d;
    }, function(error, data) {
      if (error) throw error;
    
      const keys = headers.slice(1);
      data.sort(function(a, b) { return b.total - a.total; });
      x.domain(data.map(function(d) { return d.State; }));
      y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
      z.domain(keys);
    
      g.append("g")
      .selectAll("g")
      .data(d3.layout.stack().keys(keys)(data))
      .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.State); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.rangeBand());

      g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.svg.axis(x));

      g.append("g")
      .attr("class", "axis")
      .call(d3.svg.axis().scale(y).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Population");

      const legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

      legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });

    });
  }

  withNegValues(){
    var margin = {top: 20, right: 30, bottom: 40, left: 30},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.ordinal()
        .rangeRoundBands([0, height], 0.1);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(0)
        .tickPadding(6);

    var svg = d3.select("#bar-chart2")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("assets/data_neg.tsv", type, function(error, data) {
      x.domain(d3.extent(data, function(d) { return d.value; })).nice();
      y.domain(data.map(function(d) { return d.name; }));

      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
          .attr("x", function(d) { return x(Math.min(0, d.value)); })
          .attr("y", function(d) { return y(d.name); })
          .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
          .attr("height", y.rangeBand());

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + x(0) + ",0)")
          .call(yAxis);
    });

    function type(d) {
      d.value = +d.value;
      return d;
    }
  }

  barChartWithLabels(){
    data = [
      {label:"Category 1", value:19},
      {label:"Category 2", value:5},
      {label:"Category 3", value:13},
      {label:"Category 4", value:17},
      {label:"Category 5", value:19},
      {label:"Category 6", value:27}
    ];


    var div = d3.select("#bar-chart-with-tooltip").append("div").attr("class", "toolTip");

    var axisMargin = 20,
        margin = 40,
        valueMargin = 4,
        width = 700,
        height = 600,
        barHeight = (height-axisMargin-margin*2)* 0.4/data.length,
        barPadding = (height-axisMargin-margin*2)*0.6/data.length,
        data, bar, svg, scale, xAxis, labelWidth = 0;

    var max = d3.max(data, function(d) { return d.value; });

    svg = d3.select('#bar-chart-with-tooltip')
          .append("svg")
          .attr("width", width)
          .attr("height", height);


    bar = svg.selectAll("g")
          .data(data)
          .enter()
          .append("g");

    bar.attr("class", "bar")
        .attr("cx",0)
        .attr("transform", function(d, i) {
            return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
        });

    bar.append("text")
          .attr("class", "label")
          .attr("y", barHeight / 2)
          .attr("dy", ".35em") //vertical align middle
          .text(function(d){
              return d.label;
          }).each(function() {
            labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
          });

    scale = d3.scale.linear()
          .domain([0, max])
          .range([0, width - margin*2 - labelWidth]);

    xAxis = d3.svg.axis()
          .scale(scale)
          .tickSize(-height + 2*margin + axisMargin)
          .orient("bottom");

    bar.append("rect")
        .attr("transform", "translate("+labelWidth+", 0)")
        .attr("height", barHeight)
        .attr("width", function(d){
            return scale(d.value);
        });

    bar.append("text")
        .attr("class", "value")
        .attr("y", barHeight / 2)
        .attr("dx", -valueMargin + labelWidth) //margin right
        .attr("dy", ".35em") //vertical align middle
        .attr("text-anchor", "end")
        .text(function(d){
            return (d.value+"%");
        })
        .attr("x", function(d){
            var width = this.getBBox().width;
            return Math.max(width + valueMargin, scale(d.value));
        });

    bar.on("mousemove", function(d){
        div.style("left", d3.event.pageX+10+"px");
        div.style("top", d3.event.pageY-25+"px");
        div.style("display", "inline-block");
        div.html((d.label)+"<br>"+(d.value)+"%");
    });

    bar.on("mouseout", function(d){
        div.style("display", "none");
    });
    
    svg.insert("g",":first-child")
    .attr("class", "axisHorizontal")
    .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
    .call(xAxis);
  }

}
