import { csv } from 'd3';
import { fossilData3 } from '../inputs/dataPaths';


const loadFossilSpots3 = async () => {
  const data = await csv(fossilData3, (d, i) => {
    return {
      id: i,
      name: d.accepted_name,
      x: d.lat,
      y: d.lng
    };
  });

  return(data);
};

export default loadFossilSpots3;
