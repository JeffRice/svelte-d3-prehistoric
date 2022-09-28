import { csv } from 'd3';
import { fossilData2 } from '../inputs/dataPaths';


const loadFossilSpots2 = async () => {
  const data = await csv(fossilData2, (d, i) => {
    return {
      id: i,
      name: d.name,
      x: d.x,
      y: d.y
    };
  });

  return(data);
};

export default loadFossilSpots2;
