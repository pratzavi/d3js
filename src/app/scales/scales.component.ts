import { Component, OnInit } from '@angular/core';
declare let d3: any;

@Component({
  selector: 'app-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.css']
})
export class ScalesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  simpleExample(minDomain, maxDomain){
    const data = [ 0, 2, 3, 5, 7.5, 9, 10 ];
    let myScale = d3.scale.linear()
            .domain([minDomain, maxDomain])
            .range([0, 600]);

    d3.select('svg .inner')
        .selectAll('circle')
        .data(data)
        .attr('r', 3)
        .attr('cx', function(d) {
            return myScale(d);
        })
        .enter()
        .append('circle')
        .attr('r', 3)
        .attr('cx', function(d) {
            return myScale(d);
        });

    d3.select('svg .inner')
        .selectAll('text')
        .data(data)
        .attr('x', function(d) {
            return myScale(d);
        })
        .attr('y', -8)
        .text(function(d) {
            return d;
        })
        .enter()
        .append('text')
        .attr('x', function(d) {
            return myScale(d);
        })
        .attr('y', -8)
        .text(function(d) {
            return d;
        });
    }

    linearScaleColor(){
        const data = [ 0, 2, 3, 5, 7.5, 9, 10 ];
        let linearScale = d3.scale.linear()
        .domain([0, 10])
        .range(['yellow', 'red']);

        d3.select('svg.ex-2')
            .selectAll('rect')
            .data(data)
            .attr('x', function(d) {
                return d;
            })
            .attr('y', 0)
            .attr('width', function(d) {
                return d*25;
            })
            .attr('height', 100)
            .attr('fill', function(d) {
                return linearScale(d);
            })
            .enter()
            .append('rect')
            .attr('x', function(d) {
                return d;
            })
            .attr('y', 0)
            .attr('width', function(d) {
                return d*20;
            })
            .attr('height', 100)
            .attr('fill', function(d) {
                return linearScale(d);
            });
    }

    scaleSqrt(){
        const data = [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ];
        let sqrtScale = d3.scale.sqrt()
        .domain([0, 100])
        .range([0, 30]);

        d3.select('svg.ex-3')
            .selectAll('circle')
            .data(data)
            .attr('cx', function(d) {
                return d*6;
            })
            .attr('cy', 50)
            .attr('r', function(d) {
                return sqrtScale(d);
            })
            .attr('fill', 'gray')
            .enter()
            .append('circle')
            .attr('cx', function(d) {
                return d*6;
            })
            .attr('cy', 50)
            .attr('r', function(d) {
                return sqrtScale(d);
            })
            .attr('fill', 'blue');
    }

    scaleLog(){
        const data = [ 10, 100, 1000, 10000, 100000];
        let logScale = d3.scale.log()
        .domain([10, 100000])
        .range([0, 600]);

        d3.select('svg.ex-4')
        .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('r', 2)
            .attr('cy', 55)
            .attr('cx', function(d) {
                return logScale(d);
            });

        d3.select('svg.ex-4')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('x', function(d) {
                return logScale(d);
            })
            .attr('y', 50)
            .text(function(d) {
                return d;
            });
    }

    scaleTime(){
        const data = [ new Date(2016, 0, 1), new Date(2016, 5, 10), new Date(2017, 2, 5), new Date(2017, 9, 15) ];
        let timeScale = d3.scale.log()
        .domain([new Date(2016, 0, 1), new Date(2018, 11, 1)])
        .range([0, 700]);

        d3.select('svg.ex-5 .inner')
        .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('r', 2)
            .attr('cy', 8)
            .attr('cx', function(d) {
                return timeScale(d);
            });
        d3.select('svg.ex-5 .inner')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('x', function(d) {
                return timeScale(d);
            })
            .text(function(d) {
                return d.toDateString();
            });
    }

    withoutNice(){
        const data = [0.243, 0.584, 0.987, 0.153, 0.433];
        const extent = d3.extent(data);
        
        const linearScale = d3.scale.linear()
          .domain(extent)
          .range([0, 600]);
        
        const axis = d3.svg.axis().scale(linearScale);

        d3.select('.withoutnice')
            .call(axis);
    }

    withNice(){
        const data = [0.243, 0.584, 0.987, 0.153, 0.433];
        const extent = d3.extent(data);
        
        const linearScale = d3.scale.linear()
          .domain(extent)
          .range([0, 600])
          .nice();
        
        const axis = d3.svg.axis().scale(linearScale);
            
        d3.select('.withnice')
            .call(axis);
    }

    multiSegment(){
        const data = [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10];
        const linearScale = d3.scale.linear()
            .domain([-10, 0, 10])
            .range(['red', '#ddd', 'blue']);
        const xScale = d3.scale.linear()
            .domain([-10, 10])
            .range([0, 700]);
        
        d3.select('.ex-8 .multiSegment')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('cx', function(d) {
            return xScale(d);
        })
        .style('fill', function(d) {
            return linearScale(d);
        });
    }

    invert(){
        const linearScale = d3.scale.linear()
        .domain([-50, 50])
        .range([0, 600])
        .nice();

        // Construct axis
        const axis = d3.svg.axis().scale(linearScale);
        d3.select('.ex-9 .inner')
            .call(axis);

        // Update click area size
        d3.select('.ex-9 .click-area')
            .on('mouseover', function() {
                const pos = d3.mouse(this);
                const xPos = pos[0];
                const value = linearScale.invert(xPos);
                d3.select('.info')
                    .text('You hovered on ' + value.toFixed(2));
            });
    }

    quantizeScale(){
        const myData = d3.range(0, 100, 1);

        const linearScale = d3.scale.linear()
            .domain([0, 100])
            .range([0, 600]);

        const quantizeScale = d3.scale.quantize()
            .domain(myData)
            .range(['lightblue', 'orange', 'lightgreen', 'pink']);
        
        
        
        d3.select('.ex-10 g')
            .selectAll('rect')
            .data(myData)
            .enter()
            .append('rect')
            .attr('x', function(d) {
                return linearScale(d);
            })
            .attr('width', 5)
            .attr('height', 30)
            .style('fill', function(d) {
                return quantizeScale(d);
            });
    }

    quantileScale(){
        const myData = [0, 5, 7, 10, 20, 30, 35, 40, 60, 62, 65, 70, 80, 90, 100];
        const linearScale = d3.scale.linear()
            .domain([0, 100])
            .range([0, 600]);
        
        const quantileScale = d3.scale.quantile()
            .domain(myData)
            .range(['lightblue', 'orange', 'lightgreen']);
        
        d3.select('.ex-11 g')
            .selectAll('rect')
            .data(myData)
            .enter()
            .append('rect')
            .attr('x', function(d) {
                return linearScale(d);
            })
            .attr('width', 5)
            .attr('height', 30)
            .style('fill', function(d) {
                return quantileScale(d);
            });
    }

    thresholdScale(){
        const myData = d3.range(-20, 120, 2);
        const linearScale = d3.scale.linear()
            .domain([-20, 120])
            .range([0, 600]);
        
        const thresholdScale = d3.scale.threshold()
            .domain([0, 50, 100])
            .range(['#000', 'lightblue', 'orange', '#900']);
        
        d3.select('.ex-12 g')
            .selectAll('rect')
            .data(myData)
            .enter()
            .append('rect')
            .attr('x', function(d) {
                return linearScale(d);
            })
            .attr('width', 5)
            .attr('height', 30)
            .style('fill', function(d) {
                return thresholdScale(d);
            });
    }

    ordinalScale(){
        const myData = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const linearScale = d3.scale.linear()
            .domain([0, 6])
            .range([0, 600]);
        
        const ordinalScale = d3.scale.ordinal()
            .domain(myData)
            .range(['#f00', '#0f0', '#00f']);
        
        d3.select('.ex-13 g')
            .selectAll('text')
            .data(myData)
            .enter()
            .append('text')
            .attr('x', function(d, i) {
                return linearScale(i);
            })
            .text(function(d){
                return d;
            })
            .style('fill', function(d) {
                return ordinalScale(d);
            });
    }

    categoricalScale10(){
        const myData = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const linearScale = d3.scale.linear()
            .domain([0, 6])
            .range([0, 600]);
        
        const ordinalScale = d3.scale.category10()
            .domain(myData);
        
        d3.select('.ex-14 g')
            .selectAll('text')
            .data(myData)
            .enter()
            .append('text')
            .attr('x', function(d, i) {
                return linearScale(i);
            })
            .text(function(d){
                return d;
            })
            .style('fill', function(d) {
                return ordinalScale(d);
            });
    }

    categoricalScale20(){
        const myData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const linearScale = d3.scale.linear()
            .domain([0, 11])
            .range([0, 600]);
        
        const ordinalScale = d3.scale.category20()
            .domain(myData);
        
        d3.select('.ex-15 g')
            .selectAll('text')
            .data(myData)
            .enter()
            .append('text')
            .attr('x', function(d, i) {
                return linearScale(i);
            })
            .text(function(d){
                return d;
            })
            .style('fill', function(d) {
                return ordinalScale(d);
            });
    }

    categoricalScale20b(){
        const myData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const linearScale = d3.scale.linear()
            .domain([0, 11])
            .range([0, 600]);
        
        const ordinalScale = d3.scale.category20b()
            .domain(myData);
        
        d3.select('.ex-16 g')
            .selectAll('text')
            .data(myData)
            .enter()
            .append('text')
            .attr('x', function(d, i) {
                return linearScale(i);
            })
            .text(function(d){
                return d;
            })
            .style('fill', function(d) {
                return ordinalScale(d);
            });
    }

    categoricalScale20c(){
        const myData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const linearScale = d3.scale.linear()
            .domain([0, 11])
            .range([0, 600]);
        
        const ordinalScale = d3.scale.category20c()
            .domain(myData);
        
        d3.select('.ex-17 g')
            .selectAll('text')
            .data(myData)
            .enter()
            .append('text')
            .attr('x', function(d, i) {
                return linearScale(i);
            })
            .text(function(d){
                return d;
            })
            .style('fill', function(d) {
                return ordinalScale(d);
            });
    }

    bandScale(){
        const myData = [
            {day : 'Mon', value: 10},
            {day : 'Tue', value: 40},
            {day : 'Wed', value: 30},
            {day : 'Thu', value: 60},
            {day : 'Fri', value: 30}
        ];
        const bandScale = d3.scale.ordinal()
            .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
            .rangeBands([0, 600], 0.05, 1);
        
        d3.select('.ex-18 g')
        .selectAll('rect')
        .data(myData)
        .enter()
        .append('rect')
        .attr('x', function(d) {
            return bandScale(d.day);
        })
        .style('fill', 'orange')
        .attr('width', bandScale.rangeBand())
        .attr('height', function(d) {
            return d.value;
        });

        d3.select('.ex-18 g')
        .selectAll('text')
        .data(myData)
        .enter()
        .append('text')
        .attr('y', function(d) {
            return d.value + 20;
        })
        .attr('x', function(d) {
            return bandScale(d.day) + 20;
        })
        .text(function(d){
            return d.value;
        });
    }

}
