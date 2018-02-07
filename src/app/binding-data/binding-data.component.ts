import { Component, OnInit } from '@angular/core';
declare var d3: any;

@Component({
  selector: 'app-binding-data',
  templateUrl: './binding-data.component.html',
  styleUrls: ['./binding-data.component.css']
})
export class BindingDataComponent implements OnInit {

  dataSet: Array<number> = [10, 20, 30, 25, 15];
  tempD: string;
  tempI: string;
  tempThis: string;
  circles: any;
  circlesData: Array<any>;

  constructor() { }

  ngOnInit() {
    
  }

  addData(){
    d3.select("#list").selectAll("li").data([10, 20, 30, 25, 15]);
  }

  updateData(){
    d3.select("#list").selectAll("li")
    .data(this.dataSet)
    .text(function(d) { return d; });
  }

  createNew(){
    d3.select("#list").selectAll("li")
   .data([10, 20, 30, 25, 15])
   .text(function(d) { return "This is pre-existing element and the value is " + d; })
   .enter()
   .append("li")
   .text(function(d) 
      { return "This is dynamically created element and the value is " + d; });
  }

  exit(){
    d3.selectAll("li")
   .data([10, 20, 30, 15])
   .exit()
   .remove()
  }

  datum(){
    d3.select("p")
      .datum(50)
      .text(function(d) { 
        return "Used existing paragraph element and the data " + d + " is assigned."; 
    });
      
    d3.select("div#fromDatum")
      .datum(100)
      .append("p")
      .text(function(d) { 
        return "Created new paragraph element and the data " + d + " is assigned."; 
    });
  }

  dataFnUsage(){
    const self = this;
    self.tempD = "";
    self.tempI = "";
    self.tempThis = "";
    let data = [1, 2, 3];
    let paragraph = d3.select("body")
    .selectAll("#dumData li")
    .data(data)
    .text(function (d, i) {
      console.log(d); // the data element
      console.log(i); // the index element
      console.log(this); // the current DOM object
      self.tempD+= d; // the data element
      self.tempI+= i; // the index element
      self.tempThis+= this; // the current DOM object
      return "The index is " + i + " and the data is " + d;
   });
  }

  dataStructure(){
    const x = [1, 2, 3]; // x coordinates
    const y = [1, 3, 2]; // y coordinates
    const r = [5, 5, 5]; // radius
    const c = ['red', 'green', 'blue']; // colors

    this.circlesData = [{
        x: '25%',
        y: '25%',
        r: 15,
        c: 'red'
    }, {
        x: '50%',
        y: '50%',
        r: 15,
        c: 'green'
    }, {
        x: '75%',
        y: '75%',
        r: 15,
        c: 'blue'
    }];

    const mySvg = d3.select('#my-svg');
    this.circles = mySvg
      .selectAll('circle')
      .data(this.circlesData);
    console.log(this.circles);
  }

  createCircles(){
    this.circles
    .enter()
    .append('circle')
    .attr('cx', function(d) {
        return d.x;
    })
    .attr('cy', function(d) {
        return d.y;
    })
    .attr('fill', function(d){
        return d.c;
    })
    .attr('r', function(d) {
        return d.r;
    });
  }


  dataChanges(){
    // change coordinates of the first circle:
    this.circlesData[0].x = '10%';
    this.circlesData[0].y = '10%';

    // add a new circle:
    this.circlesData.push({
        x: '85%',
        y: '85%',
        r: 15,
        c: 'yellow'
    });
    const mySvg = d3.select('#my-svg');
    this.circles = mySvg
    .selectAll('circle')
    .data(this.circlesData);
  }

  createNewCircle(){
    // change coordinates of the first circle:
    this.circlesData[0].x = "10%";
    this.circlesData[0].y = "10%";

    // add a new circle:
    this.circlesData.push({
        x: "80%",
        y: "80%",
        r: 15,
        c: 'yellow'
    });
    this.createCircles();
  }

  updateExisting(){
    // update (x,y) coordinates:
    this.circles
    .attr('cx', function(d) {
        return d.x;
    })
    .attr('cy', function(d) {
        return d.y;
    });
  }

