<script>
	import data from './data';
	import { csv, min, max, forceSimulation, forceX, forceY, forceManyBody, forceCenter, forceCollide, } from 'd3';
	import { select, selectAll } from 'd3-selection';
	import { data as dataz } from '../inputs/dataPaths';
	import Chart from './Chart.svelte';
	import ChartSelector from './ChartSelector.svelte';
	import loadData from '../utils/loadData';
	import { onMount } from "svelte";
	import { originalTimeDomain } from '../stores/filters';
	import { beforeUpdate, afterUpdate } from 'svelte';

 import {
    width,
    height,
    panelHeight,
    minDim,
    maxDim,
    margin,
    controlsHeight } from '../stores/dimensions';

	let selectedOption = 'f';
	let fossilSpots, fossilSpots10, fossilSpots20, fossilSpots200, fossilSpots2000;
	let fossilSpots40;

	let oktest, svg;

	let newTestData = {
	a: [
		{ x: 10, y: 8.04 },
		{ x: 8, y: 6.95 },
		{ x: 13, y: 7.58 },
		{ x: 9, y: 8.81 },
		{ x: 11, y: 8.33 },
		{ x: 14, y: 9.96 },
		{ x: 6, y: 7.24 },
		{ x: 4, y: 4.26 },
		{ x: 12, y: 10.84 },
		{ x: 7, y: 4.82 },
		{ x: 5, y: 5.68 }
	],
	b: [
		{ x: 10, y: 9.14 },
		{ x: 8, y: 8.14 },
		{ x: 13, y: 8.74 },
		{ x: 9, y: 8.77 },
		{ x: 11, y: 9.26 },
		{ x: 14, y: 8.1 },
		{ x: 6, y: 6.13 },
		{ x: 12, y: 3.1 },
		{ x: 12, y: 9.13 },
		{ x: 7, y: 7.26 },
		{ x: 5, y: 4.74 }
	],
	c: [
		{ x: 10, y: 7.46 },
		{ x: 8, y: 6.77 },
		{ x: 13, y: 12.74 },
		{ x: 9, y: 7.11 },
		{ x: 11, y: 7.81 },
		{ x: 14, y: 8.84 },
		{ x: 6, y: 6.08 },
		{ x: 4, y: 5.39 },
		{ x: 12, y: 8.15 },
		{ x: 7, y: 6.42 },
		{ x: 5, y: 5.73 }
	],
	d: [
		{ x: 8, y: 6.58 },
		{ x: 8, y: 5.76 },
		{ x: 8, y: 7.71 },
		{ x: 8, y: 8.84 },
		{ x: 8, y: 8.47 },
		{ x: 8, y: 7.04 },
		{ x: 8, y: 5.25 },
		{ x: 19, y: 12.5 },
		{ x: 8, y: 5.56 },
		{ x: 8, y: 7.91 },
		{ x: 8, y: 6.89 }
	],
	e: [
		{ x: 8, y: 6.58 },
		{ x: 8, y: 5.76 },
		{ x: 8, y: 7.71 },
		{ x: 8, y: 8.84 },
		{ x: 8, y: 8.47 },
		{ x: 8, y: 7.04 },
		{ x: 8, y: 5.25 },
		{ x: 19, y: 12.5 },
		{ x: 8, y: 5.56 },
		{ x: 8, y: 7.91 },
		{ x: 8, y: 6.89 }
	],
	f: [
		{ x: 8, y: 6.58 },
		{ x: 8, y: 5.76 },
		{ x: 8, y: 7.71 },
		{ x: 8, y: 8.84 },
		{ x: 8, y: 8.47 },
		{ x: 8, y: 7.04 },
		{ x: 8, y: 5.25 },
		{ x: 19, y: 12.5 },
		{ x: 8, y: 5.56 },
		{ x: 8, y: 7.91 },
		{ x: 8, y: 6.89 }
	]
}


	onMount(async () => {

		const dinoChartData = await csv(dataz, (d, i) => {
			return {
				x: parseFloat(d.size),
				y: parseFloat(d.weight),
				name: d.name,
				hoverName: d.name
			  };


	});

	fossilSpots = await dinoChartData;
	fossilSpots40 = dinoChartData;

	if(dinoChartData){



		console.log(dinoChartData)


		selectedOption = 'a';

			}

		fossilSpots10 = dinoChartData.filter(d => d.x < 11);
		fossilSpots20 = dinoChartData.filter(d => d.x < 26  && d.x > 10);
		fossilSpots40 = dinoChartData.filter(d => d.x < 40  && d.x > 25);
		fossilSpots200 = dinoChartData.filter(d => d.x > 39);
		//fossilSpots2000 = dinoChartData.map(d => d);
		fossilSpots2000 = dinoChartData.map(({name, ...d}) => d)
		console.log(fossilSpots2000)
		
});

	$: if(fossilSpots10) {
		newTestData.a = fossilSpots10;
	}

	$: if(fossilSpots20) {
		newTestData.b = fossilSpots20;
	}

	$: newTestData.c = fossilSpots40;

	$: if(fossilSpots200) {
		newTestData.d = fossilSpots200;
	}

	$: if(fossilSpots) {
		newTestData.e = fossilSpots2000;
	}

	$: selectedData = newTestData[selectedOption].sort((a, b) => a.x < b.x ? 1 : -1);
	   
	$: if(selectedData){
	//	arrangeLabels()
	//	cool()
	}


    afterUpdate(() => {
	//	arrangeLabels()
});


	 function cool(){
		console.log(selectedData)
		
		    // for some reason these definitions need to be in here and not in a gobal scope or module
			const simulation = forceSimulation()
      .force('x', forceX().x(d => d._x));

    const simulationCharge = forceSimulation()
      .force('x', forceX().x(d => d._x))
   //   .force('charge', forceManyBody().strength((d) => -(d.rSizeTot + 1) * 10).distanceMax(500).distanceMin(50));
    //  .force('charge', forceManyBody().strength((d) => -(d.size + 10) * 95).distanceMax(450).distanceMin(200));
   //   .force('charge', forceManyBody().strength((d) => -(d.size + 50) * 10).distanceMax(500).distanceMin(250));
   .force('charge', forceManyBody().strength(-50));
    simulation
      .nodes(selectedData)
      .alpha(0.8)
      .tick(300);
 //  console.log(scaledData)
    // finally set the global timePoints variable
    simulationCharge
      .nodes(selectedData) 
      .alpha(0.8)
      .tick(300)
      .on('end', () => {
        oktest = selectedData.map((d) => ({


          ...d,
		  y: d.y,
		  z: parseInt(d.x),
          x: $originalTimeDomain
              ? d.x 
              : Math.max(
                  $margin.left - Math.random() * $margin.left / 4, 
                  Math.min($width - $margin.right + (Math.random() + 2) * $margin.right / 4, d.x)
                )
        }));
		console.log(oktest)
    });


	}


    function arrangeLabels() {
        svg = select(".scatter-chart")
		
  var move = 10;
  while(move > 0) {
    move = 0;
    select(".scatter-chart").selectAll(".place-label")
       .each(function() {
         var that = this,
             a = this.getBoundingClientRect();
		let z = select(this).attr("transform")
			 console.log(z);
			let zztest = z.split(" ");
			 console.log(zztest);

			 console.log(zztest[1].slice(0, -1));
			 console.log(zztest[0].slice(10, zztest[0].length));
		//    if(!typeof(z.translateX === NaN)){
		//	console.log('big boi skip', this);
		//	}
				  console.log(select(this).attr("transform"));
				  let zz = select(this).attr("transform")
				  console.log(select(that).attr("transform"));
				  let xx = select(that).attr("transform")
				  console.log('this', this);
				  console.log('that', that);
				  console.log('zz', zz);
				  console.log('xx', xx);
				  if(zz === 'NaN)' || zz === 'translate(NaN,NaN)' || zz === 'translate(NaN)' || xx === 'translate(NaN,NaN)' || xx === 'translate(NaN)' || xx === 'NaN)'){
					console.log('Fuckin Skip!');
					return
				}

				select(".scatter-chart").selectAll(".place-label")
            .each(function() {
              if(this != that) {
                var b = this.getBoundingClientRect();
                if((Math.abs(a.left - b.left) * 2 < (a.width + b.width)) &&
                   (Math.abs(a.top - b.top) * 2 < (a.height + b.height))) {
                  // overlap, move labels
				  console.log('overlap were movin bois');
				  console.log('this', this);
				  console.log('that', that);
				  console.log(select(this).attr("transform"));
				  let z2 = select(this).attr("transform")
				  console.log(that);
				  console.log(select(that).attr("transform"));
				  let x2 = select(that).attr("transform")
				  console.log(x2);
				  console.log(z2);

				
                  var dx = (Math.max(0, a.right - b.left) +
                           Math.min(0, a.left - b.right)) * 0.01,
                      dy = (Math.max(0, a.bottom - b.top) +
                           Math.min(0, a.top - b.bottom)) * 0.02,
                      tt = getTransformation(select(this).attr("transform")),
                      to = getTransformation(select(that).attr("transform"));
                  move += Math.abs(dx) + Math.abs(dy);


                  console.log(this, 'this | that ', that)
                  console.log('to', to)
                  console.log('tt', tt)
                
                  to.translated = [ (to.translateX + dx), (to.translateX + dy) ];
                  tt.translated = [ (tt.translateY - dx), (tt.translateY - dy) ];

                  console.log('to', to)
                  console.log('tt', tt)

         //         console.log(totest, '|', tttest)
                  select(this).attr("transform", "translate(" + (tt.translated[0] + dx) + ' ' + (tt.translated[1] + dy) + ")");
                  select(that).attr("transform", "translate(" + (to.translated[0] - dx) + ' ' + (to.translated[1] - dy) + ")");
                  a = this.getBoundingClientRect();

                  console.log(this, 'this | that ', that)
					//		} // lil else
                }
              }
            });
			// } // end if

       });
  }
  console.log(select(".scatter-chart").selectAll(".place-label"))

let newLabels = select(".scatter-chart").selectAll(".place-label");
}

  

