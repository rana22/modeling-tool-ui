var viewFormCause = Backbone.Model.extend({
	"Id":"",
	"Name": "test1", 
});
joint.shapes.html = {};
joint.shapes.html.Element=joint.shapes.basic.Rect.extend({
	defaults: joint.util.deepSupplement({
	type: 'html.Element', 
	attrs: {
		rect: { stroke: 'none' } 
		}
	}, joint.shapes.basic.Rect.prototype.defaults) 
}); 
	 // Create a custom view for that element that displays an HTML div above it.

var element = function(String){
	 // if(String === "1") {
		// 	return ['<div class="html-element">', 
		// 			'<button class="delete">x</button>', 
		// 			'<label id="name">one</label><br>',
		// 			 '<label id="description"></label>', 
		// 			 '<button type="submit" class="btn btn-default"><i classeglyphicon glyphicon-save"><i> </button>',
		// 			 ,'</div>'].join('');
		// 			}
	 // if(String === "2"){ 
	 // 		 return ['<div classehtml-element">', 
	 // 		 		 '<button classedelete">x</butto>',
	 // 		 		 '<label id="name"></label><br>', 
	 // 		 		 '<label id="description"></label>',
	 // 		 		 '<input id="level" valuee" typeehidden"></input>',
	 // 		 		  '</div>'].joint('');
	 // 		}

	 		return ['<div class="html-element">', 
					'<button class="delete">x</button>', 
					'<label id="name">one</label><br>',
					 '<label id="description"></label>', 
					 '<button type="submit" class="btn btn-default"><i classeglyphicon glyphicon-save"><i> </button>',
					 ,'</div>'].join('');
					
	} 

