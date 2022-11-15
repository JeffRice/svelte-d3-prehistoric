<script>
  // the canvas component holding the world map
  import { width, height, panelHeight, mapHeight } from '../stores/dimensions';
  import { bg, usaRed, usaLightRed, usaLightLightRed, preGreen, preBlue, prePurple } from '../utils/colors';
  import { countries, pangeaRegions, projection, geoPath } from '../stores/map';
  import { scaleFactor } from '../stores/scales';
  import { timeScale } from '../stores/scales';
  

  let canvas;

  import {select, geoGraticule, geoNaturalEarth1, geoMercator, geoPath as d3geoPath, scaleLinear} from "d3"
  import { onMount, afterUpdate } from "svelte";
  import { feature } from "topojson";
  import loadJurassicFossils from '../utils/loadJurassicFossils';
  import loadTriassicFossils from '../utils/loadTriassicFossils';
  import loadCretaceousFossils from '../utils/loadCretaceousFossils';
  
  

  let worldFeature;
  let worldjson;
  let graticule;
  let triassicFossilSpots;
  let jurassicFossilSpots;
  let cretaceousFossilSpots;

  import { fossilDatapoints, switchValueStore } from '../stores/elements';



  // const worldDataPath = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';
  const worldDataPath = 'countries-50m.json';

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


  jurassicFossilSpots = await loadJurassicFossils();
  triassicFossilSpots = await loadTriassicFossils();
  cretaceousFossilSpots = await loadCretaceousFossils();  
 // originalJurassicSpots = await loadFossilSpots();
 // originalCretaceousSpots = await loadFossilSpots3();


 // console.log(fossilSpots);




  $fossilDatapoints.jurassic = jurassicFossilSpots;
  $fossilDatapoints.originaljurassic = jurassicFossilSpots;
  $fossilDatapoints.triassic = triassicFossilSpots;
  $fossilDatapoints.originaltriassic = triassicFossilSpots;
  $fossilDatapoints.cretaceous = cretaceousFossilSpots;
  $fossilDatapoints.originalcretaceous = cretaceousFossilSpots;



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
  $: if (canvas && $countries && pangeaRegions && worldjson && jurassicFossilSpots && triassicFossilSpots && cretaceousFossilSpots && fossilDatapoints && $switchValueStore) {
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


let jurassicPaint= scaleLinear() .domain([140, 206]).range(["#a4e3ef","#2f9eb3"])

function createMap(dataset) {


  var dataBinding = locations.selectAll("points.arc")

    .data(dataset)
  
  		.enter()
      .append("points")
      .classed("arc", true)
      .attr("x", function(d) {return testProjection([d.y,d.x])[0]})
      .attr("y", function(d) {return testProjection([d.y,d.x])[1]})
      .attr("radius", 4)
  //    .attr("fillStyle", "#34B2C9")
      .attr("fillStyle", function(d) {return jurassicPaint(d.maxAge)})


   //   "rgba({255}, 165, 0, 1)"
   drawCanvas();

     

}

let triassicPaint= scaleLinear() .domain([199, 247]).range(["#f2caf7","#6c4870"])

function createTriassicMap(dataset) {



locations.selectAll("points.arc")

  .data(dataset)
    .enter()
    .append("points")
    .classed("arc", true)
    .attr("x", function(d) {return testProjection([d.y,d.x])[0]})
    .attr("y", function(d) {return testProjection([d.y,d.x])[1]})
    .attr("radius", 4)
  //  .attr("fillStyle", "#BD8CC3")
    .attr("fillStyle", function(d) {return triassicPaint(d.maxAge)})
//  " + d.maxAge + "
   drawCanvas();


console.log(dataset)


}

let cretaceousPaint= scaleLinear() .domain([60, 150]).range(["#aad5a9","#486848"])


function createCretaceousMap(dataset) {


locations.selectAll("points.arc")

.data(dataset)

  .enter()
  .append("points")
  .classed("arc", true)
  .attr("x", function(d) {return testProjection([d.y,d.x])[0]})
  .attr("y", function(d) {return testProjection([d.y,d.x])[1]})
  .attr("radius", 4)
  // .attr("fillStyle", "#678F66")
  .attr("fillStyle", function(d) {return cretaceousPaint(d.maxAge)})

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

function drawDonut() {

var elements = locations.selectAll("points.arc");
  elements.each(function(d, i) {
  var node = select(this);
  
  ctx.beginPath();
  ctx.arc(node.attr("x"), node.attr("y"), node.attr("radius"), 0, 2 * Math.PI);
  ctx.fillStyle = node.attr("fillStyle");
 // ctx.fill();
  ctx.lineWidth = 0.5;
    ctx.strokeStyle = node.attr("fillStyle");
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


 drawCanvas();









}



createTriassicMap($fossilDatapoints.triassic);

createMap($fossilDatapoints.jurassic);

createCretaceousMap($fossilDatapoints.cretaceous);



function removeAllFossils() {

$fossilDatapoints['cretaceous'] = [];
$fossilDatapoints['triassic'] = [];
$fossilDatapoints['jurassic'] = [];

 reDraw2();
return $fossilDatapoints;

}


function reDraw2() {

let locations = select('#points');
var elements = locations.selectAll("points.arc");

elements.each(function(d, i) {
var node = select(this);
this.remove();
drawCanvas();
})

}



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
    ctx.lineWidth = 1;
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
    ctx.globalAlpha = 0.15;
    ctx.lineWidth = 1;
    ctx.beginPath();
    $pangeaRegions.forEach($geoPath);
    ctx.fillStyle = preGreen;
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    
    setTimeout(function(){
      

        var fadeEffect = setInterval(function () {

          if (ctx.globalAlpha < 0.225){
            ctx.globalAlpha += 0.015;
          ctx.beginPath();
    $pangeaRegions.forEach($geoPath);
    ctx.fillStyle = preGreen;
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.5;
    ctx.stroke();
          console.log('draw?')
          }
          else {
            clearInterval(fadeEffect);
        }

        }, 80);
    },1);


    }

    

    if($switchValueStore === 'on'){
      pangeaMap()
    }
    if($switchValueStore === 'off'){
    }
      

function createLegend(){

  ctx.fillStyle = bg;
  ctx.fillRect($width - 250, $mapHeight - 230, 300, 230);
  ctx.strokeStyle = '#000';
  ctx.strokeRect($width - 250, $mapHeight - 230, 300, 230);


  ctx.font = 'bold 16px Quicksand';
  ctx.fillStyle = "#000";
  ctx.fillText('Fossil Color Scale', $width - 200, $mapHeight - 211);

  ctx.beginPath();
  ctx.moveTo($width - 200, $mapHeight - 205);
  ctx.lineTo($width - 66, $mapHeight - 205);
  ctx.stroke();


  ctx.font = '16px Quicksand';
  ctx.fillStyle = "#000";
  ctx.fillText('Cretaceous', $width - 200, $mapHeight - 179);
 // ctx.fillStyle = preBlue;


  //gradient
  const gradientCretaceous = ctx.createLinearGradient($width - 200, 0, $width - 25, 0);
  gradientCretaceous.addColorStop(0, "#aad5a9");
  gradientCretaceous.addColorStop(1, "#486848");
  ctx.fillStyle = gradientCretaceous;
  ctx.fillRect($width - 200, $mapHeight - 162, 175, 16);

  //years range
  ctx.fillStyle = '#000';
  ctx.font = '12px Quicksand';
  ctx.fillText('65 mya', $width - 200, $mapHeight - 165);
  ctx.fillText('145 mya', $width - 72, $mapHeight - 165);



   //time era
  ctx.font = '16px Quicksand';
  ctx.fillText('Jurassic', $width - 200, $mapHeight - 110);
//  ctx.fillStyle = prePurple;



  //gradient
  const gradientJurassic = ctx.createLinearGradient($width - 200, 0, $width - 25, 0);
  gradientJurassic.addColorStop(0, "#a4e3ef");
  gradientJurassic.addColorStop(1, "#2f9eb3");
  ctx.fillStyle = gradientJurassic;
  ctx.fillRect($width - 200, $mapHeight - 93, 175, 16);

  //years range
  ctx.fillStyle = '#000';
  ctx.font = '12px Quicksand';
  ctx.fillText('145 mya', $width - 200, $mapHeight - 96);
  ctx.fillText('201 mya', $width - 72, $mapHeight - 96);


  //time era
  ctx.fillStyle = '#000';
  ctx.font = '16px Quicksand';
  ctx.fillText('Triassic', $width - 200, $mapHeight - 41);

  //gradient
  const gradient = ctx.createLinearGradient($width - 200, 0, $width - 25, 0);
  gradient.addColorStop(0, "#f2caf7");
  gradient.addColorStop(1, "#6c4870");
  ctx.fillStyle = gradient;
  ctx.fillRect($width - 200, $mapHeight - 25, 175, 16);

  //years range
  ctx.fillStyle = '#000';
  ctx.font = '12px Quicksand';
  ctx.fillText('201 mya', $width - 200, $mapHeight - 28);
  ctx.fillText('251 mya', $width - 72, $mapHeight - 28);

}

createLegend ()





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
   <canvas bind:this={canvas}>
      <div id="points"></div>
  </canvas>
</div>
<style>

canvas {
    position: absolute;
    z-index: 0;
  }
				
</style>
