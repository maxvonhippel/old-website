/* ---------- dychart variables ------------- */

// start time for the chart
var gStartTime = new Date(2008-01-01);
// end time for the chart
var gEndTime = new Date();
// progress bar, amount of progress, chart, chart obj, data for chart
var bar, prog, dchart, chart, data;
// chart div name
var div = "chart";
// meta variable used for internal stuff
var self = this;
// meta variable used for figuring out what user wants when clicl
var click_out_warning = false;
// meta variable used for figuring out user intention when click
var click_to_see_day_warning = false;
// file to use for populating dychart
var file = "data/activity.csv";

/* ---------- leaflet variables ------------- */

// set up the options for our initial map
var southWest = L.latLng(26.487043, 78.739439);
var northEast = L.latLng(30.688485, 89.847341);
var mapOptions = {
	center: [28.478348, 86.542285],
	zoom: 7,
    minZoom:7,
	maxZoom:18,
	maxBounds: L.latLngBounds(southWest, northEast),
	attributionControl:false
};
// initialize global variables here
gNorth = northEast.lat,
gEast = northEast.lng,
gWest = southWest.lng,
gSouth = southWest.lat,
gStartTime=new Date("March 18, 2007 11:13:00");
gEndTime=new Date();
gCallFlag=0;
countTimes=0;
countTest=0;
searchText="";

// update variables
// current width out of 100 of the progress bar
var width = 1;
// one one hundredth of the total number of nodes we will parse
var hundredth =  1000;
var map_built = false;

var markers = [];

/* ---------- leaflet initialization ------------- */

// find the div and put the map there
var map = L.map("mapid", mapOptions);

// initialize the prune cluster object
var leafletView = new PruneClusterForLeaflet();

// find our nepal border geometry so we can mask anything outside nepal
var latLngGeom = nepal_border;
// get the map tiles and initialize the tiles and boundary mask on the leflet map
var osm = L.TileLayer.boundaryCanvas('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    boundary: nepal_border
    //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, <a href="http://kathmandulivinglabs.org/">Kathmandu Living Labs</a>'
}).addTo(map);
// map data attribution
var attrib = L.control.attribution({position:'bottomleft'});
attrib.addAttribution('Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, <a href="http://kathmandulivinglabs.org/">Kathmandu Living Labs</a>');
attrib.addTo(map);

//Fire this when map is panned/zoomed/reset
map.on('moveend', function(ev){
	//set new values for global geo coordinates
	_bounds=map.getBounds();
	gNorth=_bounds.getNorth();
	gSouth=_bounds.getSouth();
	gEast=_bounds.getEast();
	gWest=_bounds.getWest();
});

// how many total versions have we seen?
var a = 0;
// how many total node ids have we seen?
var mks = 0;

/* ---------- map update functions ------------- */

// iterates the progress bar by 1%, or resets if at 100 (that shouldn't happen though)
function move() {
	
	try {

		if (!prog || !bar)
			console.log("no elem");
		else if (width >= 100) {
			width = 1;
			bar.style.width = width + '%';
		} else {
			width++;
			bar.style.width = width + '%';
		}
		$('#myProgress').hide().show(0);

	} catch (err) { console.log(err); }
}

// handle nodes data from csv
function handlenodes(data) {

	console.log("filling map");
	if (data == "null" || data == null || !data) {
		console.log("no data for this day.");
		return;
	}

	bar.style.visibility = 'visible';
	prog.style.visibility = 'visible';

	Papa.parse(data, {

		download: false, 		// downloads the file, otherwise it doesn't work
		dynamicTyping: true, 	// automatically figures out if something is a string, number, etc
		delimiter: ",", 		// explicit statement improves speed
		worker: true,			// so the website doesn't lag
		step: function(row) {
			// console.log("row: ", row.data[0].toString());
			if (row.data[0].length == 4)
				parseresponse(row.data[0]);		// parse row by row for speed
		},
		complete: function() {

			console.log("All done parsing nodes for map from csv!");
			console.log("size of markers array: ", markers.length);
			// remove progress bar
			bar.style.visibility = 'hidden'
			prog.style.visibility = 'hidden'
			
			leafletView.ProcessView();
			map_built = true;
		},
		error: function(err, file, inputElem, reason)
		{
			// executed if an error occurs while loading the file,
			// or if before callback aborted for some reason
			console.log("error parsing map: ", err, reason);
		}
	});

}

