/*
This function works like $_GET on php.
*/
function getVar(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

function rendermap(data, d3, path, width, height, options) {

    d3.select("#map")
        .attr("width", width)
        .attr("height", height)
        .html("")
        .append("g")
        .append("g")
        .attr("id", "states");

    data.features.each(function(d) {

        var state = data.states[d.id];
        var a = document.createElementNS("http://www.w3.org/2000/svg", "a");

        a.addEvents({
            click: function(event) {
                event.stop();
                if (state.onClick && !event.control) {
                    state.onClick(event);

                } else {
                    if (!state.link)
                        return;

                    switch (data.options.links.target) {
                        case "_top":
                            top.postMessage("__MM-LOCATION.REDIRECT" + state.link, "*");
                            break;
                        case "_blank":
                            open(state.link);
                            break;
                    }
                }
            },

            mouseover: function() {
                if (data.options.titles.visible)
                    $("title").set("text", state.title);
            },

            mouseout: function() {
                $("title").set("text", "");
            }
        });


        $("states").adopt(a);

        a = d3.select(a)
            .attr("id", "s" + d.id);

        if (data.options.borders.pattern != "0, 1") {
            var strokeSize = 1.5;
            if ( width < '600' ) {
                strokeSize = 0.5;
            } 

            a.append("path")
                .attr("d", path(d))
                .attr("stroke", data.options.borders.color)
                .attr("stroke-dasharray", data.options.borders.pattern)
                .attr("stroke-width", strokeSize);

        } else {
            a.append("path")
                .attr("d", path(d))
                .attr("stroke", data.options.states.color.normal);
        }

        /*
        	In editing mode it will show underline or a * if the state to show the user he added a link this state/region.
        */
        var stateText = d.properties.abbr;
        var online = getVar("online");

        if ((state.link) && online != "true") {
            stateText += "*";
        }

        if ( data.options.maplocation == "" || width > '500') {
            a.append("text")
                .attr("x", _labelPos(path, d)[0])
                .attr("y", _labelPos(path, d)[1])
                .text(stateText)
                .attr('title', stateText)
                .attr('class', 'hint')
                .attr("style", options.editor && state.link ? "text-decoration: underline;" : "");

            a.append("title").text("");

            /*
            add the invert label to certain states
            */
            var $inverse = "";
            
            var display = typeof data.options.labels.display; 

            if (data.options.labels.display === 'initial' || display === 'undefined') {
                if (_labelIsExt(path, d)) {
                    a.classed("inverse", true)
                        .append("line")
                        .attr("x1", path.centroid(d)[0])
                        .attr("y1", path.centroid(d)[1])
                        .attr("x2", _labelIsExt(path, d)[0])
                        .attr("y2", _labelIsExt(path, d)[1]);
                    $inverse = "inverse";
                }
            } 
        }

        if (state.link) {
            a.attr("xlink:href", state.link);
        }
        a.attr("title", state.name);
        a.attr("class", "hint " + $inverse);

        var text = d3.select('text');
        text.attr('title', state.name);
        text.attr("class", "hint");
    });

    document.body.setStyles({
        font: data.options.font,
        background: data.options.background
    });

    var style = "";
    style += "#states a path {";
    style += "  transition: fill .5s ease; -moz-transition: fill .5s ease; -webkit-transition: fill .5s ease; ";
    style += "  fill: " + data.options.states.color.normal + ";";
    style += "}";
    style += "#states a:hover path {";
    style += "  transition: fill .5s ease; -moz-transition: fill .5s ease; -webkit-transition: fill .5s ease; ";
    style += "  fill: " + data.options.states.color.hover + " !important;";
    style += "}";
    Object.each(data.states, function(state) {
        if (state.color) {
            style += "#states #s" + state.id + " path {";
            style += "  transition: fill .5s ease; -moz-transition: fill .5s ease; -webkit-transition: fill .5s ease; ";
            style += "  fill: " + state.color + ";";
            style += "}";

            style += "#states #s" + state.id + " path:hover {";
            style += "  cursor: pointer;";
            style += "  fill: " + data.options.states.color.hover + ";";
            style += "}";

        }
    });

    style += "#states a:hover path {";
    style += "  cursor: pointer;";
    style += "  fill: " + data.options.states.color.hover + ";";
    style += "}";
    style += "#states a text {";
    style += "  cursor: pointer;";
    style += "  fill: " + data.options.labels.color.normal + ";";
    style += "  display: " + data.options.labels.display + ";";
    style += "}";
    style += "#states a:hover text {";
    style += "  fill: " + data.options.labels.color.hover + ";";
    style += "  color: " + data.options.labels.color.hover + ";";
    style += "}";
    style += "#states a.inverse text:hover {";
    style += "  fill: " + data.options.labels.color.hover + ";";
    style += "}";

    style += "#states a.inverse text {";
    style += "  fill: " + data.options.labels.color.inverse + ";";
    style += "}";
    style += ".CCMcredit a {";
    style += "  color: " + data.options.states.color.normal + ";";
    style += "}";

    if (data.options.background === '#000000') {
        style += "#title {";
        style += "  color: #ffffff;";
        style += "}";
    }
	
    if (data.options.maplocation == "world" ) {
        style += " #states a text { display: none; } ";
    }

    var fontsize;

    switch (data.options.maplocation) {
        case 'mexico':
        case 'pa':
        case 'oh':
            fontsize = 10;
            break;
        case 'ca':
        case 'nys':
        case 'florida':
        case 'ky':
        case 'tn':
        case 'az':
        case 'san-salvador':
            fontsize = 9;
            break;
        default:
            fontsize = 12;
    }
    

    if ( width <= '850')  {
        fontsize = 8;
        style += "#states a text {";
        style += "  font-size: " + fontsize + "px;";
        style += "}";
    } else {
        style += "#states a text {";
        style += "  font-size: " + fontsize + "px;";
        style += "}";
    }

    

    $("style").set("html", style.clean());

    $("message").set("text", data.options.message || "");
	
	
   if ( data.options.maplocation == "world" ) {
	   
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
        
                    var x = _x( title, pos.x);
                    var y = _y( title, pos.y);
                    
                    instance.toolTip.setStyles({
                        position: "absolute",
                        top: y,
                        left: x,

                    });
                });
            });
    }
	
}