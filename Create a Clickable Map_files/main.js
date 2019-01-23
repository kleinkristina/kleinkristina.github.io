
var editor = new new Class({
	initialize: function() {

		this.panel = new new Class({
			initialize: function() {
				$$("#editor .panel .cross").addEvent("click", function(event) {
					event.stop(); 
					this.hide();
				}.bind(this));
			},
	
			show: function(content, options) {
				$$("#editor .panel .content").set("html", "").adopt(content);
				$$("#editor .panel").setStyles({
					display: "block",
					top: options.position.y,
					left: options.position.x
				});
			},
	
			hide: function() {
				$$("#editor .panel").setStyle("display", "none");
			}
		}); 

		$$("#editor .export .generate-map-script").addEvent("click", function(event) {
 
			if( editing === "true" ) { 
				this.updateMap();
			} else {
				this.save();
			} 
		}.bind(this)); 
		
		$$("#editor .update .updatemap ").addEvent("click", function(event) {
			this.updateMap();
		}.bind(this));
		 
	},
	
	/* this will render the map in the editor */
	render: function() {
		editing = getVar("editing");
		online = getVar("online");
		maplocation = getVar("maplocation");

				$$("#editor iframe")[0].contentWindow.render(data
					, {
					editor: editing,
					maplocation:maplocation
				});
	},

	/* update Map */
	updateMap: function() {
			var mapId = getVar("id");
			var maplocation = getVar("maplocation");
			var maplocation = data.options.maplocation;
			
			var myRequest = new Request({ 
				url: 'data.php',
				method: 'post',
				onRequest: function(){
				
				},
				onSuccess: function(resp) {
				var snippet = "";
				snippet += "<iframe src=\"https://createaclickablemap.com/map.php?id="+mapId+"&maplocation="+maplocation+"&online=true\" width=\""+data.options.size.x+"\" height=\""+data.options.size.y+"\" style=\"border: none;\"></iframe>\n";
				snippet += "<script>if (window.addEventListener){ window.addEventListener(\"message\", function(event) { if(event.data.length >= 22) { if( event.data.substr(0, 22) == \"__MM-LOCATION.REDIRECT\") location = event.data.substr(22); } }, false); } else if (window.attachEvent){ window.attachEvent(\"message\", function(event) { if( event.data.length >= 22) { if ( event.data.substr(0, 22) == \"__MM-LOCATION.REDIRECT\") location = event.data.substr(22); } }, false); } </script>";
				
					if(data.options.links.table) {
						snippet += "<style>ul.map li { float: left; margin: 0 25px 0 0px; width: 120px; border: 0px solid; height: 45px; padding-left: 6px; } ul.map { list-style: square url(https://createaclickablemap.com/li-arrow.png) !important; } ul.map li a{ margin: 0;padding: 0; text-decoration:underline; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:normal; color:#4591b1; } ul.map li a:hover{ text-decoration:none; color:#214b6e;} .linkBack{ display:block; width:130px; position: relative; bottom: 0px; left: 660px; font-family: Arial,Helvetica,sans-serif; font-size: 10px; font-style:italic; color:#666666;} .linkBack a {color:#666666;}.linkBack a:hover{color:#666666;text-decoration: none;} </style>"
						var states = Object.values(data.states);
						states.sort(function(a, b) {
							return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
						});

						snippet += new Element("div").adopt(
							new Element("ul", {
								"class": "map"
							}).adopt(
								states.map(
									function(u) {
										return new Element("li").adopt(
											new Element("a", {
											href: u.link || "#",
											target: data.options.links.target,
											text: u.name
											})
										)
									}
								)
							)
						).get("html");
	 				}

				$$("#dialog .front .content textarea").set("text", snippet);
				$("dialog").setStyle("display", "block");
			},
			onFailure: function(){
				 
			}.bind(this)
		}).post({
			option:"update",
			id: mapId,
			maplocation: maplocation,
			data: JSON.encode(data)
		});
 
	},
	/* END update map */
	/* Save map */
	save: function() {
		new Request({
			url: "map.php",
			onSuccess: function(resp) {
				$('newmapid').set("value", resp );
				var maplocation = getVar("maplocation");
				var snippet = "";
				snippet += "<iframe src=\"https://createaclickablemap.com/map.php?&id="+resp+"&maplocation="+maplocation+"&online=true\" width=\""+data.options.size.x+"\" height=\""+data.options.size.y+"\" style=\"border: none;\"></iframe>\n";
				snippet += "<script>if (window.addEventListener){ window.addEventListener(\"message\", function(event) { if(event.data.length >= 22) { if( event.data.substr(0, 22) == \"__MM-LOCATION.REDIRECT\") location = event.data.substr(22); } }, false); } else if (window.attachEvent){ window.attachEvent(\"message\", function(event) { if( event.data.length >= 22) { if ( event.data.substr(0, 22) == \"__MM-LOCATION.REDIRECT\") location = event.data.substr(22); } }, false); } </script>";
				
					if(data.options.links.table) {
						snippet += "<style>ul.map li { float: left; margin: 0 25px 0 0px; width: 120px; border: 0px solid; height: 45px; padding-left: 6px; } ul.map { list-style: square url(https://createaclickablemap.com/li-arrow.png) !important; } ul.map li a{ margin: 0;padding: 0; text-decoration:underline; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:normal; color:#4591b1; } ul.map li a:hover{ text-decoration:none; color:#214b6e;} .linkBack{ display:block; width:130px; position: relative; bottom: 0px; left: 660px; font-family: Arial,Helvetica,sans-serif; font-size: 10px; font-style:italic; color:#666666;} .linkBack a {color:#666666;}.linkBack a:hover{color:#666666;text-decoration: none;} </style>"
						var states = Object.values(data.states);
						states.sort(function(a, b) {
							return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
						});

						snippet += new Element("div").adopt(
							new Element("ul", {
								"class": "map"
							}).adopt(
								states.map(
									function(u) {
										return new Element("li").adopt(
											new Element("a", {
											href: u.link || "#",
											target: data.options.links.target,
											text: u.name
											})
										)
									}
								)
							)
						).get("html");
	 				}
				
				$$("#dialog .front .content textarea").set("text", snippet);
				$("dialog").setStyle("display", "block");
			}.bind(this)
		}).post({
			data: JSON.encode(data)
		});
	}, /* END save map */
	
	lock: function() {
		
	},
	
	unlock: function() {
		
	}

})

