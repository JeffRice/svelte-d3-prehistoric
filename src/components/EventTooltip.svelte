<script>
  // a case tooltip (event = case)
  import { afterUpdate } from 'svelte';
  import { width, panelHeight, controlsHeight } from '../stores/dimensions';
  import { tooltip } from '../stores/eventSelections';
  import { fade, slide } from 'svelte/transition';
  import { timeFormat } from 'd3';
  import { extractHostname } from '../utils/misc';
  import {
    platformFilter,
    methodFilter,
    timeperiodFilter,
    sourceFilter,
    sourceCategoryFilter,
    tagFilter,
    textSearchFilter,
    highlightPolarization,
    selectAllFilters} from '../stores/filters';
 // import { maxScores } from '../inputs/scores';
  import { images } from '../inputs/dataPaths';

  import EventTooltipCross from './EventTooltipCross.svelte';
  /*
  import ScoreBar from './ScoreBar.svelte';
  import ScoreQuestions from './ScoreQuestions.svelte';
  import ImpactStrip from './ImpactStrip.svelte';
  import PolarizationLegend from './PolarizationLegend.svelte';
  import CibTable from './CibTable.svelte';
  */
  import Share from './Share.svelte';

  const offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };
  const contentOffset = -20;

  const attributionTf = timeFormat('%B %d, %Y');
  const activityTf = timeFormat('%B %Y');

  let elem;
  let tWidth, tHeight;
  let side;
  let left, top, contentTop;
  let scrollWrapper;
  let paragraphs;

  let scoreQuestionsExpanded = false;

  function handleLiClick(type, item) {
    selectAllFilters();
    switch (type) {
      case 'platform': platformFilter.selectOne(item); break;
      case 'method': methodFilter.selectOne(item); break;
      case 'source': sourceFilter.selectOne(item); break;
      case 'sourceCategory': sourceCategoryFilter.selectOne(item); break;
      case 'tag': tagFilter.selectOne(item); break;
    }
  }

  function highlight(s) {
    if (!$textSearchFilter || $textSearchFilter === '') return s;
    return s.replace(new RegExp($textSearchFilter.toLowerCase().split(' or ').join('|'), 'gi'), (match) => `<span class="highlighted">${match}</span>`);
  }

  function removeSpace(str) {
    return str.replace(/\s/g, '')
  }

  $: if (showTooltip) {
    scoreQuestionsExpanded = false;

    side = $width - $tooltip.tp.x < $width / 2 ? 'left' : 'right';
    
    top = $tooltip.tp.fy - offset.top;

    // adjust for the difference between mouse hover point and balloon center
    const balloonPos = $tooltip.e.pageY;

    // the regular tooltip offset to the balloon
    contentTop = contentOffset;

    // if the tooltip hits the lower page boundary
    if (balloonPos + contentTop + tHeight - window.pageYOffset > window.innerHeight) {
      // console.log('lower')
      contentTop -= balloonPos + tHeight - window.pageYOffset - window.innerHeight;
    }

    // if the tooltip hits the upper page boundary
    if (balloonPos + contentTop - window.pageYOffset < $controlsHeight) {
      // console.log('upper')
      contentTop -= balloonPos + contentTop - window.pageYOffset - $controlsHeight - 50;
    }

    // // if the tooltip hits the uper border of the SVG
    if ($tooltip.tp.fy + contentTop < $controlsHeight) {
      // console.log('border')
      contentTop -= $tooltip.tp.fy + contentTop - $controlsHeight;
    }
    
    if (side === 'left') {
      left = $tooltip.tp.x - tWidth + offset.left;
    } else if (side === 'right') {   
      left = $tooltip.tp.x - offset.left;
    }

    if (scrollWrapper) scrollWrapper.scrollTo(0, 0);

    // translate tooltip content to html
    let tooltipText = $tooltip.tp.tooltipContent;
    paragraphs = tooltipText.split("<p>");
    let numberOfParagraphs = paragraphs.length;
     console.log(paragraphs[0],paragraphs[1],paragraphs[2] );
     console.log(numberOfParagraphs);
  }

  $: showTooltip = ($tooltip && $tooltip.tp && $tooltip.tp.show);
</script>

