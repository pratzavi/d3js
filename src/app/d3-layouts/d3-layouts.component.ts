import { Component, OnInit } from '@angular/core';
declare var d3: any;
declare var helpers: any;

@Component({
  selector: 'app-d3-layouts',
  templateUrl: './d3-layouts.component.html',
  styleUrls: ['./d3-layouts.component.css']
})
export class D3LayoutsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.histogram();
    this.chord();
    this.force();
    this.pack();
    this.partition();
    this.stack();
    this.tree();
    this.treeMap();
    this.cluster();
  }

  histogram(){
    var width = 800,
    height = 300,
    pad = 20, 
    left_pad = 100;

    var x = d3.scale.ordinal().rangeRoundBands([left_pad, width-pad], 0.1);
    var y = d3.scale.linear().range([height-pad, pad]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left");

    var svg = d3.select("#graph")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

    d3.json('assets/histogram-hours.json', function (data) {

        data = d3.keys(data).map(function (key) {
            return {bucket: Number(key),
                    N: data[key]};
        });

        x.domain(data.map(function (d) { return d.bucket; }));
        y.domain([0, d3.max(data, function (d) { return d.N; })]);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0, "+(height-pad)+")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate("+(left_pad-pad)+", 0)")
            .call(yAxis);

        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', function (d) { return x(d.bucket); })
            .attr('width', x.rangeBand())
            .attr('y', height-pad)
            .transition()
            .delay(function (d) { return d.bucket*20; })
            .duration(800)
            .attr('y', function (d) { return y(d.N); })
            .attr('height', function (d) { return height-pad - y(d.N); });

    });
  }

  chord(){
    var width = 800,
    height = 1024,
    svg = d3.select('#chord')
        .append('svg')
        .attr({width: width,
               height: height});

    d3.json('assets/karma_matrix.json', function (data) {
        
        var uniques = helpers.uniques(data, function (d) { return d.from; }),
            matrix = helpers.connection_matrix(data);

        var innerRadius = Math.min(width, height)*0.3,
            outerRadius = innerRadius*1.1;

        var chord = d3.layout.chord()
                .padding(.05)
                .sortGroups(d3.descending)
                .sortSubgroups(d3.descending)
                .sortChords(d3.descending)
                .matrix(matrix);

        var diagram = svg.append('g')
                .attr('transform', 'translate('+width/2+','+height/2+')');


        var group = diagram.selectAll('.group')
                .data(chord.groups)
                .enter()
                .append('g'),
            arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

        group.append('path')
            .attr('d', arc)
            .attr('fill', function (d) { return helpers.color(d.index); });

        group.call(helpers.arc_labels(function (d) { return uniques[d.index]; },
                                      function () { return outerRadius+10; }));

        diagram.append('g')
            .classed('chord', true)
            .selectAll('path')
            .data(chord.chords)
            .enter()
            .append('path')
            .attr('d', d3.svg.chord().radius(innerRadius))
            .attr('fill', function (d, i) { return helpers.color(d.target.index); });
    });
  }

  force(){
    var width = 800,
    height = 1000,
    svg = d3.select('#force')
        .append('svg')
        .attr({width: width,
               height: height});

    d3.json('assets/karma_matrix.json', function (data) {

        var nick_id = helpers.nick_id(data, function (d) { return d.from; }),
            uniques = nick_id.domain(),
            matrix = helpers.connection_matrix(data);

        var nodes = uniques.map(function (nick) {
            return {nick: nick};
        });
        var links = data.map(function (d) {
            return {source: nick_id(d.from),
                    target: nick_id(d.to),
                    count: matrix[nick_id(d.from)][nick_id(d.to)]};
        });

        var force = d3.layout.force()
                .nodes(nodes)
                .links(links)
                .gravity(0.5)
                .size([width, height]);

        force.start();

        var weight = d3.scale.linear()
                .domain(d3.extent(nodes.map(function (d) { return d.weight; })))
                .range([5, 30]),
            distance = d3.scale.linear()
                .domain(d3.extent(d3.merge(matrix)))
                .range([300, 100]),
            given = d3.scale.linear()
                .range([2, 35]);
        
        force.linkDistance(function (d) {
                return distance(d.count);
            });

        force.start();

        var link = svg.selectAll("line")
                .data(links)
                .enter()
                .append("line")
                .classed('link', true);
        
        var node = svg.selectAll("circle")
                .data(nodes)
                .enter()
                .append("circle")
                .attr({r: function (d) { return weight(d.weight); },
                      fill: function (d) { return helpers.color(d.index); },
                      class: function (d) { return 'nick_'+nick_id(d.nick); }})
                .classed('node', true)
                .on('mouseover', function (d) {
                    highlight(d, uniques, given, matrix, nick_id);
                })
                .on('mouseout', function (d) {
                    dehighlight(d, weight);
                });

        node.call(helpers.tooltip(function (d) { return d.nick; }));
        node.call(force.drag);

        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            
            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        });
    });

    function highlight (d, uniques, given, matrix, nick_id) {
        given.domain(d3.extent(matrix[nick_id(d.nick)]));

        uniques.map(function (nick) {
            var count = matrix[nick_id(d.nick)][nick_id(nick)];

            if (nick != d.nick) {
                d3.selectAll('circle.nick_'+nick_id(nick))
                    .transition()
                    .attr('r', given(count));
            }
        });
    }

    function dehighlight (d, weight) {
        d3.selectAll('.node')
            .transition()
            .attr('r', function (d) { return weight(d.weight); });
    }
  }

  pack(){
    var width = 800,
    height = 800,
    svg = d3.select('#pack')
        .append('svg')
        .attr({width: width,
               height: height});

    d3.json('assets/karma_matrix.json', function (data) {

        var tree = helpers.make_tree(data,
                                    function (d, nick) { return d.to == nick; },
                                    function (d, nick) { return d.to == nick; },
                                    function (d) { return d.from; },
                                    function (d) { return d[0].from; });
        helpers.fixate_colors(data);

        var pack = d3.layout.pack()
                .padding(5)
                .size([width/1.5, height/1.5])
                .value(function (d) { return d.count; });

        var nodes = pack.nodes(tree);

        svg.append('g')
            .attr('transform', 'translate(100, 100)')
            .selectAll('g')
            .data(nodes)
            .enter()
            .append('circle')
            .attr({r: function (d) { return d.r; },
                  cx: function (d) { return d.x; },
                  cy: function (d) { return d.y; }})
            .attr('fill', function (d) { return helpers.color(d.nick); })
            .call(helpers.tooltip(function (d) { return d.nick; }));
    });
  }

  partition(){
    var width = 800,
    height = 800,
    svg = d3.select('#partition')
        .append('svg')
        .attr({width: width,
               height: height});

    d3.json('assets/karma_matrix.json', function (data) {
        
        var tree = helpers.make_tree(data,
                                    function (d, nick) { return d.to == nick; },
                                    function (d, nick) { return d.to == nick; },
                                    function (d) { return d.from; },
                                    function (d) { return d[0].from; });
        helpers.fixate_colors(data);

        var partition = d3.layout.partition()
                .value(function (d) { return d.count; })
                .sort(function (a, b) {
                    return d3.descending(a.count, b.count);
                })
                .size([2*Math.PI, 300]);

        var nodes = partition.nodes(tree);

        var arc = d3.svg.arc()
                .innerRadius(function (d) { return d.y; })
                .outerRadius(function (d) { return d.depth ? d.y+d.dy/d.depth : 0; });

        nodes = nodes.map(function (d) {
            d.startAngle = d.x;
            d.endAngle = d.x+d.dx;
            return d;
        });

        nodes = nodes.filter(function (d) { return d.depth; });

        var chart = svg.append('g')
                .attr('transform', 'translate('+width/2+','+height/2+')');

        var node = chart.selectAll('g')
                .data(nodes)
                .enter()
                .append('g');
        
        node.append('path')
            .attr({d: arc,
                  fill: function (d) { return helpers.color(d.nick); }});
        
        node.filter(function (d) { return d.depth > 1 && d.count > 10; })
            .call(helpers.arc_labels(function (d) { return d.nick; },
                                    arc.outerRadius()));

        node.call(helpers.tooltip(function (d) { return d.nick; }));
    });
  }

  stack(){
    var width = 800,
    height = 768,
    svg = d3.select('#stack')
        .append('svg')
        .attr({width: width,
               height: height});

    d3.json('assets/karma_matrix.json', function (data) {

        var time = d3.time.format('%Y-%m-%d %H:%M:%S'),
            extent = d3.extent(data.map(function (d) { return time.parse(d.time); })),
            time_bins = d3.time.days(extent[0], extent[1], 12);

        var per_nick = helpers.bin_per_nick(data, function (d) { return d.to; });

        var time_binned  = per_nick.map(function (nick_layer) {
            return {to: nick_layer[0].to,
                    values: d3.layout.histogram()
                    .bins(time_bins)
                    .value(function (d) { return time.parse(d.time); })(nick_layer)};
        });

        var layers = d3.layout.stack()
                .order('inside-out')
                .offset('wiggle')
                .values(function (d) { return d.values; })(time_binned);

        var margins = {
            top: 220,
            right: 50,
            bottom: 0,
            left: 50
        };

        var x = d3.time.scale()
                .domain(extent)
                .range([margins.left, width-margins.right]),
            y = d3.scale.linear()
                .domain([0, d3.max(layers, function (layer) {
                    return d3.max(layer.values, function (d) { 
                        return d.y0+d.y; 
                    });
                })])
                .range([height-margins.top, 0]);

        var offset = 100,
            area = d3.svg.area()
                .x(function(d) { return x(d.x); })
                .y0(function(d) { return y(d.y0)+offset; })
                .y1(function(d) { return y(d.y0 + d.y)+offset; });

        svg.selectAll('path')
            .data(layers)
            .enter()
            .append('path')
            .attr('d', function (d) { return area(d.values); })
            .style('fill', function (d, i) { return helpers.color(i); })
            .call(helpers.tooltip(function (d) { return d.to; }));
        
        var xAxis = d3.svg.axis()
                .scale(x)
                .tickFormat(d3.time.format('%b %Y'))
                .ticks(d3.time.months, 2)
                .orient('bottom');

        svg.append('g')
            .attr('transform', 'translate(0, '+(height-100)+')')
            .classed('axis', true)
            .call(xAxis);

    });
  }

  tree(){
    var width = 800,
    height = 1024,
    svg = d3.select('#tree')
        .append('svg')
        .attr({width: width,
               height: height});

    d3.json('assets/karma_matrix.json', function (data) {
        
        helpers.fixate_colors(data);

        var tree = helpers.make_tree(data,
                                    function (d, nick) { return d.to == nick; },
                                    function (d, nick) { return d.from == nick; },
                                    function (d) { return d.to; },
                                    function (d) { return d[0].to; });

        var diagonal = d3.svg.diagonal.radial()
                .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

        var layout = d3.layout.tree()
                .size([360, width/2 - 120]);

        var nodes = layout.nodes(tree),
            links = layout.links(nodes);

        var chart = svg.append('g')
                .attr('transform', 'translate('+width/2+','+height/2+')');
        
        var link = chart.selectAll(".link")
                .data(links)
                .enter().append("path")
                .attr("class", "link")
                .attr("d", diagonal);
        
        var node = chart.selectAll(".node")
                .data(nodes)
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; });
        
        node.append("circle")
            .attr("r", 4.5)
            .attr('fill', function (d) { return helpers.color(d.nick); });
        
        node.append("text")
            .attr("dy", ".31em")
            .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
            .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
            .text(function(d) { return d.nick; })
            .style('font-size', function (d) { return d.depth > 1 ? '0.8em' : '1.1em'; });
    });
  }

  treeMap(){
    var width = 800,
    height = 800,
    svg = d3.select('#tree-map')
        .append('svg')
        .attr({width: width,
               height: height});

    d3.json('assets/karma_matrix.json', function (data) {
      
        var tree = helpers.make_tree(data,
                                    function (d, nick) { return d.to == nick; },
                                    function (d, nick) { return d.to == nick; },
                                    function (d) { return d.from; },
                                    function (d) { return d[0].from; });
        helpers.fixate_colors(data);
    
        var treemap = d3.layout.treemap()
                .size([width, height])
                .padding(3)
                .value(function (d) { return d.count; })
                .sort(d3.ascending);

        var nodes = treemap.nodes(tree)
                .filter(function (d) { return d.depth; });

        var node = svg.selectAll('g')
                .data(nodes)
                .enter()
                .append('g')
                .classed('node', true)
                .attr('transform', function (d) { return 'translate('+d.x+','+d.y+')'; });

        node.append('rect')
            .attr({width: function (d) { return d.dx; },
                  height: function (d) { return d.dy; },
                  fill: function (d) { return helpers.color(d.nick); }});

        var leaves = node.filter(function (d) { return d.depth > 1; });

        leaves.append('text')
            .text(function (d) { return d.nick; })
            .attr('text-anchor', 'middle')
            .attr('transform', function (d) { 
                var box = this.getBBox(),
                    transform = 'translate('+(d.dx/2)+','+(d.dy/2+box.height/2)+')';

                if (d.dx < box.width && d.dx > box.height && d.dy > box.width) {
                    transform += 'rotate(-90)';
                }else if (d.dx < box.width || d.dy < box.height) {
                    d3.select(this).remove();
                }

                return transform;
            });
    
        leaves.call(helpers.tooltip(function (d) { return d.parent.nick; }));

        leaves.on('mouseover', function (d) {
            var belongs_to = d.parent.nick;

            svg.selectAll('.node')
                .transition()
                .style('opacity', function (d) {
                    if (d.depth > 1 && d.parent.nick != belongs_to) {
                        return 0.3;
                    }
                    if (d.depth == 1 && d.nick != belongs_to) {
                        return 0.3;
                    }
                    return 1;
                });
        })
            .on('mouseout', function () {
                d3.selectAll('.node')
                    .transition()
                    .style('opacity', 1);
            });
    });
  }

  cluster(){
    var width = 800,
    height = 2800,
    svg = d3.select('#cluster')
        .append('svg')
        .attr({width: width,
               height: height});

    d3.json('assets/karma_matrix.json', function (data) {

        var tree = helpers.make_tree(data,
                                    function (d, nick) { return d.to == nick; },
                                    function (d, nick) { return d.from == nick; },
                                    function (d) { return d.to; },
                                    function (d) { return d[0].to; });

        helpers.fixate_colors(data);

        var diagonal = d3.svg.diagonal()
                .projection(function (d) { return [d.y, d.x]; });

        var cluster = d3.layout.cluster()
                .size([height, width-150])
                .sort(function (a, b) { return d3.descending(a.count, b.count); });

        var nodes = cluster.nodes(tree),
            links = cluster.links(nodes);

        svg.selectAll('.link')
            .data(links)
            .enter()
            .append('path')
            .classed('link', true)
            .attr('d', diagonal);

        var node = svg.selectAll('.node')
                .data(nodes)
                .enter()
                .append('g')
                .classed('node', true)
                .attr('transform', function (d) { return 'translate('+d.y+', '+d.x+')'; });

        node.append('circle')
            .attr({r: 5,
                  fill: function (d) { return helpers.color(d.nick); }});

        node.append('text')
            .text(function (d) { return d.nick; })
            .attr("dx", function(d) { return d.children.length ? -8 : 8; })
            .attr("dy", function (d) { return d.depth > 1 ? 3 : 5; })
            .attr("text-anchor", function(d) { return d.children.length ? "end" : "start"; })
            .style('font-size', function (d) { return d.depth > 1 ? '0.8em' : '1.1em'; });
    });
  }

}
