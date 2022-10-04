<script>
  // controls pane holding filters and buttons
  import {
    disinformantNationFilter,
    platformFilter,
    methodFilter,
    timeperiodFilter,
    sourceFilter,
    sourceCategoryFilter,
    dietFilter,
    attributionScoreFilter,
    attributionScoreDef,
    textSearchFilter,
    selectAllFilters,
    contextData,
    originalTimeDomain,
    highlightPolarization,
    highlightCib } from '../stores/filters';
  import { timeScale, attributionScoreScale } from '../stores/scales';
  import {select} from "d3";
  import { fossilDatapoints } from '../stores/elements';

  import Dropdown from './Dropdown.svelte';
  import Fossildropdown from './Fossildropdown.svelte';
  import Slider from './Slider.svelte';
  import SearchText from './SearchText.svelte';
  import CheckboxPanel from './CheckboxPanel.svelte';
  import Share from './Share.svelte';


  export let timePoints;

  function addCount(filter, property, timePoints) {
    return filter.map((d) => ({
      ...d,
      count: timePoints.map((d) => d[property]).flat().filter((a) => a === d.id).length,
      liveCount: timePoints.filter((d) => d.show).map((d) => d[property]).flat().filter((a) => a === d.id).length
    }));
  }

  let fossilFilter = ['cretaceous', 'jurassic', 'triassic'];

  function fossilCount(filter, property, dataPoints) {
    console.log(dataPoints);
    console.log(filter);
    return filter.map((d, i) => ({
      ...d,
      id: i,
      title: filter[i],
      added: 'true',
      addValue: 'Remove',
      count: filter.length,
      liveCount: dataPoints[d].length
    }));
  }

  function handleButtonClick() {
    selectAllFilters();
    contextData.unselectAll();
    $highlightPolarization = false;
    $highlightCib = false;
    if ($originalTimeDomain) {
      $timeScale.domain($originalTimeDomain);
      $timeScale = $timeScale;
      $originalTimeDomain = null;
    }
  }



  let addjurassicValue = 'Remove';
  let jurassicadded = true;

  let addtriassicValue = 'Remove';
  let triassicadded = true;



  let addValue = 'Remove';
  let added = true;

function handleFossilClick(event, fossilEra) {

const target = event.target
console.log('target: ', target)

fossilEra = target.getAttribute('fossil-era')
const state = target.getAttribute('era-added')


if(fossilEra === 'jurassic'){
      jurassicadded = state === 'true' ? false : true

      addjurassicValue = jurassicadded === true ? 'Remove' : 'Add'
    }
    else if(fossilEra === 'triassic'){
      triassicadded = state === 'true' ? false : true

      addtriassicValue = triassicadded === true ? 'Remove' : 'Add'
    }
    else {
      added = state === 'true' ? false : true

      addValue = added === true ? 'Remove' : 'Add'
    }



if (state  === 'false' ){
  addFossils(fossilEra);
}
else {
  removeFossils(fossilEra);

}

console.log('state: ', state)

}

function removeFossils(fossilEra) {

// fossilEra = 'cretaceous';

$fossilDatapoints[fossilEra] = [];
reDraw();
return $fossilDatapoints;

}

function addFossils(fossilEra) {

let originalEra = 'original' + fossilEra

$fossilDatapoints[fossilEra] = $fossilDatapoints[originalEra];
reDraw();
return $fossilDatapoints;

}



  function reDraw() {

    let locations = select('#points');
var elements = locations.selectAll("points.arc");

// console.log('elements: ', elements)

  elements.each(function(d, i) {
   // console.log('element: ', elements[i])
  var node = select(this);
 // console.log(d, node, i, this)

  this.remove();

  })


// console.log("redrawing")

}

</script>

