import { countries } from '../stores/map';

const loadMapData = async () => {
  const response = await fetch(
    "mapgeo.json"
  );
  const json = await response.json();
  console.log('json: ', json)

  countries.set(json
      .features
   // .filter((d) => d.properties.OBJECTID !== 1)
    );  
};

export default loadMapData;
