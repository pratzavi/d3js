import { Component, OnInit } from '@angular/core';
declare var d3: any;

@Component({
  selector: 'app-load-ext-data',
  templateUrl: './load-ext-data.component.html',
  styleUrls: ['./load-ext-data.component.css']
})
export class LoadExtDataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loadCSV() {
    d3.csv('assets/data.csv', this.onDataReady);
  }

  onDataReady(animal_data) {
    console.log(animal_data);

    d3.select('p.ext').selectAll('p')
      .data(animal_data)
      .enter()
      .append('p')
      .text( function(d) {
        return 'A ' + d['animal'] + ' can live for up to ' + d['age'] + ' years!';
      });
  }

}
