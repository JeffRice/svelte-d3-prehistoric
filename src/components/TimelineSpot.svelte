<script>
  // selected dates on the timeline (= the spots)
  import { panelHeight } from '../stores/dimensions';
  import { timeScale } from '../stores/scales';
  import { margin } from '../stores/dimensions';
  import { spottooltipable } from '../actions/spottooltipable';
  import { drawWrapper } from '../stores/elements';
  import { createTweenedPos } from '../transitions/tween';
  import { originalTimeDomain } from '../stores/filters';

  export let spot;

  const x = createTweenedPos();
  const x2 = createTweenedPos();


  const lineLength = 35;
  const offset = 5;
  let yScaleText, mapScaleText, timeScaleText;
  let spotName = spot.name
  let displayName;
  if (spotName === 'Neogene'){
    displayName = 'Ng'
  }
  else {
    displayName = spotName;
  }

  $: $x = $timeScale(spot.date);
  $: $x2 = $timeScale(spot.endDate);


  function testSetScale(e) {
    console.log(e)
    console.log(e.path[0].classList[0])
    if (!$originalTimeDomain) $originalTimeDomain = [...$timeScale.domain()];
    

    if (e.path[0].classList[0] === 'Neogene'){
      $timeScale.domain([2, 23])
    }
    if (e.path[0].classList[0] === 'Paleogene'){
      $timeScale.domain([23, 65])
    }
    if (e.path[0].classList[0] === 'Cretaceous'){
      $timeScale.domain([65, 145])
    }
    if (e.path[0].classList[0] === 'Jurassic'){
      $timeScale.domain([145, 201])
    }
    if (e.path[0].classList[0] === 'Triassic'){
      $timeScale.domain([201, 251])
    }
    if (e.path[0].classList[0] === 'Permian'){
      $timeScale.domain([251, 298])
    }
    if (e.path[0].classList[0] === 'Carboniferous'){
      $timeScale.domain([298, 358])
    }





$timeScale = $timeScale;
//resetBrush();


}





</script>


<g class="labels">
  <g class="time-scale">
<g class="spot time-scale-label"
    transform="translate({$x} -20)"
    on:click={testSetScale}
    use:spottooltipable={{data: spot, target: $drawWrapper, top: $panelHeight + 20}}>


            <rect x="0" y ="-20" width="{$x2 - $x}" height="40" rx="5" class="{spotName}" />


         <!--    <path d="M0 0l{lineLength} 0"></path>   -->
            <text class="bg"
                  dx={offset}
                  dy="4">{displayName} </text>
            <text bind:this={timeScaleText}
                  class="{spotName}"
                  on:click={testSetScale}
                  dx={offset}
                  dy="4">{displayName} </text>
 <!--
                  {#if (spot.name === 'Jurassic' || spot.name === 'Triassic'|| spot.name === 'Cretaceous') }
            <path d="M{timeScaleText ? timeScaleText.getComputedTextLength() + 2.5 * offset: 0} 0l{lineLength} 0"
                  marker-end="url(#arrow)"></path>
                  {/if}

  
  <circle cx="0" cy="0" r="5"></circle>
  <circle class="bait" cx="0" cy="0" r="10"></circle>
 -->

</g>
</g>
</g>

<style>
  g.spot {
    pointer-events: all;
    cursor: pointer;
  }

  g.spot:hover circle:not(.bait) {
    fill: var(--dfrlab-gray);
  }

  circle {
    stroke: var(--dfrlab-gray);
    stroke-width: 0.13rem;
    stroke-opacity: 0.9;
    fill: var(--bg);
    transition: all 200ms ease;
  }

  circle.bait {
    fill: none;
    stroke: none;
  }

  rect {
    stroke: var(--dfrlab-gray);
    stroke-width: 0.13rem;
    stroke-opacity: 0.9;
    transition: all 200ms ease;
  }


  .Cretaceous {
    fill: var(--cretaceous);
  }
  .Jurassic {
    fill: var(--jurassic);
  }
  .Triassic {
    fill: var(--triassic);
   }
  .Paleogene {
    fill:  var(--paleogene);
  }
  .Neogene {
    fill:  var(--neogene);
  }
  .Permian {
    fill:  var(--permian);
  }
  .Carboniferous {
    fill:  var(--carboniferous);
  }
  
  

  rect.bait {
    fill: none;
    stroke: none;
  }

  .time-scale text {
    fill: var(--text-darkgray);
    font-family: var(--font-02);
    font-size: 0.85rem;
    text-anchor: middle;
  }

  .time-scale-label text {
    text-anchor: start;
  }



  .time-scale circle {
    stroke: none;
    fill: var(--dfrlab-gray);
  }

  .y-scale-ticks text, .y-scale text, .map-scale text {
    fill: var(--text-darkgray);
    font-family: var(--font-02);
    font-size: 0.7rem;
  }

  .y-scale-ticks text {
    font-size: 0.6rem;
  }

  .time-scale path, .y-scale path, .map-scale path {
    stroke: var(--text-darkgray);
    stroke-width: 0.1rem;
  }
</style>