  removeCircles(){
    const mySvg = d3.select('#my-svg');
    mySvg
    .selectAll('circle')
    .data([])
    .exit()
    .remove();
  }

  createMySvg(){
    const data = [{
        x: '25%',
        y: '25%',
        r: '5%',
        c: 'red'
    }, {
        x: '50%',
        y: '50%',
        r: '5%',
        c: 'green'
    }, {
        x: '75%',
        y: '75%',
        r: '5%',
        c: 'blue'
    }];

  const svg = d3.select('#my-svg2');

  const circles = svg
      .selectAll('circle')
      .data(data);

  circles
      .enter()
      .append('circle')
      .attr('cx', function(d) {
          return d.x;
      })
      .attr('cy', function(d) {
          return d.y;
      })
      .attr('fill', function(d) {
          return d.c;
      })
      .attr('r', function(d) {
          return d.r;
      });
  }

  UpdateDataWithIndex(){
    // reset the `data` array with new circles:
    const data = [{
        x: '33%',
        y: '33%',
        r: '5%',
        c: 'orange'
    }, {
        x: '66%',
        y: '66%',
        r: '5%',
        c: 'cyan'
    }, {
        x: '25%',
        y: '25%',
        r: '5%',
        c: 'magenta'
    }];
    const svg = d3.select('#my-svg2');
    const circles = svg
        .selectAll('circle')
        .data(data);

    // update (x,y) coordinates of existing elements:
    circles
        .transition()
        .attr('cx', function(d) {
            return d.x;
        })
        .attr('cy', function(d) {
            return d.y;
        });

    // create new elements:
    circles
        .enter()
        .append('circle')
        .attr('cx', function(d) {
            return d.x;
        })
        .attr('cy', function(d) {
            return d.y;
        })
        .attr('fill', function(d) {
            return d.c;
        })
        .attr('r', 0)
        .transition()
        .attr('r', function(d) {
            return d.r;
        });

    // remove old elements:
    circles
        .exit()
        .transition()
        .attr('r', 0)
        .remove();
  }

  createSvgWithID(){
    const data = [{
        id: 'before1',
        x: '25%',
        y: '25%',
        r: '5%',
        c: 'red'
    }, {
        id: 'before2',
        x: '50%',
        y: '50%',
        r: '5%',
        c: 'green'
    }, {
        id: 'before3',
        x: '75%',
        y: '75%',
        r: '5%',
        c: 'blue'
    }];

    const mySvg = d3.select('#my-svg3');

    const circles = mySvg
        .selectAll('circle')
        .data(data, function(d) {
            return d.id;
        });

    circles
        .enter()
        .append('circle')
        .attr('cx', function(d) {
            return d.x;
        })
        .attr('cy', function(d) {
            return d.y;
        })
        .attr('fill', function(d) {
            return d.c;
        })
        .attr('r', function(d) {
            return d.r;
        });
  }

  updateDataWithID(){
    // reset the `data` array with new circles:
    const data = [{
        id: 'after1',
        x: '33%',
        y: '33%',
        r: '5%',
        c: 'orange'
    }, {
        id: 'after2',
        x: '66%',
        y: '66%',
        r: '5%',
        c: 'cyan'
    }, {
        id: 'after3',
        x: '25%',
        y: '25%',
        r: '5%',
        c: 'magenta'
    }];
    const mySvg = d3.select('#my-svg3');
    const circles = mySvg
        .selectAll('circle')
        .data(data, function(d) {
            return d.id;
        });

    // update (x,y) coordinates of existing elements:
    circles
        .transition()
        .attr('cx', function(d) {
            return d.x;
        })
        .attr('cy', function(d) {
            return d.y;
        });

    // create new elements:
    circles
        .enter()
        .append('circle')
        .attr('cx', function(d) {
            return d.x;
        })
        .attr('cy', function(d) {
            return d.y;
        })
        .attr('fill', function(d) {
            return d.c;
        })
        .attr('r', 0)
        .transition()
        .attr('r', function(d) {
            return d.r;
        });

    // remove old elements:
    circles
        .exit()
        .transition()
        .attr('r', 0)
        .remove();
  }

}