joint.shapes.html.ElementView = joint.dia.ElementView.extend({
	template: element(2),

  events: {
	'click button#updatePro': 'addItem'
	},

	initialize: function() {
		_.bindAll(this, 'updateBox', 'addItem');//prevents loss of context for updateBox function
		joint.dia.ElementView.prototype.initialize.apply(this, arguments); 
		this.$box = $(_.template(this.template)());

		// Prevent paper from handling pointerdown.
		this.$box.find('input,select').on('mousedown click', function(evt) { evt.stopPropagation(); });
		
		// This is an example of reacting on the input change and storing the input data in the cell model. 
		this.$box.find('input').on('change', _.bind(function(evt){
			this.model.set('input', (evt.target).val());
			}, this));
		this.$box.find('select').on('change', _.bind(function(evt) {
			this.model.set('select', (evt.target).val());
		}, this));
		this.$box.find('button').on('click', _.bind(function(){ this.model.set('objectName', $('#enterName').val())}, this)); 
		//updating the properties onclick event

		/*this.$box.find(iname'),I01(WItenterName").val());*/
		this.$box.find('input#level').val(this.model.get('level')); //set the level for the objects 
		this.$box.find('select').val(this.model.get('select'));
		this.$box.find('.delete').on('click', _.bind(this.model.remove, this.model));
		this.model.on('change', this.updateBox, this);// Update the box position whenever the underlying model changes. 
		this.model.on('remove', this.removeBox, this);// Remove the box when the model gets removed from thegraph. 
		this.updateBox();	//only the selected box is updated

	},

		render: function() { 
			joint.dia.ElementView.prototype.render.apply(this, arguments);
			/* this.$box.append("<button id=supdatePropertiess>update</button>");*/ 
			this.paper.$el.prepend(this.$box); //happen template to thegraph
			this.updateBox();
			return this;

		},

		updateBox: function() {
	    // Set the position and dimension of the box so that it covers the JointJS element.
		    var bbox = this.model.getBBox();
			// Example of updating the HTML with a data stored in the cell model.
			this.$box.find('input').text(this.model.get('#input'));
			
			this.$box.find('label#name').text(this.model.get('tag'));
			var tag = this.model.get('tag');
			if(tag === "Process Step") this.$box.find('label#name').text(this.model.get('objectName'));
			
			this.$box.find('label#description').text(this.model.get('description'));
		    this.$box.find('span').text(this.model.get('select'));
			
			this.$box.css({ width: bbox.width,
		     height: bbox.hbight,
		     left: bbox.x,
		     top: bbox.y,
		     transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)' });

		},
		
		removeBox: function(evt){
			this.$box.remove();
		},

		addItem: function(e){
			e.stopPropagation();
	}
}); 

      //Creating Graph with different function
       var graph = new joint.dia.Graph;
       var paper = new joint.dia.Paper({ 
       	   el: $('#myCanvas'),
           width: 1100 ,
           height: 700,
           gridSize: 1,
           model: graph,
           snapLinks: {radius: 50 }                                 
           //link to object when pointer is around radius length
      });

      //create different object template

      var modelCollector = new Backbone.Collection.extend({
           model: joint.shapes.html.ElementView
      });

      //create Box object

      var createBox = function(){
          var color = '#' + $("#enterColor").val();
          // Snsole.log(color);
          var enterName  = $("#enterName").val().trim();
          var enterDescription = $("#enterDescription").val();
          var el = new joint.shapes.html.Element({ position: { x: 80, Y: 80},
              size: {width: 170, height: 120 },
              objectName : enterName,
              description: enterDescription,
              level: "secondary",
              t4g:"Process_Step",
              aitrs: { rect: { fill: color }},
              customId: '1'
          });
          graph.addCell(el);
     }


       //Create Circle object
  var createCircle = function(){
  }

   $("#createBox").click(function(){
     createBox();
 });

 //for adding parent element
 $("#addParentElement").click(function(){
 	console.log("add parent");
    var enterName =  $("#enterName").val();
    var Pt = new joint.shapes.html.Element({
       position: { x: 140, y: 140 },
       size: { width: 800, height: 250 },
       objectName: enterName,
       description: '',
       level: 'tertiary',
       tag: "process",
       objectType: 'SWIM_LANE',

       attrs:{fill: '#ffffff'}
    });

   graph.addCell(Pt);
});

//create circle objects
$("#createCircle").click(function(){


       var enterName = $("#enterName").val();
       var enterDescription = $("#enterDescription").val();
       var el = new joint.shapes.html.Element({ template:element(1), position: { x: 80, y: 80 },
              size: {width: 170, height: 120 },
              name: enterName ,
              description: enterDescription
       });
       var pn = joint.shapes.pn;
       var pReady = new pn.Place({
              position: { x: 140, y: 50 },
              attrs: {
                     '.1abel': { text: 'Stratery Risk', fill: 'red' },
                     '.root' : { stroke: 'red', 'stroke-width': 12 },
                   '.tokens > circle': { fill : 'red' }
               }
       });
       graph.addCell(el);
});


   //link betweeen objects
   $("#createLink").click(function(){
       var link = new joint.dia.Link({
           source: { x: 10, y: 20 },
           target: { x: 100, y: 20 },
           connector: {name: 'jumpover'},
           attrs: {}
       });
       graph.addCell(link);
});
   
   $("input:button").click(function(){

       var tag = $(this).val();
       var color =["#80ffcc","#ffc6b3", "#ff4d4d"];
       var childObject = ["App" ,"DOC", "Failure_Mode","Cause","Contro"];
       var enterName = $("#entetName").val().trim();
       var position = $.inArray(tag, childObject);

       var el = new joint.shapes.html.Element({
           position: { x: 40, y: 40 },
           size: { width: 50, height: 30 },
           objectName: enterName,
           input:'',
           level:'primary',
           tag: tag,
           attrs:{
               rect: { fill: color[position], opacity: '1'
           }
           }});

       //set parameters for Failure Mode
       if(position >-1 && tag =="Failure_Mode"){
           el.set({fmObjectRiskType:''});
           el.set({fmObjectPotentialEffect:''});
       }   el.set({fmObjectSeverity:''});
                                                                                                                        



	  if(position >-1 && enterName == "Cause" ){
          el.set({causeObjectOccurrence : ''});
      }

	  if(position && enterName == "Control"){
          el.set({controlObjectDetection: ''});
      }
      graph.addCell(e1);
	});


 paper.on('cell:pointerdown',
		function(cellView, evt, x, y){
		//function to see the properties/attributes of each elements/object on the swielane
		var enterName = $('enterName').val();
		console.log(cellView.model)

		if (enterName != '') {
			$("#enterName").val(cellView.model.get('objectName'));
			$("#enterDescription").val(cellView.model.get('description')) ;
			$("#enterValue").val(cellView.model.get('select')) ;
			$("#enterColor").val();
			$("#UUID").val(cellView.model.get('id'));

	}
	console.log(cellView.model.get("tag"))

	var FortModel = new Backform.Form({
		el: ("div#form"),
		model: cellView.model,
		fields: renderForm(cellView.model.get("tag"))
	}).render();
	console.log(cellView.modelattributes)


 	function renderForm(tag){
         if(tag === "Process_Step" || tag === "App" || tag === "DOC"){
             	return [{name: "objectName", id: "enterName", label: "Name", control: "input"}];
             }
         if (tag === "Failure_Mode"){
              return [{name: "objectName", width: "200px", id: "enterName", label:"Name", control: "input"},
                     {name: "fmObjectRiskType", label: "RiskType", control: "input"},
                     {name: "fmObjectPotentialEffect", label: "Effect", control: "input"},
                     {name: "fmObjectSeverity", label: "Severity", control: "input"}];
         }
         if(tag === "Cause"){
             return [{name: "objectName", width: "200px", id: "entetName", label: "Name", control: "input"},
                     {name: "causeObjectOccurrence", label: "Occurance", control: "input",}];
                 }

         if(tag === "Control"){
             return [{name: "objectName", width: "200px", id: "entetName", label: "Name", control: "input"},
                     {name: "controlObjectDetection", label: "Detection", control: "input",}];
         }
}

//Addding parent child relation
 var cell = cellView.model; 
    if(cell.get('parent')){
    graph.getCell(cell.get('parent')).unembed(cell); 

    var childArray=[];
    function collectDeepEmbedded(cellViewsBeiou) {
        _.each(celIViewsBelow.getEmbeddedCells(), function(c) {
            childArray.push(c.get('name'));
            collectDeepEmbedded(c);
	    })
    }

	    collectDeepEmbedded(cell); 
	    console.log(childArray);
	}
});


 //canvasjs
   // element below.
   paper.on('cell:pointerup', function(cellView, evt, x, y){

     var cell = cellView.model;
     console.log(cell.id);
     console.log(cell.get('parent'));

     //prevent links from using this event 
     if (cellView.model.isLink()) return;

     var cellViewsBelow = paper.findViewsFromPoint(cell.getBBox().center());

     var str = [];
     var childParent = ["Parent", "App", "DOC", "FMEA"];
     var someFunction = _.find(cellViewsBelow, function(c) { 
        str.push(c.model.getCobjectName9);
     }); 
    console.log(str);


       if(cellViewsBelow.length){
       // Note that the findViewsFromPoint() returns the view for the 'cell' itself.
       var cellViewBelow = _.find(cellViewsBelow, function(c) {return c.model.id !== cell.id }); 
       // Prevent recursive embedding.

       if (cellViewBelow && cellViewBelow.model.get('parent') !== cell.id ) { 
           if(cellViewBelow.model.get('level') == "tertiary" && cell.get('level') == "primary"){
               //get the list of element below the pointer
               var listElementBelow =[];
               var allCellsViewBelow = _.find(cellViewsBelow, function(c) { 
                  console.log(c.model.get('name'));
                  if (c.model.get('level') == "secondary"){ 
                     consee.log(c.model.get('level'));
                  }  c.model.embed(cell);
                  listElementBelow.push(c.model.get('name'));
              });
          }
          console.log("from the list Below "+ listElementBelow);

             if (cellViewBelow.model.get('level') == "tertiary" && cell.get('level') == "secondary" || cellViewBelow.model.get('level') !== "tertiary" ) { 
             console.log(cell.get('level'));
             cellViewBelow.model.embed(cell);
         }

        var parentId = cell.get('parent'); 
        if (!parentId) return;

        var parent = graph.getCell(parentId); 
        var parentBbox = parent.getBBox();

        //search child inside the parent
        var childArray=[];
        function coltectDeepEmbedded(parent){
                 _.each(parent.getEmbeddedCells(), function(c) {
                    childArray.push(c.get('tag'));
                    coltectDeepEmbedded(c);
                 })
             }


         cotlectDeepEmbedded(parent);
         console.log(childArray);
          function hasDuplicates(array) {
                return (new Set(array)).size !== array.length;
          }

          console.log(hasDuplicates(childArray));

                var pos =  $.inArray(cell.get('tag').childArray);
                console.log(pos + parent.get('name'));
                /*var diff = $(risk).not(childArray).get();
               console.log(diff.length);*/
              	var risk = ["App", "DOC", "Failure_Mode", "Cause", "Control"];
                var position = $.inArray(cell.get('tag'), risk);
                console.log(position);

                //specify the position for the child object with in the parent
                if( position > -1 && position < 4 && !hasDuplicates(childArray)){
                    cell.position( parentBbox.x + 5 *(position * 10), parentBbox.y + 90)
                      if (position==3){
                        celt.position( parentBbox.x +3*(position*10), parentBbox.y + 10)
                    }
                }
                if (position == 2){
                    cell.resize(15, 10);
                    cell.position( parentBbox.x + 150, parentBbox.y +100)
          }
      } 
  }
});


  $("input#enterDescription").change(function(cellView, evt){
    /*this4box.find( label#namel ) .text(this.model.get( 'name' ) ) ;*/   
    var cell = cellView.model;
    var cell = cellView.model;
  });

  //double click event of the cell
  paper.on('cell:pointerdblclick', function(cellView, evt){
    var cell = cellView.model;
    console.log(cell.id + " " + cell.get("name"))
    $('#' + cell.id).click(function(){});
  });

  //Updating diagram or Saving new diagram
  //reformating the cells according to the position of the element

  var elArray = [];
  var ReformJson = Backbone.Model.extend({
        reformateGraph : function(json){
            var graphJson = jQuery.parseJSON(json);
            _.each(graphJson.cells, function(c){
              elArray.push(c);
            });
            console.log(JSON.stringify(elArray));
        },
        render: function (){
          console.log("from back model");
        	}
        
      });


    //add graph json element to the colloction
  var Elements = new Backbone.Collection([elArray]);
  /*Elements.comparator= 'z';*/



$('#saveDiagram').click(function(){

    var id =$("input.graphId").val(); 
    var json = JSON.stringify(graph);

    var reformJson = new ReformJson(); 
    reformJson.render();
    reformJson.reformateGraph(json);

    console.log(Elements.get('id')); 
     graph.clear();
     console.log("graph cleared"); 
     var type;

      if(id = ""){
         type = 'post';
     }else{
         type = 'put';
     }
     console.log(type);

      var remoteURL ='Ilttp://localhost:8080/api/dias'; 
      var localURL  ='http://localhost:8080/api/dial'; 
      $.ajax({
         url: localURL,
         dataType: 'json',
         type: type,
         contentType: 'application/json',
         data: json, 
         processData: false,
         async: true,
          success: function( data, textStatus, jQxhr ){
              console.log(data);
              graph.fromJSON(json);
          },
          error: function(data, jqXhr, textStatus, errorThrown){
              console.log("from error" + JSON.stringify(data));
              console.log( errorThrown );
          }
      });

  });




//updating the properties of cells 
 $("button#updatePro").click(function($http){
    var cellID = $("#UUID").val();
    var cell = graph.getCell(cellID);
    var tag = cell.get("tag");


     if(cellID  !== ""){
    var enterName = $("#enterName").val().trim(); 
    // if(cellsget("objectName") !== enteriName)4/



             var name = $(" input[name='objectName']").val(); 
             consoe.log(name)
             cell.set({objectName: name});

             //object based attribute setting


              if (tag === "Failure_Mode"){
                 var riskType = $("input[name='fmObjectRiskType']").val();
                 var potentialEffect = $("input[name='fmObjectPotentialEffect']").val(); 
                 var severity = $(" input[name='fmObjectSeverity']").val(); 
                 console.log(riskType+ " "+ potentielEffect+ " ");


                 cell.set({fmobjectRiskType:riskType});

                 console.log("updated value----" + cell.get("fm_object_risk_type")); 
                 cell.set({fmObjectPotentialEffect:potentialEffect}); 
                 cell.set({fmObjectSeverity:severity});
               }
               if (tag === "Cause"){
                 var occurance = $("input[name='causeObjectOccurrence']").val(); 
                 cell.set({causeObjectOccurrence: occurance});
               }
               if (tag  ===  "Control"){
                  var detection = $("input[name='nocontrolObjectDetection']").val();
                  cell.set({controlObjectDetection: detection});
               }

               var remoteURL = 'http://localhost:8080/api/dia/I'; 
               var localURL  = 'http://localhost:8089/api/dia/11'; 
               var data = JSON.stringify(graph); 
               console.log(data);
                $.ajax({
               url: localURL, 
               dataType: 'json',
               type: 'put',
               contentType: 'application/json',
               processData: false,
               async: true, 
               data: data, 
               success: function( data, textStatus, jQxhr ){
                   console.log(data.cells),
                   graph.fromJSON(data);
               },

                error: function( jcghr, textStatus, errorThrown ){
                   console.log( errorThrown );
                }
                });
            }
        });

     $('button#generateRaci').on('click', function(){
         var racild = $('#graphId').val(); 
        window.location.href = "http://localhost:9000/VUI—Grid/" +raciId;
     });

     $(".container").css("margin—left", "50px")








