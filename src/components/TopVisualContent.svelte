<script>
  // dynamic content placed above the visual
  import {
    disinformantNationFilter,
    contextData,
    sourceFilter,
    attributionScoreFilter,
    selectAllFilters,
    highlightPolarization,
    highlightCib } from '../stores/filters';
  import { format, timeFormat } from 'd3';
  import { drawWrapper } from '../stores/elements';
  import { copytooltipable } from '../actions/copytooltipable';
  import { scrollTo } from '../utils/misc';
  import { fossilDatapoints } from '../stores/elements';

  export let data = [];

  const commaFormat = format(',');
  const tf = timeFormat('%B %d, %Y');

  function handleApplyFilter(id) {
    selectAllFilters();
    contextData.unselectAll();
    $highlightPolarization = false;
    $highlightCib = false;
    switch (id) {
      case 0:
        disinformantNationFilter.selectOne('North America');
        contextData.selectOne('corona');
        break;
      case 1:
        sourceFilter.selectOne('Facebook');
        $highlightCib = true;
        break;
      case 2:
        $attributionScoreFilter = [$attributionScoreFilter[0], 6];
        break;
      case -1: break;
    }
    $drawWrapper.scrollIntoView({behavior: 'smooth'});
  }
</script>

{#if (data.length > 0 && $fossilDatapoints)}
  <section id="expand-content" class="content transparent-bg no-upper-margin" >
    <input id="collapsible-status-quo" class="toggle" type="checkbox">
    <label for="collapsible-status-quo" class="lbl-toggle top">Overview</label>
    <div class="collapsible-content">
      <p>
        The Prehistoric Life Timeline Mapping is an interactive visualization about prehistoric creatures. They are mapped to their original geographic location and period in time they existed. It also maps fossils to their current era discovery sites.
      </p>
      <p>
        The timeline visualization contains <em>{data.length} Prehistoric Creatures</em> that existed up to <em> 305 million years ago </em>
      </p>
      <p>
        The mapped fossil datasets contain a total of <em>{$fossilDatapoints.originaljurassic.length + $fossilDatapoints.originalcretaceous.length + $fossilDatapoints.originaltriassic.length} Dinosaur fossils</em>:
      </p>
                                     <ul>
                                      <li><em>{$fossilDatapoints.originalcretaceous.length} fossils</em> from the Cretaceous Period</li>
                                      <li><em>{$fossilDatapoints.originaljurassic.length} fossils</em> from the Jurassic Period</li>
                                      <li><em>{$fossilDatapoints.originaltriassic.length} and fossils</em> from the Triassic Period </li>
                                     </ul>
                                
    </div>
    <input id="collapsible-how-to" class="toggle" type="checkbox">
    <label for="collapsible-how-to" class="lbl-toggle top">How To Use This Tool</label>
    <div class="collapsible-content">

      <p>
        <em>Filters</em> enable users to adjust the visibility of creatures by <span class="pseudolink copy-tooltip" use:copytooltipable={{content: 'The primary continent this creature lived. Although some may have lived in additional regions they are only mapped to one Continent.'}}>Continent</span>, <span class="pseudolink copy-tooltip" use:copytooltipable={{content: 'The type of diet either herbivore or carinvore. Although it is believed there was a small amount of omnivorous prehistoric life those have not been included.'}}>Diet</span>, and <span class="pseudolink copy-tooltip" use:copytooltipable={{content: 'The geologic time period they belond to. Again although some may have stretched into multiple time periods, so they\'re given a time range that shows dates they may have lived'}}>Time Period</span>. Free text search is also supported.
      </p>
      <p>
        <em>Timeline View</em> ordered chronologically from left to right. By clicking and dragging just below the timeline, users can filter their view to a particular date range. Or by clicking on the colored time period tabs they can select that periods time rage. Return to the default view by clicking "Reset time scale" on the left-hand side of the timeline. 
        <br /><img class="image" src="images/brushable.jpg" alt="using the timeline brush"  />
        <br /><img class="image" src="images/selectlabel.jpg" alt="selecting a time period label" />
      </p>
      <p>
        <em>Map View</em> shows a Mercator projection of the Earth. There is a current map as well as an overlay of pangea avaialable via the control panel. The source Continent of each Creature is connected by the curved lines: the more lines a particular region has originating from it, shows more creatures mapped to that location. These sources and continent mappings can be hidden via the "Toggle Sources" checkbox in the controls. By hovering over a particular Continent, users can see a density plot of creatures over time, as well as breakdowns of the creatures diets and time periods. Each of these can be auto-filtered together with the selected country. 
      </p>
      <p>
        <em>Fossil Datapoints</em> are a collection of fossils related to dinosaurs or entire time periods. Large screens are automatically populated with all fossil data. Smaller screens are left blank. To control these fossil points select a time period from the dropdowns or select an individual dinosaur from the details section.
        <br /><img class="image" src="images/fossildata.jpg" alt="using the fossil dropdown" />
      </p>
      <p>
        <em>Size + Weight Distribution</em> is a scatterplot charting the size and weight of each creature. They are broken into smaller size categories you can navigate between using the radio buttons below the chart.
      </p>
      <p>
        <em>Dataset View</em> presents a simplified spreadsheet view of the prehistoric dataset. Creatures are affected by all applied filters. By clicking on one or more creatures in the Timeline View, users can "pin" them to the top of the Dataset View for easy comparison. The <a href="https://github.com/JeffRice/svelte-d3-prehistoric/tree/main/public">full dataset</a> can also be downloaded. 
      </p>
    </div>

    <ul class="filter-list">
      <li on:click|self={() => document.querySelector('#viz').scrollIntoView({behavior: 'auto'})}>Visualization</li>
      <li on:click|self={() => document.querySelector('.fossil-wrapper').scrollIntoView({behavior: 'auto'})}>Fossil Details</li>
      <li on:click|self={() => document.querySelector('.chart-wrapper').scrollIntoView({behavior: 'auto'})}>Size + Weight Chart</li>
      <li on:click|self={() => document.querySelector('#table').scrollIntoView({behavior: 'auto'})}>Table</li>
      <li on:click|self={() => document.querySelector('.about').scrollIntoView({behavior: 'auto'})}>About</li>
    </ul>
    <!-- <p>
      Or just explore the full tool <span class="pseudolink" on:click={() => handleApplyFilter(-1)}>below</span>. 
    </p> -->
  </section>
{/if}

<style>
  .image {
    max-width: 100%;
  }
</style>