{#if (showTooltip)}
  <div class="tooltip"
       style="left: {left}px; top: {top}px;"
       bind:clientWidth={tWidth}
       on:click|stopPropagation
       on:mouseover|stopPropagation
       transition:fade={{duration: 200}}>
    <EventTooltipCross {tWidth} {offset} {side} />
    <div class="mouse-catcher"
          style="width: {tWidth}px;
                 height: {Math.max(10, Math.abs(contentTop) - $tooltip.tp.rSizeTot + 25)}px;
                 position: absolute;
                 top: {contentTop - 10}px;"></div>
    <div class="mouse-catcher"
          style="width: {tWidth}px;
                 height: {Math.abs(tHeight - Math.abs(contentTop))}px;
                 position: absolute;
                 top: {$tooltip.tp.rSizeTot + 5}px;"></div>
    <div class="content"
         bind:this={elem}
         bind:clientHeight={tHeight}
         style="top: {contentTop}px; margin: 0px {$tooltip.tp.rSizeTot / 3 + offset.left}px;">
      <div class="scroll-wrapper"
           bind:this={scrollWrapper}>
           
        <div class="title title-bg">
          <h2>{$tooltip.tp.name}</h2>
          <div class="title-top">




            <section class="dino-stats">
  
  
              <div class="stats-item"><span><strong>Length:</strong> {$tooltip.tp.size} ft</span></div>
              <div class="stats-item"><span><strong>Weight:</strong> {$tooltip.tp.weight} lbs</span></div>
              <div class="stats-item"><span><strong>Earliest Date:</strong> {$tooltip.tp.testDate} MYA</span></div>
              <div class="stats-item"><span><strong>Latest Date:</strong> {$tooltip.tp.testDate} MYA</span></div>
              <div class="stats-item"><span><strong>Diet:</strong> {$tooltip.tp.diet}</span></div>
              <div class="stats-item"><span><strong>Regions:</strong> {$tooltip.tp.disinformantNation}</span></div>
            </section>


          </div>

          <!--
          <Share text="" caseId={$tooltip.tp.id} mode="tooltip" />
          -->
          <section class="era-labels">
          <span class="tag-label Cretaceous"> Cretaceous  </span>
          <span class="tag-label Jurassic"> Jurassic  </span>
          <span class="tag-label Triassic"> Triassic  </span>
          <span class="tag-label Paleogene"> Paleogene  </span>
          <span class="tag-label Neogene"> Neogene  </span>
          </section>



          <div class="image">
            <img src="{images}{removeSpace($tooltip.tp.name.toLowerCase())}.jpg" alt={$tooltip.tp.shortTitle} />
          </div>

        </div>



        {#if ($tooltip.tp.tooltipContent)}
        <div class="description">




          {#if ($tooltip.tp.periodEra)}
          <div class="tt-image">
            <img class="image" src="{images}{$tooltip.tp.periodEra}.jpg" alt={$tooltip.tp.shortTitle} />
            <p>{$tooltip.tp.imageCredit}</p>
          </div>
          {/if}
          <!-- Just for styling the fist paragraph and image differently-->
          <p>{paragraphs[0]}</p>



            {#each paragraphs as paragraph, i}
              {#if i > 0} 
              <div class="image">
                <img src="{images}{removeSpace($tooltip.tp.name.toLowerCase())}{i}.jpg" alt={$tooltip.tp.shortTitle} />
              </div>
                <p>{paragraph}</p>
              {/if}
            {/each}
            {#if ($tooltip.tp.extraImage === 'yes')}
            <div class="image">
              <img src="{images}{$tooltip.tp.name.toLowerCase()}3.jpg" alt={$tooltip.tp.shortTitle} />
            </div>
            {/if}
         </div>
        {/if}



        <div class="link">
          Wiki Link:
          <a href="{$tooltip.tp.wikiURL}" target="_blank" class="no-float">{$tooltip.tp.name}</a>
        </div>


        <div class="description">
          <h3>Description</h3>
          <p> short description here</p>
        </div>
<!--
        {#if (!($tooltip.tp.tags.length === 1 && $tooltip.tp.tags[0] === 'unspecified'))}
          <div class="tags">
            <h3>Tags</h3>
            <ul>
              {#each $tooltip.tp.tags as tag (tag)}
                <li class="card" on:click|self={() => handleLiClick('tag', tag)}>{@html highlight(tag)}</li>
              {/each}
            </ul>
          </div>
        {/if}
        <div class="platforms">
          <h3>Platforms</h3>
          <ul>
            {#each $tooltip.tp.platforms as platform (platform)}
              <li class="card" on:click|self={() => handleLiClick('platform', platform)}>{@html highlight(platform)}</li>
            {/each}
          </ul>
        </div>
        <div class="methods">
          <h3>Methods</h3>
          <ul>
            {#each $tooltip.tp.methods as method (method)}
              <li class="card" on:click|self={() => handleLiClick('method', method)}>{@html highlight(method)}</li>
            {/each}
          </ul>
        </div>

        <div class="source">
          <h3>Source{$tooltip.tp.source.length !== 1 ? 's' : ''}</h3>
          <ul>
            {#each $tooltip.tp.source as source, i (source)}
              <li class="card" on:click|self={() => handleLiClick('source', $tooltip.tp.sourceFilter[i] ? $tooltip.tp.sourceFilter[i] : $tooltip.tp.sourceFilter.slice(-1)[0])}>
                {#if ($tooltip.tp.sourceFilter[i] && $tooltip.tp.sourceFilter[i] !== source)}
                  {@html highlight(source)} / {@html highlight($tooltip.tp.sourceFilter[i])}
                {:else if (!$tooltip.tp.sourceFilter[i] && $tooltip.tp.sourceFilter.slice(-1)[0] !== source)}
                  {@html highlight(source)} / {@html highlight($tooltip.tp.sourceFilter.slice(-1)[0])}
                {:else if ($tooltip.tp.sourceFilter[i])}
                  {@html highlight($tooltip.tp.sourceFilter[i])}
                {:else}
                  {@html highlight($tooltip.tp.sourceFilter.slice(-1)[0])}
                {/if}
              </li>
            {/each}
          </ul>
        </div>

        <div class="source-category">
          <h3>Source Categor{$tooltip.tp.sourceCategory.length !== 1 ? 'ies' : 'y'}</h3>
          <ul>
            {#each $tooltip.tp.sourceCategory as cat (cat)}
              <li class="card" on:click|self={() => handleLiClick('sourceCategory', cat)}>{@html highlight(cat)}</li>
            {/each}
          </ul>
        </div>

        -->
        <div class="link">
          <h3>Link</h3>
          <a href="http://www.wikipedia.org" target="_blank" class="no-float">wikipedia link</a>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .tooltip {
    width: 50%;
    /* min-width: 550px; */
    font-family: var(--font-02);
    position: absolute;
    z-index: 10000;
  }

  /*
  @media (min-width: 800px) {
    .tooltip {
      width: 21%;
      min-width: 550px;
    }
  }
  */

  .content {
    display: flex;
    flex-direction: column;
    max-height: 60vh;
    color: var(--text-black);
    background-color: var(--bg);
    pointer-events: all;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
    position: absolute;
  }

  .scroll-wrapper {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .scroll-wrapper .title {
    padding: 1rem;
  /*  background-image: linear-gradient(var(--usa-lightlightred), var(--usa-lightred)); */
    position: relative;
  }

  .title-top {
    display: flex;
    align-items: flex-start;
    width: 100%;
  }

  .title-dates {
    flex: 1;
  }

  .title-dates p {
    color: var(--text-black);
    font-size: 0.7rem;
  }

  .scroll-wrapper > div {
    width: 100%;
    padding: 0.5rem 1rem;
  }

  h2, h3 {
    color: var(--text-black);
  }

  h2 {
    margin: 0 0 0 0;
    font-size: 2.1rem;
    font-weight: bold;
  }

  h3 {
    margin: 0 0 0.1rem 0;
    font-size: 0.9rem;
    font-weight: normal;
    clear: both;
  }

  
.title-bg {
  background-color: var(--cretaceous);
}

/* Time Era Styling */
.Cretaceous {
  color: var(--cretaceous);
}
.Jurassic {
  color: var(--jurassic);
}
.Triassic {
  color: var(--triassic);
 }
.Paleogene {
  color:  var(--paleogene);
}
.Neogene {
  color:  var(--neogene);
}
.tag-label {
  border-radius: 1rem;
  padding: 0.5rem;
  background-color: #577863;;
}


  h3 {
    margin: 0 0 0.1rem 0;
    font-size: 0.9rem;
    font-weight: normal;
    color: var(--text-black);
    clear: both;
  }

  p {
    font-size: 0.8rem;
    line-height: 1.5;
  }

  ul {
    display: inline-block;
    list-style-type: none;
  }

  li.card, a {
    float: left;
    margin: 0.1rem 0.2rem 0.1rem 0;
    padding: 0.1rem 0.3rem;
    font-size: 0.8rem;
    color: var(--text-black);
    border: none;
    border-radius: 0.2rem;
    background-color: var(--usa-lightlightred);
    cursor: pointer;
    user-select: none;
    transition: background-color 200ms ease;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07);
  }

  .size ul {
    display: flex;
  }

  a {
    text-decoration: none;
  }

  a:hover, li.card:hover {
    background-color: var(--usa-lightred);
  }

  .small {
    font-size: 0.6rem;
  }

  .scroll-wrapper .image {
    min-height: 1%;
    width: 100%;
  }

  .image img {
    width: 100%;
  }

  .image p {
    width: 100%;
    font-size: 0.5rem;
    text-align: right;
  }

  .no-float {
    float: none;
  }

  .dino-stats{
    display: grid;
    grid-auto-flow: column;
    grid-gap: 0.3rem;
    flex-direction: column;
    align-items: center;
    grid-template-rows: repeat(2,1fr);
    margin-left: 16px;
    margin-bottom: 16px;
  }

  .era-labels {
    margin-bottom: 1rem;
  }

  .stats-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.95rem;
  }

  .tt-image {
    width: 50%;
    float: left;
    padding: 25px;
  }

  .description {
    padding: 5px;
  }

  .description p {
    padding: 2em;
  }
</style>
