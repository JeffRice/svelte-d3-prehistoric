<script>
  // additional legend on SVG, currently holding an extra attribution impact legend
  import {
    timeScale,
    smiTotalYScale,
    smiTotalRScale } from '../stores/scales';
  import { margin, width } from '../stores/dimensions';
  import { format } from 'd3';

  const commaFormat = format(',');
  const rTicks = [$smiTotalYScale(115), $smiTotalYScale(40), $smiTotalYScale(15)];
  const unscaled = [115, 40, 15]

</script>

<g class="legend"
   transform="translate({$width - ((($smiTotalYScale(rTicks[0]) + 15) * 2))  + 65  } {$smiTotalYScale.range()[1] - 60})">
  <text transform="translate({-$smiTotalYScale(rTicks[0]) - 20} {$smiTotalYScale(rTicks.slice(-1)[0])}) rotate(270)"
        dy="4">
    Size in feet
  </text>
  <g class="total-r-scale" transform="translate(0 {-2 * $smiTotalYScale(rTicks.slice(-1)[0])})">
    {#each rTicks as tick, i}
      <line x1="0"
            y1={$smiTotalYScale(rTicks[0]) - 2 * $smiTotalYScale(tick)}
            x2={$smiTotalYScale(rTicks[0]) + 15}
            y2={$smiTotalYScale(rTicks[0]) - 2 * $smiTotalYScale(tick)}></line>
      <text class="tick"
            transform="translate({$smiTotalYScale(rTicks[0]) + 18} {$smiTotalYScale(rTicks[0]) - 2 * $smiTotalYScale(tick)})">
        {unscaled[i]}
      </text>
      <circle cx="0"
              cy={$smiTotalYScale(rTicks[0]) - $smiTotalYScale(tick)}
              r={$smiTotalYScale(tick)}></circle>
    {/each}
  </g>
  <!-- <g class="smi-pending">
    <line x1="0"
          y1={-$smiTotalRScale(rTicks.slice(-1)[0])}
          x2={$smiTotalRScale(rTicks[0]) + 15}
          y2={-$smiTotalRScale(rTicks.slice(-1)[0])}></line>
    <text class="tick"
          transform="translate({$smiTotalRScale(rTicks[0]) + 18} {-$smiTotalRScale(rTicks.slice(-1)[0])})">
      pending
    </text>
    <circle cx="0"
            cy="0"
            r={$smiTotalRScale(rTicks.slice(-1)[0])}></circle>
  </g> -->
</g>

<style>
  line {
    fill: none;
    stroke: var(--text-darkgray);
    stroke-width: 0.05rem;
    stroke-dasharray: 4px 3px;
  }

  text {
    fill: var(--text-darkgray);
    font-family: var(--font-02);
    font-size: 0.7rem;
  }

  text.tick {
    font-size: 0.6rem;
  }

  .total-r-scale circle {
    fill: none;
    stroke: var(--usa-lightred);
    stroke-width: 0.1rem;
  }

  .smi-pending circle {
    fill: none;
    stroke: var(--usa-lightblue);
    stroke-width: 0.18rem;
    stroke-linecap: round;
    stroke-dasharray: 3px 5px;
  }
</style>