{#if (timePoints)}
  <div class="controls-inner-wrapper">
    <div class="controls">
      <SearchText searchString={$textSearchFilter}
                  label="Search"
                  on:change={(e) => $textSearchFilter = e.detail}
                  on:reset={() => textSearchFilter.reset()} />
      <Slider value={$attributionScoreFilter}
              label="Attribution Score"
              min={attributionScoreDef[0]} 
              max={attributionScoreDef[1]}
              showHandleLabels={false}
              startColor={$attributionScoreScale(attributionScoreDef[0])}
              stopColor={$attributionScoreScale(attributionScoreDef[1])}
              on:changed={(e) => $attributionScoreFilter = e.detail} />
      <Dropdown items={addCount($disinformantNationFilter, 'disinformantNation', timePoints)}
                label="Continent"
                superior
                on:itemsAdded={(e) => disinformantNationFilter.select(e.detail)}
                on:itemsRemoved={(e) => disinformantNationFilter.unselect(e.detail)} />
      <!--
      <Dropdown items={addCount($platformFilter, 'platforms', timePoints)}
                label="Platform"
                on:itemsAdded={(e) => platformFilter.select(e.detail)}
                on:itemsRemoved={(e) => platformFilter.unselect(e.detail)} />
      <Dropdown items={addCount($sourceFilter, 'sourceFilter', timePoints)}
                label="Source"
                hideOneHitWonders
                superior
                on:itemsAdded={(e) => sourceFilter.select(e.detail)}
                on:itemsRemoved={(e) => sourceFilter.unselect(e.detail)} />
      <Dropdown items={addCount($sourceCategoryFilter, 'sourceCategory', timePoints)}
                label="Source Category"
                on:itemsAdded={(e) => sourceCategoryFilter.select(e.detail)}
                on:itemsRemoved={(e) => sourceCategoryFilter.unselect(e.detail)} />
     <Dropdown items={addCount($methodFilter, 'methods', timePoints)}
                label="Method"
                superior
                on:itemsAdded={(e) => methodFilter.select(e.detail)}
                on:itemsRemoved={(e) => methodFilter.unselect(e.detail)} />
      <Dropdown items={$contextData}
                label="Context Dataset"
                nameField="name"
                on:itemsAdded={(e) => contextData.select(e.detail)}
                on:itemsRemoved={(e) => contextData.unselect(e.detail)} />
-->

      <Dropdown items={addCount($dietFilter, 'diet', timePoints)}
                label="Diet"
                on:itemsAdded={(e) => dietFilter.select(e.detail)}
                on:itemsRemoved={(e) => dietFilter.unselect(e.detail)} />

      <Dropdown items={addCount($timeperiodFilter, 'periodEra', timePoints)}
                label="Time Periods"
                superior
                on:itemsAdded={(e) => timeperiodFilter.select(e.detail)}
                on:itemsRemoved={(e) => timeperiodFilter.unselect(e.detail)} />



      {#if ($fossilDatapoints)}
      <Fossildropdown items={fossilCount(fossilFilter, 'test', $fossilDatapoints)}
                label="Fossil Datapoints"
                superior/>
      {/if}

       <button class="reset-filters"
        on:click={() => handleButtonClick()}>
          Reset
        </button>
  
     
  


      <button on:click={handleFossilClick}
      era-added={added}
      fossil-era='cretaceous'>
        {addValue} Cretaceous Fossil Data
      </button>
      <button on:click={handleFossilClick}
      era-added={jurassicadded}
      fossil-era='jurassic'>
        {addjurassicValue} Jurassic Fossil Data
      </button>
      <button on:click={handleFossilClick}
      era-added={triassicadded}
      fossil-era='triassic'>
        {addtriassicValue} Triassic Fossil Data
      </button>
  

    </div>
    <div class="checkbox-panel">
      <CheckboxPanel />
      <Share />
    </div>
    <!-- <Share /> -->
  </div>
{/if}

<style>
  .controls-inner-wrapper {
    padding: 0 0.2rem;
    border: none;
    border-radius: 3px;
    background-color: var(--transparentbg);
  }

  .controls {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(9, 1fr);
    grid-gap: 0.3rem;
    margin-bottom: 0.7rem;
  }

  @media (min-width: 460px) {
    .controls {
      grid-template-rows: repeat(4, 1fr);
    }
  }

  @media (min-width: 1000px) {
    .controls {
      grid-template-rows: repeat(2, 1fr);
    }
  }

  @media (min-width: 1850px) {
    .controls {
      grid-template-rows: repeat(1, 1fr);
    }
  }

  button {
    pointer-events: all;
  }

  button.reset-filters {
    align-self: flex-end;
    min-width: 100px;
    height: 1.7rem;
    max-height: 1.7rem;
    margin: 0.3rem 0.3rem 0 0.3rem;
    padding: 0.1rem 0.3rem;
    font-family: var(--font-02);
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.3rem;
    color: var(--usa-blue);
    background-color: var(--bg);
    border: 2px solid var(--usa-blue);
    border-radius: 3px;
    outline: none;
    overflow: hidden;
    transition: all 200ms ease;
  }

  button.reset-filters:hover {
    color: var(--bg);
    background-color: var(--usa-blue);
    cursor: pointer;
  }

  .checkbox-panel {
    display: flex;
    align-items: center;
  }
</style>
