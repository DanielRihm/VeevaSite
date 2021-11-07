var data = sessionStorage.getItem("csvInput");
var input = data.split("\n");
var columnData = parseCSV(input);

var width = 960, height = 1160;

var svg = d3.select("#map").append("svg").attr("width", width).attr("height", height);

var projection = d3.geo.albersUsa()
	.translate([width/2, height/2])    // translate to center of screen
	.scale([1000]);          // scale things down so see entire US

var path = d3.geo.path().projection(projection);

var color = d3.scale.linear()
	.range(["rgb(213,222,217)","rgb(111,189,185)","rgb(69,173,168)","rgb(41,148,142)","rgb(84,36,55)","rgb(217,91,67)","rgb(173,39,14)"]);

var legendText = ["0-10k", "10k-20k", "20k-30k", "30k-40k","40k-50k","50k-60k","60k-70k"];

// extract object data for each state
var stateData = [];
for (var i = 0; i < columnData.length; i++) {
    addStateData(stateData, columnData[i]);
}

// give color data to state data
var range = [0,10000,20000,30000,40000,50000,60000,70000];
parseStateColorData(stateData,range);

// Load GeoJSON data and merge with states data
d3.json("states-10m.json", function(json) {
    json = topojson.feature(json, json.objects.states);
    // Loop through each state data value in the .csv file
    for (var i = 0; i < stateData.length; i++) {
    
        // Grab State Name
        var dataState = stateData[i].state;
    
        // Grab data value 
        var dataValue = stateData[i].color;
    
        // Find the corresponding state inside the GeoJSON
        for (var j = 0; j < json.features.length; j++)  {
            var jsonState = json.features[j].properties.name;
    
            if (dataState == jsonState) {
    
            // Copy the data value into the JSON
            json.features[j].properties.color = dataValue; 
    
            // Stop looking through the JSON
            break;
            }
        }
    }

    // Bind the data to the SVG and create one path per GeoJSON feature
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", "1")
        .style("fill", function(d) {

            // Get data value
            var value = d.properties.color;

            if (value) {
                //If value exists…
                return color(value);
            } else {
                //If value is undefined…
                return "rgb(213,222,217)";
            }
    });

    var legend = d3.select("body").append("svg")
      	.attr("class", "legend")
     	.attr("width", 140)
    	.attr("height", 200)
   		.selectAll("g")
   		.data(color.domain().slice().reverse())
   		.enter()
   		.append("g")
     	.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);
    
    legend.append("text")
        .data(legendText)
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .text(function(d) { return d; });
});

/*
d3.json("states-10m.json", function(error, us) {
    if (error) return console.error(error);
      
    var states = topojson.feature(us, us.objects.states);

    svg.selectAll(".states")
    .data(topojson.feature(us, us.objects.states).features)
  .enter().append("path")
    .attr("class", function(d) { return "state " + d.id; })
    .attr("d", path);
});
*/