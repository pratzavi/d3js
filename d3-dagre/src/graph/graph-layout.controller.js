angular
.module("graphApp",[])
.controller("graphController",function($scope, graphLayoutService){
    graphLayoutService.drawGraph();
    var g = graphLayoutService.g;
    var inner = graphLayoutService.inner;
  
inner.selectAll("g.node").each(function(v){
    $(this).click(function(a){
      inner.selectAll("g.node").classed('highlight',false);
      graphLayoutService.removeHighlightItems(1);
      d3.select(this).classed('highlight',true);
      d3.select(this).style('opacity',1);
      $scope.selectedNode = v;
    })
  });
 
  $scope.highlightPath = function(){
    if($scope.selectedNode == null || $scope.selectedNode == undefined ){
      alert('Please select a Node');
    }
    else{
      graphLayoutService.removeHighlightItems(0.2);
      var selection = g.node($scope.selectedNode).elem
      d3.select(selection).classed('highlight',true);
      d3.select(selection).style('opacity',1);
      graphLayoutService.highlightSuccessorEdges($scope.selectedNode);
      graphLayoutService.highlightPredecessorsEdges($scope.selectedNode);
    }
  }
 
  $scope.highlightParent = function(){
    if($scope.selectedNode == null || $scope.selectedNode == undefined ){
      alert('Please select a Node');
    }
    else{
      graphLayoutService.removeHighlightItems(0.2);
      var selection = g.node($scope.selectedNode).elem
      d3.select(selection).classed('highlight',true);
      d3.select(selection).style('opacity',1);
      graphLayoutService.highlightPredecessorsEdges($scope.selectedNode);
    }
  }
 
  $scope.highlightChildren = function(){
    if($scope.selectedNode == null || $scope.selectedNode == undefined ){
      alert('Please select a Node');
    }
    else{
      graphLayoutService.removeHighlightItems(0.2);
      var selection = g.node($scope.selectedNode).elem
      d3.select(selection).classed('highlight',true);
      d3.select(selection).style('opacity',1);
      graphLayoutService.highlightSuccessorEdges($scope.selectedNode);
    }
  }
 
  $scope.unHighlightPath = function(){
    $scope.selectedNode = null;
    graphLayoutService.removeHighlightItems(1);
  }
});