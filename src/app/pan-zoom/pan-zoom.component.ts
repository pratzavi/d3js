import { Component, OnInit } from '@angular/core';
declare var d3: any;

@Component({
  selector: 'app-pan-zoom',
  templateUrl: './pan-zoom.component.html',
  styleUrls: ['./pan-zoom.component.css']
})
export class PanZoomComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  dispatchDemo(){
    // Coerce population counts to numbers and compute total per state.
    function type(d) {
      d.total = d3.sum(groups, function(k) { return d[k] = +d[k]; });
      return d;
    }

    var dispatch = d3.dispatch("load", "statechange");

    var groups = [
      "Under 5 Years",
      "5 to 13 Years",
      "14 to 17 Years",
      "18 to 24 Years",
      "25 to 44 Years",
      "45 to 64 Years",
      "65 Years and Over"
    ];

    d3.csv("assets/data_dispatch.csv", type, function(error, states) {
      if (error) throw error;
      var stateById = d3.map();
      states.forEach(function(d) { stateById.set(d.id, d); });
      dispatch.load(stateById);
      dispatch.statechange(stateById.get("CA"));
    });

    // A drop-down menu for selecting a state; uses the "menu" namespace.
    dispatch.on("load.menu", function(stateById) {
      var select = d3.select("#d3-dispatch-demo")
        .append("div")
        .append("select")
        .on("change", function() { dispatch.statechange(stateById.get(this.value)); });

      select.selectAll("option")
        .data(stateById.values())
        .enter().append("option")
        .attr("value", function(d) { return d.id; })
        .text(function(d) { return d.id; });

      dispatch.on("statechange.menu", function(state) {
        select.property("value", state.id);
      });
    });

    // A bar chart to show total population; uses the "bar" namespace.
    dispatch.on("load.bar", function(stateById) {
      var margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = 80 - margin.left - margin.right,
          height = 460 - margin.top - margin.bottom;

      var y = d3.scale.linear()
          .domain([0, d3.max(stateById.values(), function(d) { return d.total; })])
          .rangeRound([height, 0])
          .nice();

      var yAxis = d3.svg.axis().orient("left").scale(y)
          .tickFormat(d3.format(".2s"));

      var svg = d3.select("#d3-dispatch-demo").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      var rect = svg.append("rect")
          .attr("x", 4)
          .attr("width", width - 4)
          .attr("y", height)
          .attr("height", 0)
          .style("fill", "#aaa");

      dispatch.on("statechange.bar", function(d) {
        rect.transition()
            .attr("y", y(d.total))
            .attr("height", y(0) - y(d.total));
      });
    });

    // A pie chart to show population by age group; uses the "pie" namespace.
    dispatch.on("load.pie", function(stateById) {
      var width = 620,
          height = 460,
          radius = Math.min(width, height) / 2;

      var color = d3.scale.ordinal()
          .domain(groups)
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

      var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(radius - 70);

      var pie = d3.layout.pie()
          .sort(null);

      var svg = d3.select("#d3-dispatch-demo").append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var path = svg.selectAll("path")
          .data(groups)
          .enter().append("path")
          .style("fill", color)
          .each(function() { this._current = {startAngle: 0, endAngle: 0}; });

      dispatch.on("statechange.pie", function(d) {
        path.data(pie.value(function(g) { return d[g]; })(groups)).transition()
            .attrTween("d", function(d) {
              var interpolate = d3.interpolate(this._current, d);
              this._current = interpolate(0);
              return function(t) {
                return arc(interpolate(t));
              };
            });
      });
    });
  }

  basicDragExample(){
    var svg = d3.select("svg#simple-drag"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = 32;

    var circles = d3.range(20).map(function() {
      return {
        x: Math.round(Math.random() * (width - radius * 2) + radius),
        y: Math.round(Math.random() * (height - radius * 2) + radius)
      };
    });

    var color = d3.scale.category20();
    var drag = d3.behavior.drag()
                .origin(null)
                .on("dragstart", dragstarted)
                .on("drag", dragged)
                .on("dragend", dragended);

    svg.selectAll("circle")
      .data(circles)
      .enter().append("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", radius)
        .style("fill", function(d, i) { return color(i); })
        .call(drag);

    function dragstarted(d) {
      d3.select(this).classed("active", true);
    }

    function dragged(d) {
      d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    }

    function dragended(d) {
      d3.select(this).classed("active", false);
    }
  }

  dragMultiples(){
    var width = 240,
    height = 125,
    radius = 20;

    var drag = d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("drag", dragmove);

    var svg = d3.select("#drag-multiples").selectAll("svg")
        .data(d3.range(16).map(function() { return {x: width / 2, y: height / 2}; }))
      .enter().append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("circle")
        .attr("r", radius)
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .call(drag);

    function dragmove(d) {
      d3.select(this)
          .attr("cx", d.x = Math.max(radius, Math.min(width - radius, d3.event.x)))
          .attr("cy", d.y = Math.max(radius, Math.min(height - radius, d3.event.y)));
    }
  }

  zoomExample(){
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .domain([-width / 2, width / 2])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([-height / 2, height / 2])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(-height);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
        .tickSize(-width);

    var zoom = d3.behavior.zoom()
        .x(x)
        .y(y)
        .scaleExtent([1, 32])
        .on("zoom", zoomed);

    var svg = d3.select("#zoom-section").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);

    svg.append("rect")
        .attr("width", width)
        .attr("height", height);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    function zoomed() {
      svg.select(".x.axis").call(xAxis);
      svg.select(".y.axis").call(yAxis);
    }
  }

}
