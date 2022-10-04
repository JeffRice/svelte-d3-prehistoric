import { csv, timeParse } from 'd3';
import { splitString, cleanCountries } from './misc';
import { data as dataPath } from '../inputs/dataPaths';

const parseTimestamp = timeParse('%m/%d/%Y %H:%M %Z');
const parseDate = timeParse('%m/%d/%Y');

const loadData = async () => {
  const data = await csv(dataPath, (d, i) => {

    const smiTotal = d.total_engagement === '' ? Number.NaN : +d.total_engagement;
    const smiPending = isNaN(smiTotal);
    const source = d.source_for_display !== '' ? d.source_for_display : d.source;

    return {
      id: i,
      diet: d.diet,
      image_location: d.image_location,
      periodEra: d.case_hash,
      sizeIndex: d.size_index,
     // timestamp: parseTimestamp([d.timestamp, '-0400'].join(' ')),
     timestamp: parseTimestamp([d.timestamp, '-0400'].join(' ')),
      source: splitString(source),
      sourceFilter: splitString(d.source_subcategory !== '' ? d.source_subcategory : source),
      sourceSubcategory: splitString(d.source_subcategory),
      sourceCategory: splitString(d.source_category),
      sourceNation: d.source_nation,
      disinformant: d.disinformant,
      disinformantNation: splitString(d.disinformant_nation),
      disinformantAttribution: d.disinformant_attribution,
      shortTitle: d.short_title,
      shortDescription: d.short_description,
      attributionUrl: d.attribution_url,
      attributionArchiveUrl: d.archived_attribution_url,
      platforms: splitString([d.social_media, d.messaging_platforms].join(',')),
      startDate: parseDate(d.start_date),
      endDate: parseDate(d.end_date),
      attributionDate: parseDate(d.attribution_date),
      methods: splitString(d.methods),
      smiTotal,
      attributionScore: +d.attribution_total_score,
      tags: splitString(d.tags),
      articleCount: +d.articleCount,
    };
  });
  console.log('csv data: ', data)
  return(data.filter((d) => d.timestamp !== null));

};

export default loadData;
