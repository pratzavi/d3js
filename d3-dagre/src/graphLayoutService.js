(function(){
	'use strict';
	angular
		.module('hierApp')
		.service('graphLayoutService', graphLayoutService);

	function graphLayoutService() {
		var graphLayoutData, selectedVectorNode, showDragLine, selectedDomainMetaNode, 
		selectedDomainMetaEdge, d3Scale, translateXY = [ 0, 0 ], newNode = {}, initialScale = 1, 
		hasTransition = false, g = new dagreD3.graphlib.Graph({multigraph: true}), render = new dagreD3.render();
		graphLayoutData = {nodes: [], edges: []};
		selectedVectorNode = undefined;
		selectedDomainMetaNode = undefined;
		selectedDomainMetaEdge= undefined;
		var selectedVectorEdge = undefined, showDragLine = false, d3Scale = 1;
		var domainNodes = [], selectedInstanceNode = [], nodeInstances =[], domainEdges = [], changeSetRecord = {changeRecords: []};
		var svg, inner;
		function init() {		
			g.setGraph({}).setDefaultEdgeLabel(function () {
	    		return {};
	    	});
			svg = d3.select('svg');
			inner = svg.select('g');
			svg.call(d3.behavior.zoom().on("zoom", function() {
				var ev = d3.event;
				translateXY = ev.translate;
				d3Scale = ev.scale;
				inner.attr("transform", "translate(" + ev.translate + ") scale(" + ev.scale + ")");
			}));
			return g;
		}
		
		function setOrientation(orientation) {
			this.g.setGraph({
				"rankdir" : orientation
			});		
		}
		
		function setTransition(hasTransition) {
			if(hasTransition) {
				this.g.graph().transition = function transition(selection) {
					return selection.transition().duration(1000);
			    };
			} else {
				g.graph().transition = null;
			}		
		}
		
		function renderLayout(g) {
	        try {
	        	render(inner, g);
	        	
	        	// Add ID to each edgelabel
		        inner.selectAll(".edgeLabel").attr("id", function(edge) {
					return edge.v + edge.w + edge.name;
				});
		        
				inner.selectAll("g.node").attr("title", function(v) {
					if (g.node(v) !== undefined) {
						return g.node(v).tooltip;
					}
				}).each(function(v) {
					$(this).tipsy({gravity : "w", opacity : 1, html : true});
				});
		        	
		        /*d3.behavior
		        	.zoom().translate([(g.graph().width * initialScale ) / 2, 10 ])
		        	.scale(initialScale).event(svg);*/
		        
		        if(this.graphLayoutData.nodes.length === 1) {
		        	this.hasTransition = true;
		        }        	 
		        this.setTransition(this.hasTransition);
		        // graphVectorService.loadVectorGraph(this);
	        }catch (e){
	        	console.log("Error in Rendering the Graph method renderLayout: " + e);
	        	showalert("Error in Data: " + e.name + " - " + e.message, 'alert-danger');
	        }
	      }
		
		function truncateName(inputName){
			if (inputName !== undefined && inputName !== null && inputName != ""){
				return (inputName.length > 12) ? inputName.substr(0,12-1)+'...' : inputName;
			}
		}
		
		function clearGraph(){
			if (g.nodeCount() > 0) {
				g.nodes().forEach(function(node) {
					g.removeNode(node);
				});
				g.edges().forEach(function(edge) {
					g.removeEdge(edge);
				});
				d3.select("svg > g").selectAll("*").remove();
			}
			this.changeSetRecord = angular.copy({changeRecords: []});
			d3.select(".control-sidebar").classed('control-sidebar-open', false);
		}
		
		function drawGraph(graphLayoutData, domainNodes) {
			this.domainNodes = domainNodes;
			domainEdges = this.domainEdges;
			this.clearGraph();
			this.init();
			this.graphLayoutData = angular.copy(graphLayoutData);
			this.graphLayoutData.nodes.forEach(function(node, index) {
				var tempNode = {};
				tempNode.id = node.id;
				tempNode.originalId = node.id;
				tempNode.label =  truncateName(node.DisplayName);
		    	tempNode.oldLabel =  node.label;
		    	tempNode.width =  70;
		    	tempNode.height =  25;
		    	tempNode.rx = 5;
		    	tempNode.ry =  5;
		    	tempNode.shape = 'rect';
		    	if(angular.isUndefined(node.labelUpdated)) {
		    		tempNode.labelUpdated = true;
		    	} else {
		    		tempNode.labelUpdated = node.labelUpdated;
		    	}
		    	tempNode.shortenName = '';
		    	tempNode.displayName = node.DisplayName;
		    	tempNode.name = node.label;
		    	tempNode.class = 'dnd';
		    	// tempNode.style = "fill:" + COLOR_SCHEMA[node.label];
		    	tempNode.title = node.label;
		    	tempNode.tooltip = node.DisplayName;
		    	
		    	domainNodes.filter(function(item) {
          			if(angular.equals(item.label, node.label)) {
          				node.attributes = angular.copy(item.attributes);
          			}
                });	
		    	/*node.attributes.forEach(function (attribute){
		    		if (angular.lowercase(attribute.managedBy) === "user"){
		    			return attribute.constraints.defaultValue = node[attribute.name];
		    		}
		    	});*/
		    	g.setNode(node.id, tempNode);
	        });
			
			this.graphLayoutData.edges.forEach(function(edge) {
				if (angular.isUndefined(edge.id) || edge.id === null){
					edge.id = edge.source + "_" + edge.target;
				}
				edge.originalLabel = angular.copy(edge.label);
				edge.labelUpdated = true;
				
				domainEdges.filter (function(item) {
					if(angular.equals(item.label, edge.originalLabel)) {
						return edge.attributes = angular.copy(item.attributes);						
					}
				})
				/*edge.attributes.forEach(function (attribute){
					if (angular.lowercase(attribute.managedBy) === "user"){
						attribute.constraints.defaultValue = angular.copy(edge[attribute.name]);
					}
				});*/
				
				g.setEdge(edge.source, edge.target, {
	        		id : edge.id,
	        		originalLabel : angular.copy(edge.originalLabel),
	        		//label : angular.copy(edge.label),
	        		label: edge.DisplayName,
					arrowhead : "normal",
					arrowheadStyle : "fill: #333",
					lineInterpolate : "linear",
					labeloffset: 5,
					labelUpdated : edge.labelUpdated
	           }, edge.label);
	        });
			
			this.hasTransition = true;
			if(this.graphLayoutData.dataFrom){
				this.setOrientation('BT');
			}
	        this.renderLayout(g);
		}
		
		function clearInstanceProperties() {
			nodeInstances = [];
		};
		
		function filterNode(selectedID) {
			var filterItem = this.graphLayoutData.nodes.filter(function(item) {
				if (angular.equals(item.id, selectedID)) {
					return item;
				}
			});
			return filterItem[0]; 
		}
		
		function filterEdge(selectedID) {
			var filterItem = this.graphLayoutData.edges.filter(function(item) {
				if (angular.equals(item.id, selectedID)) {
					return item;
				}
			});
			return filterItem[0];
		}
		
		function validateChangeSet(changeSetItems){
			// Iterate and validate nodes and edges in changeset
			var graphInfo = this;
			var errorLists = [], itemErrorList = [];
			changeSetItems.forEach(function (item){
				item.changeEvent.indexOf("node") >= 0 ? itemErrorList = validateChangeSetNode(item, graphInfo) : itemErrorList = validateChangeSetEdge(item, graphInfo.domainEdges);
				if (itemErrorList.length > 0){
					errorLists = errorLists.concat(itemErrorList);
					itemErrorList = [];
				}
			});
			return errorLists;
		}
		
		// validation for changeset node
		function validateChangeSetNode(item, graphInfo){
			var mandatoryList = [], errorList = [], entity;
			switch (item.changeEvent){
				case "addnode":
				case "updatenode":
					entity = item.newElement;
					break;
				case "deletenode":
					entity = item.oldElement;
					break;
			}
			
			// list only the mandatory fields are managed by user
			graphInfo.domainNodes.filter(function (domainNode){
				if (angular.equals(domainNode.label, entity.label)){
					domainNode.attributes.forEach (function (attribute){
						if (angular.lowercase(attribute.managedBy) === "user" && attribute.constraints.mandatory === true) {
							mandatoryList.push(attribute.name); 
						}
					});
				}
			});
			
			// Iterate and check the mandatory fields values
			mandatoryList.forEach (function (mandatoryItem){
				if (!entity[mandatoryItem] || entity[mandatoryItem] === null){
					errorList.push('Node id - '+entity.id+', label - '+entity.label+' has no value for mandatory attribute - '+mandatoryItem);
				}
			});
			return errorList;
		}
		
		// Return the possible edges for the source and target
		function possibleEdges(sourceNodeLabel, targetNodeLabel){
			var possibleEdges = edgesforNode(sourceNodeLabel, this.domainNodes);
			var matchEdges = [];
			if(possibleEdges){
				possibleEdges.forEach(function (target){
					target.targetNodes.forEach(function (item){
						if(angular.equals(item.label, targetNodeLabel)){
							matchEdges.push(target.label);
						}
					});	
				});
			}
			return matchEdges;
		}
		
		// Return the possible target nodes for the source node
		function possibleTargetNodes(sourceNodeLabel){
			var possibleEdges = edgesforNode(sourceNodeLabel, this.domainNodes);
			var possibleNodes = [];
			if(possibleEdges){
				possibleEdges.forEach(function (target){
					target.targetNodes.forEach(function (item){
						if(!(possibleNodes.indexOf(item.label) > -1)){
							possibleNodes.push(item.label);
						}
					});
				});
			}
			return possibleNodes;
		}
		
		// Return the availableEdges for the node
		function edgesforNode(nodeLabel, metaDomainNodes){
			var availableEdges;
			metaDomainNodes.filter(function (domainNode){
				if (angular.equals(domainNode.label, nodeLabel)){
					availableEdges = domainNode.sourceEdges;
				}
			});
			return availableEdges;
		}
		
		// validation for changeset edge
		function validateChangeSetEdge(item, graphEdgesList){
			var mandatoryList = [], errorList = [], entity;
			switch (item.changeEvent){
				case "addedge":
				case "updateedge":
					entity = item.newElement;
					break;
				case "deleteedge":
					entity = item.oldElement;
					break;
			}
			
			// list only the mandatory fields are managed by user
			graphEdgesList.filter(function (domainEdge){
				if (angular.equals(domainEdge.label, entity.label)){
					domainEdge.attributes.forEach (function (attribute){
						if (angular.lowercase(attribute.managedBy) === "user" && attribute.constraints.mandatory === true) {
							mandatoryList.push(attribute.name); 
						}
					});
				}
			});

			// Iterate and check the mandatory fields values
			mandatoryList.forEach (function (mandatoryItem){
				if (!entity[mandatoryItem] || entity[mandatoryItem] === null){
					errorList.push('Edge id - '+entity.id+', label - '+entity.label+' has no value for mandatory attribute - '+mandatoryItem);
				}
			});
			return errorList;
		}
		
		return {
			g: g,
			graphLayoutData: graphLayoutData,
			selectedVectorNode: selectedVectorNode,
			showDragLine: showDragLine,
			selectedDomainMetaNode: selectedDomainMetaNode,
			selectedDomainMetaEdge: selectedDomainMetaEdge,
			d3Scale: d3Scale,
			translateXY:translateXY,
			hasTransition:hasTransition,
			newNode: newNode,
			init : init,
			render: render,
			setOrientation: setOrientation,
			setTransition: setTransition,
			renderLayout: renderLayout,
			drawGraph: drawGraph,
			clearGraph: clearGraph,
			domainNodes: domainNodes,
			domainEdges: domainEdges,
			selectedInstanceNode: selectedInstanceNode,
			nodeInstances: nodeInstances,
			clearInstanceProperties: clearInstanceProperties,
			truncateName: truncateName,
			filterNode: filterNode,
			filterEdge: filterEdge,
			changeSetRecord:changeSetRecord,
			possibleEdges: possibleEdges,
			possibleTargetNodes: possibleTargetNodes,
			validateChangeSet: validateChangeSet
		};
	}
})();