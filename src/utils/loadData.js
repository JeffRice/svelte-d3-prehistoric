import { csv, timeParse, min } from 'd3';
import { splitString, cleanCountries } from './misc';
import { data as dataPath } from '../inputs/dataPaths';

const parseTimestamp = timeParse('%m/%d/%Y %H:%M %Z');
const parseDate = timeParse('%m/%d/%Y');

const loadData = async () => {
  const data = await csv(dataPath, (d, i) => {


    const source = d.source_for_display !== '' ? d.source_for_display : d.source;

    const sizeTotal = d.size === '' ? Number.NaN : +d.size;
    const sizePending = isNaN(sizeTotal);

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
 //     size: d.size,
      weight: d.weight, 
      size: d.size,
     // timestamp: parseTimestamp([d.timestamp, '-0400'].join(' ')),
      timestamp: parseTimestamp([d.timestamp, '-0400'].join(' ')),
   //   source: splitString(source),
   //   sourceFilter: splitString(d.source_subcategory !== '' ? d.source_subcategory : source),
   //   sourceSubcategory: splitString(d.source_subcategory),
   //   sourceCategory: splitString(d.source_category),
   //   sourceNation: d.source_nation,
   //   disinformant: d.disinformant,
      disinformantNation: splitString(d.regions),
   //   disinformantAttribution: d.disinformant_attribution,
      shortTitle: d.short_title,
      shortDescription: d.short_description,
  //    attributionUrl: d.attribution_url,
  //    attributionArchiveUrl: d.archived_attribution_url,
  //    platforms: splitString([d.social_media, d.messaging_platforms].join(',')),
      startDate: parseDate(d.start_date),
      endDate: parseDate(d.end_date),
      attributionDate: parseDate(d.attribution_date),
 //     methods: splitString(d.methods),
      sizeTotal,
      attributionScore: +d.attribution_total_score,
   //   tags: splitString(d.tags),
      articleCount: +d.articleCount,
    };
  });
  console.log('csv data: ', data)
  return(data.filter((d) => d.timestamp !== null));

};

export default loadData;
