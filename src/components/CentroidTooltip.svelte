<script>
  // tooltip for the country centroids
  import { fade } from 'svelte/transition';
  import { width } from '../stores/dimensions';
  import { tooltip } from '../stores/centroidSelections';
  import { timeScale } from '../stores/scales';
  import { sortConsistently } from '../utils/misc';
  import { originalTimeDomain } from '../stores/filters';
  import {
    disinformantNationFilter,
    dietFilter,
    timeperiodFilter,
    selectAllFilters
  } from '../stores/filters';
  import { timeFormat, group, timeParse } from 'd3';
  import { uniq } from 'lodash';


  import CaseDensity from './CaseDensity.svelte';

  const offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };
  const contentOffset = 100;

  let tWidth = 0;
  let tHeight = 0;
  let side;
  let left, top, contentTop;

  let timeperiods, diets;

  $: if ($tooltip) {
    side = $width - $tooltip.c[0].xCountry < $width / 2 ? 'left' : 'right';
    
    top = $tooltip.c[0].yCountry - offset.top;

    contentTop = contentOffset - $tooltip.e.pageY + window.pageYOffset;
    if (Math.abs(contentTop) > tHeight - offset.bottom) {
      contentTop = -tHeight - offset.bottom;
    }
    
    if (side === 'left') {
      left = $tooltip.c[0].xCountry - tWidth - 2 * offset.left;
    } else if (side === 'right') {   
      left = $tooltip.c[0].xCountry - offset.left;
    }
  }

  function handleLiClick(type, item) {
    selectAllFilters();
    disinformantNationFilter.selectOne($tooltip.c[0].disNation);
    switch (type) {
      case 'periodEra': timeperiodFilter.selectOne(item); break;
      case 'diet': dietFilter.selectOne(item); break;
    }
  }

  function generateItemsArray(data, name) {
    return [...group(data.map((d) => d[name]).flat(), (d) => d)]
              .map((d, i) => ({id: i, name: d[0], count: d[1].length}))
              .sort((a, b) => sortConsistently(a, b, 'count', 'id'));
  }

  $: if ($tooltip) {
    timeperiods = generateItemsArray($tooltip.c, 'periodEra');
    diets = generateItemsArray($tooltip.c, 'diet');
  }



</script>

{#if ($tooltip)}
  <div class="tooltip"
       style="left: {left}px; top: {top}px;"
       bind:clientWidth={tWidth}
       on:click|stopPropagation
       on:mouseover|stopPropagation
       transition:fade={{duration: 200}}>
    <div class="content"
         bind:clientHeight={tHeight}
         style="top: {contentTop}px;">
      <div class="scroll-wrapper">
        <div class="title">
          <h2>{uniq($tooltip.c.map((d) => d.disNation)).join(' | ')}</h2>
          <p class="small no-break">{$tooltip.c.length} Species</p>
        </div>
        {#if ($tooltip.c.length > 1 && !$originalTimeDomain)}
          <div class="case-density-vs-time">
            <h3>Species over time</h3>
            <CaseDensity width={Math.max(0, tWidth - offset.left - offset.right - 2 * 16)} 
                         height={50}
                         dates={$tooltip.c.map((d) => d.testDate)}
                         minDate={0}
                         maxDate={350} />
            <h6>(Not all prehistoric species, only those represented in the visualization)</h6>
          </div>
        {/if}
        <div class="timeperiods">
          <h3>Time periods</h3>
          <ul>
            {#each timeperiods as timeperiod (timeperiod.id)}
              <li on:click|stopPropagation={() => handleLiClick('periodEra', timeperiod.name)}>
                {timeperiod.name}
                <span class="very-small">({timeperiod.count})</span>
              </li>
            {/each}
          </ul>
        </div>
        <div class="diets">
          <h3>Diets</h3>
          <ul>
            {#each diets as diet (diet.id)}
              <li on:click|stopPropagation={() => handleLiClick('diet', diet.name)}>
                {diet.name}
                <span class="very-small">({diet.count})</span>
              </li>
            {/each}
          </ul>
        </div>

      </div>
    </div>
  </div>
{/if}

<style>
  .tooltip {
    width: 21%;
    min-width: 100px;
    font-family: var(--font-02);
    position: absolute;
    z-index: 10000;
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 60vh;
    margin: 16px;
    color: var(--text-black);
    background-color: var(--bg);
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
    position: absolute;
  }

  .scroll-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .scroll-wrapper .title {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-image: linear-gradient(var(--usa-lightlightblue), var(--usa-lightblue));
  }

  .scroll-wrapper > div {
    width: 100%;
    padding: 0.5rem 1rem;
  }

  h2, h3 {
    color: var(--text-black);
  }

  h2 {
    font-family: var(--font-01);
    font-size: 1.1rem;
    font-weight: bold;
  }

  h3 {
    margin: 0 0 0.1rem 0;
    font-size: 0.9rem;
    font-weight: normal;
    clear: both;
  }

  p {
    display: inline;
    font-size: 0.8rem;
    line-height: 1.5;
  }

  ul {
    display: inline-block;
    list-style-type: none;
  }

  li {
    float: left;
    margin: 0.1rem 0.2rem 0.1rem 0;
    padding: 0.1rem 0.3rem;
    font-size: 0.7rem;
    color: var(--text-black);
    border: none;
    border-radius: 0.2rem;
    background-color: var(--usa-lightlightblue);
    cursor: pointer;
    user-select: none;
    transition: background-color 200ms ease;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07);
  }

  li:hover {
    background-color: var(--usa-lightblue);
  }

  .small {
    font-size: 0.7rem;
    font-weight: normal;
  }

  .very-small {
    font-size: 0.6rem;
    font-weight: normal;
  }

  .no-break {
    word-break: keep-all;
    white-space: nowrap;
  }
</style>
