import { Component, OnInit } from '@angular/core';
declare var d3: any;

@Component({
  selector: 'app-axes',
  templateUrl: './axes.component.html',
  styleUrls: ['./axes.component.css']
})
export class AxesComponent implements OnInit {
  innerTickSize: any;
  outerTickSize: any;
  tickPadding: any;
  tickFormat: any;
  orient: any;
  inner: any;
  outer: any;

  constructor() { }

  ngOnInit() {
  }

  simpleAxis(){
    const axis = d3.svg.axis();
    d3.select(".ex-1").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 60)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);
  }

  axisWithScale(){
    const axis = d3.svg
        .axis()
        .scale();
    
    d3.select(".ex-1").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 60)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);
  }

  axisWithScale2(){
    const scale = d3.scale.linear()
      .domain([0,100])
      .range([0,600]);
    
    const axis = d3.svg
        .axis()
        .scale(scale);
    
    d3.select(".ex-1").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 60)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);
  }

  axisWithOrient(orient){
    const scale = d3.scale.linear()
      .domain([0,10])
      .range([0,600]);
    
    const axis = d3.svg
        .axis()
        .scale(scale)
        .orient(orient);
    
    d3.select(".ex-1").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 600)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);
  }

  axisWithTick(orient){
    const scale = d3.scale.linear()
      .domain([0,10])
      .range([0,600]);
    
    const axis = d3.svg
        .axis()
        .scale(scale)
        .orient(orient)
        .ticks(20);
    
    d3.select(".ex-2").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 60)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);
  }

  axisWithTickFormat(orient){
    const scale = d3.scale.linear()
      .domain([-1,1])
      .range([0,600]);
    
    scale.ticks(10)
      .map(scale.tickFormat(10, "+%"));

    const axis = d3.svg
        .axis()
        .scale(scale)
        .orient(orient);
        
    d3.select(".ex-2").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 60)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);
  }

  axisWithTickValues(orient){
    const scale = d3.scale.linear()
      .domain([0,25])
      .range([0,600]);
    
    const axis = d3.svg
        .axis()
        .scale(scale)
        .orient(orient)
        .tickValues([1, 2, 3, 5, 8, 13, 21]);
    
    d3.select(".ex-2").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 60)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);
  }

  axisWithTickSize(inner, outer){
    const scale = d3.scale.linear()
      .domain([0,25])
      .range([0,600]);
    
    const axis = d3.svg
        .axis()
        .scale(scale)
        .tickSize(inner, outer);
    
    d3.select(".ex-3").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 60)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);
  }

  getInnerTickSize(){
    const scale = d3.scale.linear()
      .domain([0,25])
      .range([0,600]);
    
    const axis = d3.svg
        .axis()
        .scale(scale);
    
    d3.select(".ex-3").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 60)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);

    this.innerTickSize = axis.innerTickSize();
  }

  setInnerTickSize(innerTickSize){
    const scale = d3.scale.linear()
      .domain([0,25])
      .range([0,600]);
    
    const axis = d3.svg
        .axis()
        .scale(scale)
        .innerTickSize(innerTickSize);
    
    d3.select(".ex-3").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 60)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);
  }

  getOuterTickSize(){
    const scale = d3.scale.linear()
      .domain([0,25])
      .range([0,600]);
    
    const axis = d3.svg
        .axis()
        .scale(scale);
    
    d3.select(".ex-4").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 60)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);

    this.outerTickSize = axis.outerTickSize();
  }

  setOuterTickSize(outerTickSize){
    const scale = d3.scale.linear()
      .domain([0,25])
      .range([0,600]);
    
    const axis = d3.svg
        .axis()
        .scale(scale)
        .outerTickSize(outerTickSize);
    
    d3.select(".ex-4").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 60)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);
  }

  getTickPadding(){
    const scale = d3.scale.linear()
      .domain([0,25])
      .range([0,600]);
    
    const axis = d3.svg
        .axis()
        .scale(scale);
    
    d3.select(".ex-5").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 60)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);

    this.tickPadding = axis.tickPadding();
  }

  setTickPadding(padding){
    const scale = d3.scale.linear()
      .domain([0,25])
      .range([0,600]);
    
    const axis = d3.svg
        .axis()
        .scale(scale)
        .tickPadding(padding);
    
    d3.select(".ex-5").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 60)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);
  }

  getTickFormat(){
    const scale = d3.scale.linear()
      .domain([0,25])
      .range([0,600]);
    
    const axis = d3.svg
        .axis()
        .scale(scale);
    
    d3.select(".ex-6").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 60)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);

    this.tickFormat = axis.tickFormat();
  }

  setTickFormat(format){
    const commasFormatter = d3.format(format)
    const scale = d3.scale.linear()
      .domain([0,100])
      .range([0,600]);
    
    const axis = d3.svg
        .axis()
        .scale(scale)
        .tickFormat(function(d) { return "$" + commasFormatter(d); });
    
    d3.select(".ex-6").append("svg")
    .attr("class", "axis")
    .attr("width", 700)
    .attr("height", 60)
    .append("g")
    .attr("transform", "translate(10,30)")
    .call(axis);
  }

}
