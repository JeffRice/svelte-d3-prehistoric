import { csv } from 'd3';
import { cretaceousFossilData } from '../inputs/dataPaths';
import { uniq } from 'lodash';

const loadCretaceousFossils = async () => {
    
  const data = await csv(cretaceousFossilData, (d, i) => {
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

export default loadCretaceousFossils;
