import { Component, OnInit } from '@angular/core';
declare var d3: any;

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.css']
})
export class AnimationsComponent implements OnInit {
  private easing = [
    "easeElastic",
    "easeBounce",
    "easeLinear",
    "easeSin",
    "easeQuad",
    "easeCubic",
    "easePoly",
    "easeCircle",
    "easeExp",
    "easeBack"
  ];
  methods: Array<any>;

  private easing_v3= ["in", "out", "in-out", "out-in"]
  hideTransition:boolean = true;

  constructor() { 
    this.methods = [
      "transition.attr - smoothly transition to the new attribute value.",
      "transition.attrTween - smoothly transition between two attribute values.",
      "transition.style - smoothly transition to the new style property value.",
      "transition.styleTween - smoothly transition between two style property values.",
      "transition.text - set the text content when the transition starts.",
      "transition.tween - specify a custom tween operator to run as part of the transition.",
      "transition.select - start a transition on a descendant element for each selected element.",
      "transition.selectAll - start a transition on multiple descendants for each selected element.",
      "transition.filter - filter a transition based on data.",
      "transition.remove - remove selected elements at the end of a transition.",
      "transition.empty - returns true if the transition is empty.",
      "transition.node - returns the first node in the transition.",
      "transition.size - returns the number of elements in the selection.",
      "transition.each - add a listener for transition end events.",
      "transition.call - call a function passing in the current transition."
    ]
  }

  ngOnInit() {
  }

  simpleTransition(){
    d3.select("body")
      .transition()
      .style("background-color", "lightblue");
  }

  transitionWithDuration(){
    d3.select("body")
      .transition()
      .duration(2000)
      .style("background-color", "#f55");
  }

  simpleEaseTransition(){
    const svg = d3.select("#svg-container");
    const bar1 = svg.append("rect")
                .attr("fill", "blue")
                .attr("x", 100)
                .attr("y", 20)
                .attr("height", 20)
                .attr("width", 10)

    const bar2 = svg.append("rect")
                .attr("fill", "blue")
                .attr("x", 120)
                .attr("y", 20)
                .attr("height", 20)
                .attr("width", 10)

    update();

    function update() {
        bar1.transition()
            .ease("in")
            .duration(2000)
            .attr("height",100)

        bar2.transition()
            .ease("in-out")
            .duration(2000)
            .delay(2000)
            .attr("height",100)
    }
  }

  transitionWithEase(){
    this.hideTransition = false;
    this.circleTransition(d3.easeElastic,0);
    this.circleTransition(d3.easeBounce,1);
    this.circleTransition(d3.easeLinear,2);
    this.circleTransition(d3.easeSin,3);
    this.circleTransition(d3.easeQuad,4);
    this.circleTransition(d3.easeCubic,5);
    this.circleTransition(d3.easePoly,6);
    this.circleTransition(d3.easeCircle,7);
    this.circleTransition(d3.easeExp,8);
    this.circleTransition(d3.easeBack,9);
  }

  circleTransition(easement,yPos){ 
    const timeCircle = d3.select("#svg-container").append("circle")
        .attr("fill", "steelblue")
        .attr("r", 20);
    
    repeat();
    
    function repeat() {
      timeCircle
        .attr('cx', 210)          // position the circle at 40 on the x axis
        .attr('cy', (yPos*45)+25) // position the circle at 250 on the y axis
        .transition()             // apply a transition
        .ease(easement)           // control the speed of the transition
        .duration(4000)           // apply it over 2000 milliseconds
        .attr('cx', 720)          // move the circle to 920 on the x axis
        .transition()             // apply a transition
        .ease(easement)           // control the speed of the transition
        .duration(4000)           // apply it over 2000 milliseconds
        .attr('cx', 210)          // return the circle to 40 on the x axis
        .on("end", repeat);       // when the transition finishes start again
    };

    let easeType = d3.select("#svg-container").append("text")
        .attr("dy", ".35em") // set offset y position
        .attr("x", 475)
        .attr("text-anchor", "middle") // set anchor x justification
        .attr("y", (yPos*45)+25)
        .text(this.easing[yPos]);
  }

  transitionWithDelay(){
    d3.selectAll("h3")
      .transition()
      .style("font-size","28px")
      .delay(2000)
      .duration(2000);
  }

  identifyTransitionStart(){
    d3.select("body")
      .transition()
      .delay(200)
      .each("start", function() { d3.select(this).style("color", "green"); })
      .style("color", "red");
  }

}