function getTranslation(transform) {
  // Create a dummy g for calculation purposes only. This will never
  // be appended to the DOM and will be discarded once this function 
  // returns.
  var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  
  // Set the transform attribute to the provided string value.
  g.setAttributeNS(null, "transform", transform);
  
  // consolidate the SVGTransformList containing all transformations
  // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
  // its SVGMatrix. 
  var matrix = g.transform.baseVal.consolidate().matrix;
  
  // As per definition values e and f are the ones for the translation.
  return [matrix.e, matrix.f];
}

	  function getTransformation(transform) {
  // Create a dummy g for calculation purposes only. This will never
  // be appended to the DOM and will be discarded once this function 
  // returns.
  var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  
  // Set the transform attribute to the provided string value.
  g.setAttributeNS(null, "transform", transform);
  
  // consolidate the SVGTransformList containing all transformations
  // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
  // its SVGMatrix. 
  var matrix = g.transform.baseVal.consolidate().matrix;
  
  // Below calculations are taken and adapted from the private function
  // transform/decompose.js of D3's module d3-interpolate.
  var {a, b, c, d, e, f} = matrix;   // ES6, if this doesn't work, use below assignment
  // var a=matrix.a, b=matrix.b, c=matrix.c, d=matrix.d, e=matrix.e, f=matrix.f; // ES5
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * 180 / Math.PI,
    skewX: Math.atan(skewX) * 180 / Math.PI,
    scaleX: scaleX,
    scaleY: scaleY
  };
}
	
</script>
<div class="wrapper">
	
	<Chart 
		data={selectedData}
		xRange={[min(newTestData[selectedOption].map(d => d.x)), max(newTestData[selectedOption].map(d => d.x))]}
		yRange={[min(newTestData[selectedOption].map(d => d.y)), max(newTestData[selectedOption].map(d => d.y))]}
	/>
	<ChartSelector
		options={Object.keys(data)}
		bind:selected={selectedOption}
	/>
</div>
<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		height: 650px;
		padding: 40px;
	}
</style>