// parse the response from the csv
function parseresponse(c) {

	try {
		// console.log("parse response: ", c.toString());
		// initialize new marker
		var marker = new PruneCluster.Marker(c[2], c[1]);
		// feature_id
		marker.data.id = c[0];
		// number of individual versions
		w = 0;
		// array of versions
		var versions = [];
		marker.data.versions = [];
		// then iterate over the csv within
		c[3].toString().replace(/["'{}]/g, "").replace(/([^:,]+):([^,]*)/g, function(noStep3, name, stamp) {
			// console.log("edit: ", name, " and stamp: ", stamp);
			// keep track of number of versions total parsed
			a += 1;
			w += 1;
			if (a % hundredth == 0) {
				console.log("incrementing the progress bar");
				move();
			}
			versions.push([Object.freeze(name.toString()), Object.freeze(new Date(stamp.toString().slice(0, -1)))]);

		});
		// do we have a legit node to add now?
		if (w > 0) {

			// number of items in the cluster
			marker.weight = w;
			// hold all versions in data as array
			marker.data.versions = versions;
			// keep track of total node ids parsed
			mks += 1;
			// add to markers data
			markers.push(marker);
			// add to map (not yet rendered)
			leafletView.RegisterMarker(marker);
		}

	} catch (err) { console.log(err + "; full str: " + c.toString()); }
	// ^^ log error and move on, usually can expect a couple, it's ok
}

// get the map data
function get_map_data(url) {

	console.log("getting map data");
	$.ajax({
	    type: "GET",
		url: url,
		dataType: "text",
		success: function(data) {
			console.log("success.  Calling handlenodes.");
			handlenodes(data);
		},
		error: function(xhr, ajaxOptions, thrownError) { console.log("error getting map files: ", xhr.responseText); }
   });

}

// fill the map with data
function fillmap() {

	console.log("getting nodes file");
	leafletView.RemoveMarkers();

	if (map_built == false) {

		// build the map
		markers = [];
		console.log("called fill_map, getting full map data");
		get_map_data("data/nodes_small_demo.csv");

	} else {

		console.log("we already have markers, populating map now.");
		for (var mnum = 0; mnum < markers.length; mnum++) {
			var marker = markers[mnum];
			// add to map (not yet rendered)
			leafletView.RegisterMarker(marker);
		}
		filter_map(gStartTime, gEndTime);
		console.log("map should now show full version stuff using previously downloaded data.");

	}

}

function filter_map(start, end) {

	// get current zoom bounds
	var zoom = map.getBounds();

	for (let m of markers) {

		try {

			verdate = m.data.versions[0][1];
			var inzoom = (zoom._southWest.lat <= m.position.lat && zoom._southWest.lng <= m.position.lng && zoom._northEast.lat >= m.position.lat && zoom._northEast.lng >= m.position.lng);
			var filtered = !(verdate.getDate() >= start.getDate() && verdate.getDate() <= end.getDate() && inzoom);
			m.filtered = filtered;

		} catch (err) { console.log(err); }
		//leafletView.ProcessView();

	}
	// process changes
	leafletView.ProcessView();
}

/* --------- dychart stuff --------- */

// populates the dychart with data
function popupate_chart() {

	dchart = new Dygraph(
        document.getElementById(div),
        file,
        {

            axisLineColor:'#09b0a5',
            colors:['#15A6B7','#FF7C33'],
            labelsDiv:"dy_legend",
            labelsSeparateLines: true,
            labelsKMG2: true,
			showRoller: false,
            customBars: false,
            legend: 'always',
            labelsDivStyles: { 'textAlign': 'right' },
            showRangeSelector: false,
            axisLabelFontSize: 11,
            drawCallback: function() {
	            gStartTime = new Date(dchart.xAxisRange()[0]);
				gEndTime = new Date(dchart.xAxisRange()[1]);
				console.log("initialized chart with start date: ", gStartTime, " end date: ", gEndTime);
				self.filter_map(gStartTime, gEndTime);
	            done = true;
            },
            zoomCallback: function(minDate, maxDate, yRanges) {
	            if (done == true) {
		            gStartTime = new Date(minDate);
					gEndTime = new Date(maxDate);
					self.filter_map(gStartTime, gEndTime);
					done = false;
	            }
	            if (click_out_warning == false) {
					click_out_warning = true;
					alert("Double click anywhere on the chart to zoom back out.");
	            }
  			}
        }
    );

}

$(document).ready(function () {

	// find the progress bar so we can increment it
	bar = document.getElementById("myBar");
	prog = document.getElementById("myProgress");
	// make it invisible
	bar.style.visibility = 'hidden';
	prog.style.visibility = 'hidden';
    // populate the chart
    popupate_chart();
	// resize so redraw is forced
	//var cur_width = $("#chart").width();
	//var cur_height = $("#chart").height();
	//dchart.resize(10, 10);
	//dchart.resize(cur_width, cur_height);
	// fill the map
	fillmap();
	leafletView.ProcessView();
	map.addLayer(leafletView);

});
