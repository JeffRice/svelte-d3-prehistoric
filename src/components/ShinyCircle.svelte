<script>
  // shiny circle around balloons
  import { fade } from "svelte/transition";
  import {
    bloomDuration,
    growDuration,
    jitterFactor,
  } from "../transitions/constants";
  import { sortConsistently } from "../utils/misc";

  export let timePoint;
  export let tweenedPos;
  export let selected = false;
  export let hovered = false;

  let sortedRadii = [];

  $: if (timePoint)
    sortedRadii = [
      {
        id: 2,
        className: "reddit",
        r:
          timePoint.rSizeTot * 0.1 +
          timePoint.rSizeTot * 0.3 +
          timePoint.rSizeTot * 0.85,
      },
      {
        id: 1,
        className: "twitter",
        r: timePoint.rSizeTot * 0.3 + timePoint.rSizeTot * 0.85,
      },
      {
        id: 0,
        className: "facebook",
        r: timePoint.rSizeTot * 0.75,
      },
    ].map((d) => ({ ...d, r: d.r * sizeFactor }));

  // console.log(timePoint);

  $: sizeFactor = 0.85;
</script>

<g
  class="shiny-circle"
  class:selected={selected || hovered}
  transform="translate({tweenedPos.x} {tweenedPos.fy})"
  in:fade|local={{
    duration: bloomDuration,
    delay: growDuration + timePoint.id * jitterFactor,
  }}
  out:fade|local={{
    duration: bloomDuration,
    delay: timePoint.id * jitterFactor,
  }}
>
  {#each sortedRadii as { id, className, r } (id)}
    <circle class={className} cx="0" cy="0" {r} />
  {/each}
</g>

<style>
  g {
    opacity: 0.04;
    transition: opacity 400ms ease;
    pointer-events: none;
  }

  g.selected {
    opacity: 0.76;
  }

  circle {
    stroke: none;
    opacity: 1;
  }
</style>
