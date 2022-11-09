<script>
	import data from './data';
	import { csv } from 'd3';
	import { data as dataz } from '../inputs/dataPaths';
	import Chart from './Chart.svelte';
	import ChartSelector from './ChartSelector.svelte';
	import loadData from '../utils/loadData';
	import { onMount } from "svelte";

	let selectedOption = 'b';
	let fossilSpots;
	

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
	]
}


	onMount(async () => {

		let aArray = [];
		const dinoChartData = await csv(dataz, (d, i) => {
		let newItem = {x: parseFloat(d.size),
			y: parseFloat(d.weight),
		  }
		  aArray.push(newItem);
			return {
				x: parseFloat(d.size),
				y: parseFloat(d.weight),
			  };




	});

	fossilSpots = await dinoChartData;
	if(dinoChartData){
		 selectedOption = 'a';
}

		});


		let aArray = [];
		const loadFossilSpots = async () => {
  const dataF = await csv(dataz, (d, i) => {
		let newItem = {x: parseFloat(d.size),
			y: parseFloat(d.weight),
		  }
		  aArray.push(newItem);
			return {
				x: parseFloat(d.size),
				y: parseFloat(d.weight),
			  };




	});



  return(dataF);
 //return(newTestData);
};


	$: newTestData.a = fossilSpots;
	
	$: selectedData = newTestData[selectedOption].sort((a, b) => a.x < b.x ? 1 : -1);

	console.log(data.a)


	console.log(loadFossilSpots())

	

</script>
<div class="wrapper">
	
	<Chart 
		data={selectedData}
		xRange={[0, 160]}
		yRange={[0, 200000]}
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
	}
</style>
