import { csv } from 'd3';
import { triassicFossilData } from '../inputs/dataPaths';


const loadTriassicFossils = async () => {
  const data = await csv(triassicFossilData, (d, i) => {
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

export default loadTriassicFossils;
