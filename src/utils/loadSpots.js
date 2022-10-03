import { csv, timeParse } from 'd3';
import { spotData } from '../inputs/dataPaths';

const parseDate = timeParse('%m/%d/%Y');

const loadSpots = async () => {
  const data = await csv(spotData, (d, i) => {
    return {
      id: i,
      name: d.event_name,
      date: parseDate(d.date),
      endDate: parseDate(d.endDate),
      description: d.description
    };
  });

  return(data);
};

export default loadSpots;
