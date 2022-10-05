<script>
  // the canvas component holding the world map
  import { width, height, panelHeight, mapHeight } from '../stores/dimensions';
  import { bg, usaRed, usaLightRed, usaLightLightRed, preGreen } from '../utils/colors';
  import { countries, projection, geoPath } from '../stores/map';
  import { scaleFactor } from '../stores/scales';
  import { timeScale } from '../stores/scales';


  let canvas;

  import {select, geoGraticule, geoNaturalEarth1, geoMercator, geoPath as d3geoPath} from "d3"
  import { onMount, afterUpdate } from "svelte";
  import { feature } from "topojson";
  import loadFossilSpots from '../utils/loadFossilSpots';
  import loadFossilSpots2 from '../utils/loadFossilSpots2';
  import loadFossilSpots3 from '../utils/loadFossilSpots3';

  

  let worldFeature;
  let worldjson;
  let graticule;
  let fossilSpots;
  let fossilSpots2;
  let fossilSpots3;  


  import { fossilDatapoints, switchValueStore } from '../stores/elements';



  const worldDataPath = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

  onMount(async function() {
    const response = await fetch(
      "geopangea.json"
    );
    const json = await response.json();
  //  console.log('json: ', json)



    const worldResponse = await fetch(worldDataPath);
    worldjson = await worldResponse.json();
  //  console.log('worldjson: ', worldjson)



    worldFeature = feature(worldjson, worldjson.objects.countries);
  //  console.log('worldFeature: ', worldFeature)

   // This removes antartica from the world map
   // worldFeature.features = worldFeature.features.filter((c) => c.properties.name !== 'Antarctica');
  //  console.log(worldFeature.features );


  fossilSpots = await loadFossilSpots();
  fossilSpots2 = await loadFossilSpots2();
  fossilSpots3 = await loadFossilSpots3();  
 // originalJurassicSpots = await loadFossilSpots();
 // originalCretaceousSpots = await loadFossilSpots3();


 // console.log(fossilSpots);




  $fossilDatapoints.jurassic = fossilSpots;
  $fossilDatapoints.originaljurassic = fossilSpots;
  $fossilDatapoints.triassic = fossilSpots2;
  $fossilDatapoints.originaltriassic = fossilSpots2;
  $fossilDatapoints.cretaceous = fossilSpots3;
  $fossilDatapoints.originalcretaceous = fossilSpots3;



  });

//to update the fossil locations on resize
  $: if($width || $height) {
    reDraw();
  }
