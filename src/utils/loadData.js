import { csv, timeParse, min } from 'd3';
import { splitString, cleanCountries } from './misc';
import { data as dataPath } from '../inputs/dataPaths';

const parseTimestamp = timeParse('%m/%d/%Y %H:%M %Z');
const parseDate = timeParse('%m/%d/%Y');

const loadData = async () => {
  const dinoNames = [];

  const data = await csv(dataPath, (d, i) => {

    const source = d.source_for_display !== '' ? d.source_for_display : d.source;
    const sizeTotal = d.size === '' ? Number.NaN : +d.size;
    const sizePending = isNaN(sizeTotal);
    dinoNames.push(d.name);

    return {
      id: i,
      name: d.name,
      diet: d.diet,
      image_location: d.image_location,
      periodEra: d.case_hash,
      sizeIndex: d.size_index,
      tooltipContent: d.tooltip_content,
      testDate: parseInt(d.test_date),
      wikiURL: d.wikiURL,
      extraImage: d.extra_image,
      weight: d.weight, 
      size: d.size,
      timestamp: parseTimestamp([d.timestamp, '-0400'].join(' ')),
      disinformantNation: splitString(d.regions),
      shortTitle: d.short_title,
      shortDescription: d.short_description,
      startDate: d.start_date,
      endDate: d.end_date,
      attributionDate: parseDate(d.attribution_date),
      sizeTotal,
      attributionScore: +d.attribution_total_score,
      articleCount: +d.articleCount,
      dinoNames: dinoNames
    };
  });
 // console.log('csv data: ', data)
  return(data.filter((d) => d.timestamp !== null));

};

export default loadData;
