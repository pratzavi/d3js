angular
.module('graphApp')
.service('graphLayoutService',graphLayoutService);

function graphLayoutService(){
	var g = new dagreD3.graphlib.Graph().setGraph({});
	// Create the renderer
	var render = new dagreD3.render();
	// Set up an SVG group so that we can translate the final graph.
	var svg = d3.select("svg"),	
      inner = svg.append("g");

	function init(){ 
	  // Add nodes to the graph, set labels, and style
	  allAssociations.nodes.forEach(function(node) {
	    var value = node; 
	    value.label = node.label;
	    //value.class = "node-" + node.id;
	    value.rx = 5
	    value.ry = 5;
	    g.setNode(node.id, value);
	  });
	 
	  allAssociations.edges.forEach(function(edge) {
	    var value = edge; 
	    value.arrowhead = "vee"
	    value.label = edge.DisplayName;
	    //value.class = "edge-" + edge.source //+ '-' + edge.target;
	    value.rx = value.ry = 5;
	    g.setEdge(edge.source,edge.target,value);
	  });

	// Run the renderer. This is what draws the final graph.
		render(inner, g);
		
	}

 	function setZoom(){
		
	  	inner.attr("transform","scale(0.8)");
	 
	  // Set up zoom support
	  var zoom = d3.behavior.zoom().on("zoom", function() {
	      inner.attr("transform", "translate(" + d3.event.translate + ")" + "scale(" + d3.event.scale + ")");
	  });
	  svg.call(zoom);
 	}

 	function toolTip(){
 		// Simple function to style the tooltip for the given node.
		var styleTooltip = function(name, description) {
		return "<p class='name'>" + name + "</p><p class='description'>" + description + "</p>";
		};
		inner.selectAll("g.node")
		.attr("title", function(v) {
			return styleTooltip(g.node(v).label, g.node(v).DisplayName)
		})
		.each(function(v) {
			$(this).tipsy({ gravity: "w", opacity: 1, html: true });
  		});
 	}

 	function drawGraph(){
 		init();
 		setZoom();
 		toolTip();
 	}

 	function highlightSuccessorNodes(e){
	    g.successors(e).forEach(function(node){
	      var edgeElem = d3.select(g.edge(e,node).elem)
	      edgeElem.classed('highlight',true);
	      edgeElem.style('opacity',1);
	 
	      nodeElem = d3.select(g.node(node).elem);
	      nodeElem.classed('highlight',true);
	      nodeElem.style('opacity',1);
	      highlightSuccessorEdges(node);
	    });
	    return;
	}
 
	function highlightSuccessorEdges(n){
	    g.successors(n).forEach(function(edge){
	      var tnode = g.edge(n,edge).target;
	      var tnodeElem = d3.select(g.node(tnode).elem)
	 
	      tnodeElem.classed('highlight',true);
	      tnodeElem.style('opacity',1);
	 
	      var edgeElem = d3.select(g.edge(n,edge).elem)
	      edgeElem.classed('highlight',true);
	      edgeElem.style('opacity',1);
	 
	      highlightSuccessorNodes(edge);
	    });
	    return;
	 }
	 
	function highlightPredecessorsNodes(e){
	    g.predecessors(e).forEach(function(node){
	      var edgeElem = d3.select(g.edge(node,e).elem)
	      edgeElem.classed('highlight',true);
	      edgeElem.style('opacity',1);
	 
	      nodeElem = d3.select(g.node(node).elem);
	      nodeElem.classed('highlight',true);
	      nodeElem.style('opacity',1);
	      highlightPredecessorsEdges(node);
	    });
	    return;
	}
	 
	function highlightPredecessorsEdges(n){
	    g.predecessors(n).forEach(function(edge){
	      var tnode = g.edge(edge,n).source;
	      var tnodeElem = d3.select(g.node(tnode).elem)
	 
	      tnodeElem.classed('highlight',true);
	      tnodeElem.style('opacity',1);
	 
	      var edgeElem = d3.select(g.edge(edge,n).elem)
	      edgeElem.classed('highlight',true);
	      edgeElem.style('opacity',1);
	 
	      highlightPredecessorsNodes(edge);
	    });
	    return;
	 }
	 
	function removeHighlightItems(i){
	    // Remove the highlight for prev selected nodes, edges & labels
	    d3.selectAll('.nodes g.node.highlight').classed('highlight', false);
	    d3.selectAll('.edgePaths g.edgePath.highlight').classed('highlight', false);
	    d3.selectAll('.edgeLabels g.edgeLabel.highlight').classed('highlight', false);           
	    // Add opacity for nodes, edges & labels
	    d3.selectAll('.nodes .node').style("opacity", i);
	    d3.selectAll('.edgePaths .edgePath').style("opacity", i);
	    d3.selectAll('.edgeLabels .edgeLabel').style("opacity", i);
	  }
	 
	  	
 	
  return {
  	g: g,
  	drawGraph: drawGraph,
  	inner:inner,
  	highlightSuccessorNodes: highlightSuccessorNodes,
  	highlightSuccessorEdges: highlightSuccessorEdges,
  	removeHighlightItems: removeHighlightItems,
  	highlightPredecessorsEdges: highlightPredecessorsEdges,
  	highlightPredecessorsNodes: highlightPredecessorsNodes
  };
}