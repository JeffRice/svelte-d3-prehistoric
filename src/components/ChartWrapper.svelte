<script>
	import data from './data';
	import { csv, min, max, forceSimulation, forceX, forceY, forceManyBody, forceCenter, forceCollide, } from 'd3';
	import { select, selectAll } from 'd3-selection';
	import { data as csvData } from '../inputs/dataPaths';
	import Chart from './Chart.svelte';
	import ChartSelector from './ChartSelector.svelte';
	import loadData from '../utils/loadData';
	import { onMount } from "svelte";
	import { originalTimeDomain } from '../stores/filters';
	import { beforeUpdate, afterUpdate } from 'svelte';


	let fossilSpots10, fossilSpots25, fossilSpots40, fossilSpots200, allfossilSpots;;
	let selectedData, selectedOption;
	let chartData = {};


	onMount(async () => {

		const dinoChartData = await csv(csvData, (d, i) => {
			return {
				x: parseFloat(d.size),
				y: parseFloat(d.weight),
				name: d.name,
				hoverName: d.name
			  };


	});

		allfossilSpots = dinoChartData.map(({name, ...d}) => d)
		fossilSpots10 = dinoChartData.filter(d => d.x < 11);
		fossilSpots25 = dinoChartData.filter(d => d.x < 26  && d.x > 10);
		fossilSpots40 = dinoChartData.filter(d => d.x < 40  && d.x > 25);
		fossilSpots200 = dinoChartData.filter(d => d.x > 39);


		if(dinoChartData){
		selectedOption = 'a';
			}
});



	$: chartData.a = allfossilSpots;
	$: chartData.b = fossilSpots10;
	$: chartData.c = fossilSpots25;
	$: chartData.d = fossilSpots40;
	$: chartData.e = fossilSpots200;

	$: if (chartData.a) {
		selectedData = chartData[selectedOption].sort((a, b) => a.x < b.x ? 1 : -1);
	}
	   

    afterUpdate(() => {
		arrangeLabels()
});




function arrangeLabels() {
  var svg = select(".scatter-chart")
  var move = 1;
  while(move > 0) {
    move = 0;
    svg.selectAll(".place-label")
       .each(function() {
         var that = this,
             a = this.getBoundingClientRect();
         svg.selectAll(".place-label")
            .each(function() {
			  if(this != that) {
                var b = this.getBoundingClientRect();
                if((Math.abs(a.left - b.left) * 2 < (a.width + b.width)) &&
                   (Math.abs(a.top - b.top) * 2 < (a.height + b.height))) {
                  // overlap, move labels
                  // console.log('overLap ')
                  var dx = (Math.max(0, a.right - b.left) +
                           Math.min(0, a.left - b.right)) * 0.01,
                      dy = (Math.max(1, a.bottom - b.top) +
                           Math.min(1, a.top - b.bottom)) * 0.02,
                      tt = getTranslation(select(this).attr("transform")),
                      to = getTranslation(select(that).attr("transform"));
                  move += Math.abs(dx) + Math.abs(dy);               
                  to.translated = [ (to[0] + dx), (to[1] + dy) ];
                  tt.translated = [ (tt[0] - dx), (tt[1] - dy) ];


                  select(this).attr("transform", "translate(" + tt.translated + ")");
                  select(that).attr("transform", "translate(" + to.translated + ")");
                  a = this.getBoundingClientRect();

                }
              }
  



            });                     
       });
  }
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

	
</script>
{#if (selectedData)}
<div class="wrapper">
	<Chart 
		data={selectedData}
		xRange={[min(chartData[selectedOption].map(d => d.x)), max(chartData[selectedOption].map(d => d.x))]}
		yRange={[min(chartData[selectedOption].map(d => d.y)), max(chartData[selectedOption].map(d => d.y))]}
	/>
	<ChartSelector
		options={Object.keys(data)}
		bind:selected={selectedOption}
	/>
</div>
{/if}
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
