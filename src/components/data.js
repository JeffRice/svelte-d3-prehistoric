import { csv } from 'd3';

import { data } from '../inputs/dataPaths';
import loadData from '../utils/loadData';


let dataTest;



const loadFossilSpots = async () => {

    dataTest = (await loadData())
            .map((d) => ({
              ...d,
            }));

//	console.log('dataTest: ', dataTest)
  

	let aArray = [];
	const dinoChartData = await csv(data, (d, i) => {
		let newItem = {x: parseFloat(d.size),
			y: parseFloat(d.weight),
		  }
		  aArray.push(newItem);
			return {
				x: parseFloat(d.size),
				y: parseFloat(d.weight),
			  };
	});

//	console.log('aArray: ', aArray)
//	console.log('dinochartdata: ', dinoChartData)
  
	let newData = []
	newData.push(aArray[0]);  
	return(newData);
};


export default {
	a: loadFossilSpots(),
	b: [
		{ x: 10, y: 9.14 },
		{ x: 28, y: 8.14 },
		{ x: 13, y: 8.74 },
		{ x: 39, y: 8.77 },
		{ x: 41, y: 9.26 },
		{ x: 54, y: 8.1 },
		{ x: 66, y: 6.13 },
		{ x: 72, y: 3.1 },
		{ x: 82, y: 9.13 },
		{ x: 97, y: 7.26 },
		{ x: 101, y: 4.74 }
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
};