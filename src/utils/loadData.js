import { csv } from 'd3';
import { splitString } from './misc';
import { data as dataPath } from '../inputs/dataPaths';

const loadData = async () => {
  const dinoNames = [];

  const data = await csv(dataPath, (d, i) => {

    const sizeTotal = d.size === '' ? Number.NaN : +d.size;
    const sizePending = isNaN(sizeTotal);
    dinoNames.push(d.name);

    return {
      id: i,
      name: d.name,
      diet: d.diet,
      habitat: d.habitat,
      type: d.type,
      image_location: d.image_location,
      periodEra: d.time_period,
      tooltipContent: d.tooltip_content,
      testDate: parseInt(d.test_date),
      wikiURL: d.wikiURL,
      extraImage: d.extra_image,
      weight: parseInt(d.weight), 
      size: parseInt(d.size),
      disinformantNation: splitString(d.regions),
      startDate: d.start_date,
      endDate: d.end_date,
      sizeTotal,
      dinoNames: dinoNames
    };
  });
 // console.log('csv data: ', data)
  return(data.filter((d) => d.timestamp !== null));

};

export default loadData;