var width = 960,
    height = 500;

var projection = d3.geo.albersUsa()
    .scale(width)
    .translate([0, 0]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g")
	.attr("transform", "translate(" + width/2 + "," + height/2 + ")")
	.append("g")
	.attr("id", "states");

var data = {
	features: [],
	states: {},
	options: {
		size: {
			x: 0,
			y: 0
		},
		states: {
			color: {
				normal: "",
				hover: ""
			}
		},
		borders: {
			pattern: "1, 0",
			color: ""
		},
		labels: {
			color: {
				normal: "",
				hover: "",
				inverse: ""
			},
			display: ""
		},
		font: "",
		background: "",
		links: {
			target: "_blank"
		},
		titles: {
			visible: false
		},
		message: ""
	}
};

 


/*
*
Load default map to an iframe
*
*/
var maplocation = getVar("maplocation");
var id = getVar("id");
var editing = getVar("editing");


if ( maplocation === "" ) { maplocation = "us"; }

$$("#editor iframe").addEvent("load", function() {
 
		/*
		enables editing mode, which start by loading the data of the existing map.
		to get an existing map, I look for the ID and receipt_id
		*/
 
if( editing === "true" ) {
		/*
			load data from an existing map
		*/
 		new Request.JSON({
			url: "data.php",
			onSuccess: function(json) {

				data = json;	// working 
				 
				if( json.options.maplocation )  {
					$('maplocation').set("value", json.options.maplocation );
				}

				$('mapwidth').set("value", json.options.size.x );
					
				$('mapheight').set("value", json.options.size.y ); 
				
				$('allstatescolor').value = json.options.states.color.normal; 
				$('font').value = json.options.font; 

				$('border-pattern').value = json.options.borders.pattern; 
				$('border-color').set("value", json.options.borders.color );
				
				$('background-color').set("value", json.options.background );
				
				$('states-hover-color').set("value", json.options.states.color.hover );
				
				$('allstatescolor').set("value", json.options.states.color.normal ); 
				
				$('label-color').set("value", json.options.labels.color.normal ); 
				
				$('label-hover-color').set("value", json.options.labels.color.hover ); 			
				
				$('label-outside-color').set("value", json.options.labels.color.inverse ); 
				
				$('labels-display').set("value", json.options.labels.display ); 
 
 
				if ( json.options.links.target === "_blank")
					links_target = true; 
				else
					links_target = false; 
					
				if ( json.options.links.table === true)
					links_table = true;
				else
					links_table = false;

				$('links-open-new-window').set("checked", links_target );
				$('links-show').set("checked", links_table  );
				$('show-link-titles').set("value", json.options.titles.visible );
				$('call-to-action').set("value", json.options.message );
 
 
				data.features.each(function(d) {
				 
					
					data.states[d.id] = {
						id: d.id,
						name: d.properties.name,
						abbr: d.properties.abbr,
						title: json.states[d.id].title,
						link: json.states[d.id].link,
						color: json.states[d.id].color,
						onClick: function(event) {
							var state = data.states[d.id];
							
							var iframePos = $$("#editor iframe")[0].getPosition($("editor"));
							
							editor.panel.show(new Element("div", {}).adopt(
								new Element("h4", {
									text: state.name
								}),
								new Element("input", {
									type: "text",
									value: state.title,
									placeholder: "Title"
								}).addEvent("change", function() {
									state.title = $$("#editor .panel .content input")[0].get("value");
									editor.render();
								}),
								new Element("input", {
									type: "text",
									value: state.link,
									placeholder: "Link"
								}).addEvent("change", function() {
									state.link = $$("#editor .panel .content input")[1].get("value");
									editor.render();
								}),
								(function() {
									var element = new Element("input", {
										"class": "color",
										value: state.color || $$("#editor .options .all-states-color input")[0].get("value"),
										placeholder: "Color"
									}).addEvent("change", function() {
										state.color = $$("#editor .panel .content input")[2].get("value");
										if(state.color == data.options.states.color.normal)
											state.color = "";
										editor.render();
									});
									if(element.type != 'color') { 
										new jscolor.color(element);
									}
									return element;
								})()
							), {
								position: {
									x: event.page.x+iframePos.x,
									y: event.page.y+iframePos.y
								}
							});
						}
					};
				});

			editor.render();
				
			}.bind(this)
		}).get({
			id : getVar("id"),
			//maplocation : data.options.maplocation,
			receiptid : getVar("receiptid"),
			editing : true,
			data : true
		}); 
} else {
	/*
	generates the default data for a map
	*/

	var jsonfile;
	if ( maplocation != "" ) {
		jsonfile = maplocation+".json";
	} else {
		jsonfile = "states.json";
	}
	
	
	new Request.JSON({
		url: "maps/"+jsonfile,
		onSuccess: function(json) {
			data.features = json.features;
			data.features.each(function(d) {
				data.states[d.id] = {
					id: d.id,
					name: d.properties.name,
					abbr: d.properties.abbr,
					title: "",
					link: "",
					color: "",
					onClick: function(event) {
						var state = data.states[d.id];
						
						var iframePos = $$("#editor iframe")[0].getPosition($("editor"));
						
						editor.panel.show(new Element("div", {}).adopt(
							new Element("h4", {
								text: state.name
							}),
							new Element("input", {
								type: "text",
								value: state.title,
								placeholder: "Title"
							}).addEvent("change", function() {
								state.title = $$("#editor .panel .content input")[0].get("value");
								editor.render();
							}),
							new Element("input", {
								type: "text",
								value: state.link,
								placeholder: "Link"
							}).addEvent("change", function() {
								state.link = $$("#editor .panel .content input")[1].get("value");
								editor.render();
							}),
							(function() {
								var element = new Element("input", {
									"class": "color",
									value: state.color || $$("#editor .options .all-states-color input")[0].get("value"),
									placeholder: "Color"
								}).addEvent("change", function() {
									state.color = $$("#editor .panel .content input")[2].get("value");
									if(state.color == data.options.states.color.normal)
										state.color = "";
									editor.render();
								});
								if(element.type != 'color')
									new jscolor.color(element);
								return element;
							})()
						), {
							position: {
								x: event.page.x+iframePos.x,
								y: event.page.y+iframePos.y
							}
						});
					}
				};
			});
			
			editor.render();
		},
		onError : function(json) {
			console.log('error loading the states.');
		}
	}).get();
}


}).set("src", "map.php?id="+id+"&maplocation="+maplocation);

$$("#editor .options .size input").addEvent("change", function(event) {
	var inputs = $$("#editor .options .size input");
	if(inputs[0] == this) {
		if(inputs[1].get("value").toInt() != Math.round(inputs[0].get("value").toInt()/900*525))
			inputs[1].set("value", Math.round(inputs[0].get("value").toInt()/900*525));
	} else {
		if(inputs[0].get("value").toInt() != Math.round(inputs[1].get("value").toInt()/525*900))
			inputs[0].set("value", Math.round(inputs[1].get("value").toInt()/525*900));
	}
	data.options.size = {
		x: inputs[0].get("value").toInt(),
		y: inputs[1].get("value").toInt()
	};
	if(event)
		; //editor.render();
}).fireEvent("change");

$$("#editor .options .maplocation input").addEvent("change", function(event) {
	data.options.maplocation = this.get("value");
	if(event)
		editor.render();
}).fireEvent("change");

$$("#editor .options .font select").addEvent("change", function(event) {
	data.options.font = this.get("value");
	if(event)
		editor.render();
}).fireEvent("change");
$$("#editor .options .all-states-color input").addEvent("change", function(event) {
	data.options.states.color.normal = this.get("value");
	if(event)
		editor.render();
}).fireEvent("change");
$$("#editor .options .states-hover-color input").addEvent("change", function(event) {
	data.options.states.color.hover = this.get("value");
	if(event)
		editor.render();
}).fireEvent("change");
$$("#editor .options .background-color input").addEvent("change", function(event) {
	data.options.background = this.get("value");
	if(event)
		editor.render();
}).fireEvent("change");
$$("#editor .options .label-color input").addEvent("change", function(event) {
	data.options.labels.color.normal = this.get("value");
	if(event)
		editor.render();
}).fireEvent("change");
$$("#editor .options .label-outside-color input").addEvent("change", function(event) {
	data.options.labels.color.inverse = this.get("value");
	if(event)
		editor.render();
}).fireEvent("change");
$$("#editor .options .hover-label-color input").addEvent("change", function(event) {
	data.options.labels.color.hover = this.get("value");
	if(event)
		editor.render();
}).fireEvent("change");
$$("#editor .options .labels-display input").addEvent("change", function(event) {
	data.options.labels.display = this.get("checked") ? "none" : "initial";
	if(event)
		editor.render();
}).fireEvent("change");
$$("#editor .options .border select").addEvent("change", function(event) {
	data.options.borders.pattern = this.get("value");
	if(event)
		editor.render();
}).fireEvent("change");
$$("#editor .options .border-color input").addEvent("change", function(event) {
	data.options.borders.color = this.get("value");
	if(event)
		editor.render();
}).fireEvent("change");
$$("#editor .options .show-html-links input").addEvent("change", function(event) {
	data.options.links.table = this.get("checked");
	if(event)
		editor.render();
}).fireEvent("change");
$$("#editor .options .links-open-new-window input").addEvent("change", function(event) {
	data.options.links.target = this.get("checked") ? "_blank" : "_top";
	if(event)
		editor.render();
}).fireEvent("change");
$$("#editor .options .show-link-titles input").addEvent("change", function(event) {
	data.options.titles.visible = this.get("checked");
	if(event)
		editor.render();
}).fireEvent("change");
$$("#editor .options .call-to-action input").addEvent("change", function(event) {
	data.options.message = this.get("value");
	if(event)
		editor.render();
}).fireEvent("change");

$$("#dialog .front .cross").addEvent("click", function(event) {
	event.stop();
	$("dialog").setStyle("display", "none");
});

 
$$("#paynow .closepaynow").addEvent("click", function(event) {
	event.stop();
	$("paynow").setStyle("display", "none");
});  
$$("#dialog .showpaynow").addEvent("click", function(event) {
	event.stop();
	$("paynow").setStyle("display", "block"); 
}); 



$$("[title]").each(function(element) {
	var title = element.get("title");
	element.set("title", "");
	element.addEvent("mouseenter", function() {
		var instance = ToolTip.instance(this, {
			hideDelay: 0
		}, title);
		instance.show();
		var size = this.getSize(),
			pos = this.getPosition();
		instance.toolTip.setStyles({
			position: "absolute",
			top: pos.y+size.y+5,
			left: pos.x+size.x-150
		});
	});
});
$$(".color").each(function(input) {
	new jscolor.color(input);
});
	