/*
another way to redraw on updates
  afterUpdate(() => {
		// ...the DOM is now in sync with the data
    reDraw(); 
	});
*/


 // $: if (canvas && $countries.length > 0) {
  $: if (canvas && $countries && worldjson && fossilSpots && fossilSpots2 && fossilSpots3 && fossilDatapoints && $switchValueStore) {
  //  console.log('countries store', $countries)
 //   console.log('fossilSpots: ', fossilSpots)

  //  console.log($projection)



    let geoNaturalEarth1projection = geoNaturalEarth1()
    .scale(225 + ($width / 25))
  // .scale($width / 1.3 / Math.PI)
  //  .rotate([10, -15])
    .translate([$width / 2, ($mapHeight / 2)])

    let testProjection = geoMercator()
    .scale($projection.scale())
    .translate($projection.translate())


    let geoGenerator = d3geoPath()
  .projection($projection)
  .context(ctx);

    let projectionCopy = $projection;
    
  //initial canvas setup
    canvas.width = $scaleFactor * $width;
    canvas.height = $scaleFactor * $height;
    canvas.style.width = `${$width}px`;
    canvas.style.height = `${$height}px`;




    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.scale($scaleFactor, $scaleFactor);
    ctx.translate(0, $panelHeight);


    ctx.strokeStyle = preGreen;
    ctx.fillStyle = bg;
    ctx.fillRect(0, -$panelHeight, $width, $height);

    
    $geoPath.context(ctx);

   // console.log(projection)



        // begin fossil adding code
        let container = select("#container")
    	.style("width", width + "px")
    	.style("height", height + "px");
				
let base = select('#map');


let locations = select('#points');


let layer = select('.layer');

let info = base.append("div")
    .attr("class", "info");



function createMap(dataset) {


  var dataBinding = locations.selectAll("points.arc")

    .data(dataset)
  
  		.enter()
      .append("points")
      .classed("arc", true)
      .attr("x", function(d) {return testProjection([d.y,d.x])[0]})
      .attr("y", function(d) {return testProjection([d.y,d.x])[1]})
      .attr("radius", 4)
      .attr("fillStyle", "#34B2C9")


      
      drawCanvas();

     

}

function createTriassicMap(dataset) {


locations.selectAll("points.arc")

  .data(dataset)

    .enter()
    .append("points")
    .classed("arc", true)
    .attr("x", function(d) {return testProjection([d.y,d.x])[0]})
    .attr("y", function(d) {return testProjection([d.y,d.x])[1]})
    .attr("radius", 5)
    .attr("fillStyle", "#BD8CC3")


    drawCanvas();



}

function createCretaceousMap(dataset) {


locations.selectAll("points.arc")

.data(dataset)

  .enter()
  .append("points")
  .classed("arc", true)
  .attr("x", function(d) {return testProjection([d.y,d.x])[0]})
  .attr("y", function(d) {return testProjection([d.y,d.x])[1]})
  .attr("radius", 3)
  .attr("fillStyle", "#678F66")


  drawCanvas();



}

function drawCanvas() {

	var elements = locations.selectAll("points.arc");
  	elements.each(function(d, i) {
    var node = select(this);
		
    ctx.beginPath();
		ctx.arc(node.attr("x"), node.attr("y"), node.attr("radius"), 0, 2 * Math.PI);
		ctx.fillStyle = node.attr("fillStyle");
    ctx.fill();
    ctx.lineWidth = 0.5;
      ctx.strokeStyle = '#fff';
      ctx.stroke();
    ctx.closePath();
	})

}

function reDraw() {


  var elements = locations.selectAll("points.arc");

//  console.log('elements: ', elements)

  	elements.each(function(d, i) {
      console.log('element: ', elements[i])
    var node = select(this);
  //  console.log(d, node, i, this)

    this.remove();

    })

 
/*
	ctx.clearRect(0, -$panelHeight, $width, $height);
  ctx.fillRect(0, -$panelHeight, $width, $height);

*/
    
ctx.clearRect(0, -$panelHeight, $width, $height);




 //   ctx.fillRect(0, -$panelHeight, $width, $height);

//  ctx.fillRect(0, -$panelHeight, $width, $height);



  


//  console.log("redrawing")

// worldMap();
// pangeaMap();
 // makeGraticules();
 drawCanvas();









}


createTriassicMap($fossilDatapoints.triassic);

createMap($fossilDatapoints.jurassic);

createCretaceousMap($fossilDatapoints.cretaceous);



function makeGraticules() {

  let geoGenerator = d3geoPath()
  .projection(geoNaturalEarth1projection)
  .context(ctx);


            // Create and configure the graticule generator (one line every 20 degrees)
        graticule = geoGraticule()
            ctx.beginPath();
      //      ctx.globalAlpha = 0.45;
            ctx.strokeStyle = '#ccc';
            geoGenerator(graticule());
            geoGenerator(graticule.outline());
            ctx.stroke();

            ctx.lineWidth = 2;
            let outline = graticule.outline();
            ctx.beginPath();
            ctx.strokeStyle = '#000';
            geoGenerator(outline);
            ctx.stroke();

}

         makeGraticules();


function worldMap() {
      // Current World Map
      ctx.save();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.5;
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.globalAlpha = 0.35;
  //  worldFeature.features = worldFeature.features.filter((d) => d.properties.name !== 'Antarctica');
    worldFeature.features.forEach($geoPath);
    
    ctx.stroke();
    ctx.fill();
    ctx.restore();

}

 

    worldMap()

    function pangeaMap() {
          //Pangea map
    ctx.strokeStyle = preGreen;
    ctx.globalAlpha = 0.75;
    ctx.lineWidth = 1;
    ctx.beginPath();
    $countries.forEach($geoPath);
    ctx.fillStyle = preGreen;
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    }

    if($switchValueStore === 'on'){
      pangeaMap()
    }
  }


  function reDraw() {

let locations = select('#points');
var elements = locations.selectAll("points.arc");

// console.log('elements: ', elements)

elements.each(function(d, i) {
// console.log('element: ', elements[i])
var node = select(this);
// console.log(d, node, i, this)

this.remove();

})


// console.log("redrawing")

}


</script>



<div class="layer"></div>
<div id="map">
   <canvas bind:this={canvas}><div id="points"></div></canvas>
</div>
 

<style>

canvas {
    position: absolute;
    z-index: 0;
  }
				
</style>
