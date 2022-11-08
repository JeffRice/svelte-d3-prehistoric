import { csv } from 'd3';
import { fossilData } from '../inputs/dataPaths';


const loadFossilSpots = async () => {
  const data = await csv(fossilData, (d, i) => {
    return {
      id: i,
      name: d.accepted_name,
      x: d.lat,
      y: d.lng,
      maxAge: d.max_ma,
      minAge: d.min_ma
    };
  });

  return(data);
};

export default loadFossilSpots;
