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
  <section class="content transparent-bg no-upper-margin" >
    <input id="collapsible-status-quo" class="toggle" type="checkbox">
    <label for="collapsible-status-quo" class="lbl-toggle top">Overview</label>
    <div class="collapsible-content">
      <p>
        The Prehistoric Life Timeline Mapping is an interactive, open-source database that shows a variety of information about prehistoric creatures. They are mapped to their original geographic location and period in time they existed. It also maps fossils to their current era discovery sites.
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
        <em>Filters</em> enable users to adjust the visibility of cases by <span class="pseudolink copy-tooltip" on:click={() => scrollTo('attribution-score', 'collapsible-methodology')} use:copytooltipable={{content: 'The Attribution Score is a framework of eighteen binary statements (true or false) intended to assess the credibility, objectivity, evidence, and transparency of a given case.'}}>Attribution Score</span>, <span class="pseudolink copy-tooltip" on:click={() => scrollTo('source', 'collapsible-codebook')} use:copytooltipable={{content: 'Disinformant Nation is the nation from which the case allegedly originated. This does not necessarily denote that the activity was associated with a government.'}}>Disinformant Nation</span>, <span class="pseudolink copy-tooltip" on:click={() => scrollTo('platform', 'collapsible-codebook')} use:copytooltipable={{content: 'Platform(s) on which the case allegedly took place, divided between the open web, social media platforms, messaging platforms, and other platforms like email and forum boards.'}}>Platform</span>, <span class="pseudolink copy-tooltip" on:click={() => scrollTo('method', 'collapsible-codebook')} use:copytooltipable={{content: 'Method(s) involved in both the creation and amplification of content related to the case. Sockpuppets are one method; hacking by means of data exfiltration is another.'}}>Method</span>, <span class="pseudolink copy-tooltip" on:click={() => scrollTo('source', 'collapsible-codebook')} use:copytooltipable={{content: 'Source describes the individual or entity that originated a foreign interference claim.'}}>Source</span>, and <span class="pseudolink copy-tooltip" on:click={() => scrollTo('source', 'collapsible-codebook')} use:copytooltipable={{content: 'Source Category is the broad classification (e.g. Government, Technology Company) of the Source of a given case.'}}>Source Category</span>. Free text search is also supported. This view also supports the addition of contextual datasets.
      </p>
      <p>
        <em>Timeline View</em> enables cases to be ordered chronologically from left to right. Noteworthy U.S. events in the U.S. 2020 election cycle are plotted on the timeline for context and reference. Additional timeline elements can be introduced with the Context Datasets filter. By clicking and dragging on the timeline, users can filter their view to a particular date range. They can return to the default view by clicking "Reset time scale" on the left-hand side of the timeline. 
      </p>
      <p>
        <em>Map View</em> shows a Mercator projection of the Earth. Cases are plotted on the map by means of tails connected to particular Disinformant Nations: the more lines a particular country has originating from it, the more it has been implicated in allegations of foreign interference. By hovering over a particular country, users can see a density plot of attributions over time (if n > 5), as well as breakdowns of Platform, Method, Source, and Source Category. Each of these can be auto-filtered together with the selected country.
      </p>
      <p>
        <em>Dataset View</em> presents a simplified spreadsheet view of the FIAT dataset. Cases are affected by all applied filters. By clicking on one or more cases in the Case View, users can "pin" them to the top of the Dataset View for easy comparison. The <em>Dataset View</em> for easy comparison. The <a href="https://github.com/JeffRice/svelte-d3-prehistoric/tree/main/public">full dataset</a> can also be downloaded from this view. 
      </p>
    </div>

    <p>
       enables users to filter and examine data in a multitude of ways. As you get started, consider filtering by: 
    </p>
    <ul class="filter-list">
      <li on:click|self={() => handleApplyFilter(0)}>Jurassic</li>
      <li on:click|self={() => handleApplyFilter(1)}>Cretaceous</li>
      <li on:click|self={() => handleApplyFilter(2)}>Triassic</li>
    </ul>
    <!-- <p>
      Or just explore the full tool <span class="pseudolink" on:click={() => handleApplyFilter(-1)}>below</span>. 
    </p> -->
  </section>
{/if}

<style>
</style>
