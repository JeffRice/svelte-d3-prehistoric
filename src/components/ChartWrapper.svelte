<script>
	import data from './data';
	import { csv, min, max } from 'd3';
	import { data as dataz } from '../inputs/dataPaths';
	import Chart from './Chart.svelte';
	import ChartSelector from './ChartSelector.svelte';
	import loadData from '../utils/loadData';
	import { onMount } from "svelte";

	let selectedOption = 'f';
	let fossilSpots, fossilSpots10, fossilSpots20, fossilSpots200, fossilSpots2000;
	let fossilSpots40;

	

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
		fossilSpots20 = dinoChartData.filter(d => d.x < 21  && d.x > 10);
		fossilSpots40 = dinoChartData.filter(d => d.x < 40  && d.x > 20);
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
