import { csv } from 'd3';
import { jurassicFossilData } from '../inputs/dataPaths';


const loadJurassicFossils = async () => {
  const data = await csv(jurassicFossilData, (d, i) => {
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

export default loadJurassicFossils;
