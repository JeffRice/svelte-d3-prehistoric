import { timeFormat, format } from 'd3';

const commaFormat = format(',');

export const columns = [
  {
    property: 'name',
    name: 'Name',
    sortable: true,
    classes: 'left',
    minWidth: '100px'
  },
  {
    property: 'disinformantNation',
    name: 'Continent',
    sortable: true,
    classes: 'left',
    minWidth: '100px'
  },
  {
    property: 'habitat',
    name: 'Habitat',
    sortable: true,
    classes: 'left',
    minWidth: '100px'
  },
  {
    property: 'type',
    name: 'Type',
    sortable: true,
    classes: 'left',
    minWidth: '100px'
  },
//  {
 //   property: 'disinformantNation',
  //  name: 'Disinformant Nation',
   // sortable: true,
    //classes: 'left',
    //minWidth: '100px',
    //format: (d) => d.join(', ')
  //},
  {
    property: 'periodEra',
    name: 'Geological Period',
    sortable: true,
    classes: 'left',
    minWidth: '100px'
  },/*
  {
    property: 'shortTitle',
    name: 'Title',
    sortable: true,
    classes: 'left',
    minWidth: '100px'
  },*/
  {
    property: 'size',
    name: 'Size (feet)',
    sortable: true,
    classes: 'left',
    minWidth: '50px'
  },
  {
    property: 'weight',
    name: 'Weight (pounds)',
    sortable: true,
    classes: 'left',
    minWidth: '50px'
  },{
    property: 'startDate',
    name: 'Min Date',
    sortable: true,
    classes: 'left',
    minWidth: '50px'
  },
  {
    property: 'endDate',
    name: 'Max Date',
    sortable: true,
    classes: 'left',
    minWidth: '50px'
  },
  {
    property: 'tooltipContent',
    name: 'Description',
    sortable: true,
    classes: 'left',
    minWidth: '600px',
    format: (d) => d.substring(0, d.indexOf('<p>'))
  },
  {
    property: 'wikiURL',
    name: 'Wiki Link',
    sortable: true,
    classes: 'left',
    hyperlink: true,
    minWidth: '100px'
  }
];
