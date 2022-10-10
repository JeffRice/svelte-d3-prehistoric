<script>
  // the single balloon implementation
  import { fade } from 'svelte/transition';
  import { width } from '../stores/dimensions';
  import { bloomDuration, growDuration, jitterFactor } from '../transitions/constants';
  import { createEventDispatcher } from 'svelte';

  import EventTooltip from './EventTooltip.svelte';

  export let timePoint;
  export let tweenedPos;
  export let selected = false;

  if (timePoint.size < 15){
    console.log('wtf')
  }

  function setRadius (size) {
   return Math.max(size, 15)
  }


  const dispatch = createEventDispatcher();

  function handleMouseOver(e) {
    if (e.buttons === 1) return;
    dispatch('mouseover', {id: timePoint.id, tp: timePoint, e})
  }

  function handleMouseClick(e) {
    dispatch('click', {id: timePoint.id, tp: timePoint, e})
  }
</script>

<g class="balloon"
   class:selected
   transform="translate({tweenedPos.x} {tweenedPos.fy})"
   on:mouseover|stopPropagation={handleMouseOver}
   on:click|stopPropagation={handleMouseClick}
   in:fade|local={{duration: bloomDuration, delay: growDuration + timePoint.id * jitterFactor}}
   out:fade|local={{duration: bloomDuration, delay: timePoint.id * jitterFactor}}>
  {#if (timePoint.recentlyAdded)}
    <circle class="glow"
            cx="0"
            cy="0"
            r={timePoint.size}
            ></circle>
   
  {/if}
  <circle class="balloon-main"
          cx="0"
          cy="0"
          r={setRadius(timePoint.size) * 1.55}
          filter="url(#{timePoint.image_location}_image)"
         ></circle>
          
  <!--<circle class="balloon-effect"
          class:smi-pending={timePoint.smiPending}
          cx="0"
          cy="0"
          r={timePoint.size * 1.2}></circle>-->
</g>

<style>
  circle {
    stroke: none;
    opacity: 1;
  }

  .balloon {
    cursor: pointer;
  }

  .glow {
    stroke: var(--dfrlab-green);
    stroke-width: 0.05rem;
    fill: none;
    animation: pulse 3s infinite ease-in-out;
    animation-iteration-count: 20;
    opacity: 0;
    pointer-events: none;
  }

  .balloon-effect {
    fill: url('#green-radial-gradient');
    opacity: 0;
  }

  .old-balloon-effect {
    fill: url('#radial-gradient');
  }

  .balloon-effect.smi-pending {
    stroke: var(--usa-lightblue);
    stroke-width: 0.18rem;
    stroke-linecap: round;
    stroke-dasharray: 3px 5px;
  }

  .selected .balloon-effect {
    stroke: var(--usa-blue);
    stroke-width: 0.18rem;
  }

  .balloon-main {
    opacity: 0.5;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: 0.9;
    }
    50% {
      opacity: 0.8;
    }
    70% {
      opacity: 0.09;
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }
</style>
