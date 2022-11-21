<script>
  // controls pane holding filters and buttons
  import {
    disinformantNationFilter,
    timeperiodFilter,
    dietFilter,
    textSearchFilter,
    selectAllFilters,
    contextData,
    originalTimeDomain,
    highlightPolarization,
    highlightCib,
    controlsFilter } from '../stores/filters';
  import { timeScale } from '../stores/scales';
  import { fossilDatapoints, switchValueStore } from '../stores/elements';

  import Dropdown from './Dropdown.svelte';
  import Fossildropdown from './Fossildropdown.svelte';
  import SearchText from './SearchText.svelte';
  import CheckboxPanel from './CheckboxPanel.svelte';
  import Switch from './Switch.svelte';
    import CheckboxSources from './CheckboxSources.svelte';


  export let timePoints;

  function addCount(filter, property, timePoints) {
    return filter.map((d) => ({
      ...d,
      count: timePoints.map((d) => d[property]).flat().filter((a) => a === d.id).length,
      liveCount: timePoints.filter((d) => d.show).map((d) => d[property]).flat().filter((a) => a === d.id).length
    }));
  }

  let fossilFilter = ['cretaceous', 'jurassic', 'triassic'];

  function fossilCount(filter, dataPoints) {
    return filter.map((d, i) => ({
      id: i,
      title: filter[i],
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




</script>

{#if (timePoints)}
  <div class="controls-inner-wrapper">
    <div class="controls"class:hidden={$controlsFilter}>
      <SearchText searchString={$textSearchFilter}
                  label="Search"
                  on:change={(e) => $textSearchFilter = e.detail}
                  on:reset={() => textSearchFilter.reset()} />
                  
      <Dropdown items={addCount($disinformantNationFilter, 'disinformantNation', timePoints)}
                label="Continent"
                superior
                on:itemsAdded={(e) => disinformantNationFilter.select(e.detail)}
                on:itemsRemoved={(e) => disinformantNationFilter.unselect(e.detail)} />


      <Dropdown items={addCount($dietFilter, 'diet', timePoints)}
                label="Diet"
                on:itemsAdded={(e) => dietFilter.select(e.detail)}
                on:itemsRemoved={(e) => dietFilter.unselect(e.detail)} />

      <Dropdown items={addCount($timeperiodFilter, 'periodEra', timePoints)}
                label="Time Periods"
                superior
                on:itemsAdded={(e) => timeperiodFilter.select(e.detail)}
                on:itemsRemoved={(e) => timeperiodFilter.unselect(e.detail)} />

       <button class="reset-filters"
        on:click={() => handleButtonClick()}>
          Reset
        </button>


    

        {#if ($fossilDatapoints)}
        <Fossildropdown items={fossilCount(fossilFilter, $fossilDatapoints)}
                  label="Plot Fossil Datapoints"
                  />
        {/if}
  



      
  
    </div>
    <div class="show-hide">
      <CheckboxPanel />
    </div>

    <div class="show-hide">
      <CheckboxSources />
    </div>

      <div class="dropdown pangea-switch">
        <Switch bind:value={$switchValueStore} label="Toggle Pangea" design="inner" />
      </div>




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
    color: var(--prehistoricDarkGreen);
    background-color: var(--bg);
    border: 2px solid var(--prehistoricGreen);
    border-radius: 3px;
    outline: none;
    overflow: hidden;
    transition: all 200ms ease;
  }

  button.reset-filters:hover {
    color: var(--bg);
    background-color: var(--prehistoricGreen);
    cursor: pointer;
  }

  .checkbox-panel {
    display: flex;
    align-items: center;
  }

  .show-hide{
    float: left;
  }

  .pangea-switch {
    float: left;
    font-family: var(--font-02);
    position: relative;
    pointer-events: all;
    font-size: .8rem;
    color: var(--prehistoricDarkGreen);
    margin-left: 8px;
    margin-top: 3px;
  }

  .hidden {
    display: none;
  }

</style>
