// DATA BELOW, BLAME CORS FOR THIS HIDEOUSNESS
var thedata = [{
 "name": "Contents",
 "children": [
  {
    "name": "Essays",
    "children": [
      {"name": "Storm", "size": 2, "url": "blog posts/storm.html"},
      {"name": "Francesca", "size": 2, "url": "blog posts/Ches.html"},
      {"name": "Talent", "size": 2, "url": "blog posts/Talent.html"}
    ]
  },
    {
     "name": "Coding",
     "children": [
        {"name": "General Electric", "size": 2, "url": "http://mxvh.pl/GE"},
          {"name": "Resume", "size": 2, "url": "http://mxvh.pl/resume/"},
          {"name": "QIIME 2", "size": 2, "url": "https://github.com/qiime2"},
          {"name": "OSM Client", "size": 2, "url": "blog posts/nepal_demo.html"},
        {"name": "OSM Server", "size": 2, "url": "https://github.com/maxvonhippel/OSMHistoryServer"},
          {"name": "Chetawani", "size": 2, "url": "https://github.com/maxvonhippel/Chetawani"},
        {"name": "iOS Graveyard", "size": 2, "url": "https://github.com/maxvonhippel/iOS-Graveyard"}
      ]
    },
    {
      "name": "Photos",
      "children": [
     {"name": "Best Of", "size": 2, "url": "/blog posts/photography.html"},
     {"name": "Road Trip", "size": 2, "url": "/blog posts/roadtrip.html"},
     {"name": "500px", "size": 2, "url": "https://500px.com/maxvonhippel"}
      ]
    },
    {
      "name": "Humor",
      "children": [
          {"name": "AK Heard", "size": 2, "url": "https://twitter.com/alaskaheard"},
          {"name": "Nietzsche", "size": 2, "url": "https://twitter.com/HiphopNietzsche"}
      ]
    },
    {
      "name": "Me Online",
      "children": [
        {"name": "Stack Overflow", "size": 2, "url": "http://stackoverflow.com/users/1586231/max-von-hippel"},
        {"name": "Keybase.io", "size": 2, "url": "https://keybase.io/maxvonhippel"},
        {"name": "GitHub", "size": 2, "url": "https://github.com/maxvonhippel/"},
        {"name": "Reddit", "size": 2, "url": "https://www.reddit.com/user/Maxvh/"},
        {"name": "YouTube", "size": 2, "url": "https://www.youtube.com/c/MaxvonHippel"}
      ]
    },
    {
      "name": "Press, etc.",
      "children": [
        {"name": "Infinity Dental", "size": 2, "url": "https://www.infinitydentalweb.com/scholarship-winners.html"},
      {"name": "Davis UWC", "size": 2, "url": "http://www.davisuwcscholars.org/scholars/class-of-2019/v/node/12685"},
        {"name": "Quake Summit", "size": 2, "url": "http://dickey.dartmouth.edu/global-engagement/conferences-initiatives/nepal-earthquake-summit"},
        {"name": "2016", "size": 2, "url": "http://www.thedartmouth.com/article/2015/10/an-eye-for-innovation/"},
        {"name": "1996", "size": 2, "url": "http://www.dartmouth.org/classes/89/Newsletters/1997%20March.htm"},
        {"name": "2002!", "size": 2, "url": "http://www.pitt.edu/~atsea/atsea.html"},
        {"name": "ZipLine", "size": 2, "url": "http://atitlanreserva.com/wp/en/2015/08/11/ziptrek-footage/"},
        {"name": "Andreesen", "size": 2, "url": "http://www.internethistorypodcast.com/2015/10/this-is-really-cool/"},
        {"name": "Hacking Voting", "size": 2, "url": "https://www.facebook.com/NowThisPolitics/videos/1892166217481526/"}
      ]
    }
 ]
}];
// CODE BELOW
document.getElementById("NOJS").outerHTML = "";

var width = 960,
    height = 1000,
    radius = Math.min(width, height) / 2;

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.linear()
    .range([0, radius]);

var color = d3.scale.category20c();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
	.append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

d3.json(thedata, function(error, root) {
  var g = svg.selectAll("g")
      .data(partition.nodes(root))
    .enter().append("g");

  var path = g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
    .on("click", click);

  var text = g.append("text")
    .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
    .attr("x", function(d) { return y(d.y); })
    .attr("dx", "6") // margin
    .attr("dy", ".35em") // vertical-align
    .on("click", click)
    .text(function(d) { return d.name; });

  function click(d) {
  	if (d.url != null) {
  		location.href = d.url;
  	}
  	// fade out all text elements
  	text.transition().attr("opacity", 0);

  	path.transition()
  	.duration(750)
  	.attrTween("d", arcTween(d))
  	.each("end", function(e, i) {
  	        // check if the animated element's data e lies within the visible angle span given in d
  	        if (e.x >= d.x && e.x < (d.x + d.dx)) {

  				var arcText = d3.select(this.parentNode).select("text");
  				// fade in the text element and recalculate positions
  				arcText.transition().duration(750)
  				.attr("opacity", 1)
  				.attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
  				.attr("x", function(d) { return y(d.y); });
  	        }
  	});
  }

});

d3.select(self.frameElement).style("height", height + "px");

// Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

function computeTextRotation(d) {
  return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
}