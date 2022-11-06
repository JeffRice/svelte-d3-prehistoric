import { pangeaRegions } from '../stores/map';

const loadPangeaData = async () => {
  const response = await fetch(
    "pangeanamed.json"
  );
  const json = await response.json();
  console.log('json: ', json)

  pangeaRegions.set(json
      .features
   // .filter((d) => d.properties.OBJECTID !== 1)
    );  
};

export default loadPangeaData;