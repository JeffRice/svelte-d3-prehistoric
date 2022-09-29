import { csv } from 'd3';
import { fossilData2 } from '../inputs/dataPaths';


const loadFossilSpots2 = async () => {
  const data = await csv(fossilData2, (d, i) => {
    return {
      id: i,
      name: d.accepted_name,
      x: d.lat,
      y: d.lng
    };
  });

  return(data);
};

export default loadFossilSpots2;
