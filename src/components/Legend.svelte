<script>
  // additional legend on SVG, currently holding an extra attribution impact legend
  import {
    timeScale,
    sizeTotalYScale,
    sizeTotalRScale,
    sizeShareRScale,
  } from "../stores/scales";
  import { margin, width } from "../stores/dimensions";
  import { format } from "d3";

  const commaFormat = format(",");
  // const rTicks = [$sizeTotalYScale(115), $sizeTotalYScale(40), $sizeTotalYScale(20)];
  const rTicks = [115, 50, 10];
  // const unscaled = [115, 40, 20]

  let circleScale = 1.15;
</script>

<!--
<g class="legend"
   transform="translate({$width - ((($sizeTotalYScale(rTicks[0]) + 15) * 2))  + 65  } {$sizeTotalYScale.range()[1] - 60})">
  <text transform="translate({-$sizeTotalYScale(rTicks[0]) - 20} {$sizeTotalYScale(rTicks.slice(-1)[0])}) rotate(270)"
        dy="4">
    Size in feet
  </text>
  <g class="total-r-scale" transform="translate(0 {-2 * $sizeTotalYScale(rTicks.slice(-1)[0])})">
    {#each rTicks as tick, i}
      <line x1="0"
            y1={$sizeTotalYScale(rTicks[0]) - 2 * $sizeTotalYScale(tick)}
            x2={$sizeTotalYScale(rTicks[0]) + 15}
            y2={$sizeTotalYScale(rTicks[0]) - 2 * $sizeTotalYScale(tick)}></line>
      <text class="tick"
            transform="translate({$sizeTotalYScale(rTicks[0]) + 18} {$sizeTotalYScale(rTicks[0]) - 2 * $sizeTotalYScale(tick)})">
        {unscaled[i]}
      </text>
      <circle cx="0"
              cy={$sizeTotalYScale(rTicks[0]) - $sizeTotalYScale(tick)}
              r={$sizeTotalYScale(tick)}></circle>
    {/each}
  </g>

</g>
-->

<g
  class="legend"
  transform="translate({$width -
    rTicks[0] * circleScale -
    65} {$sizeTotalYScale.range()[1] - 20})"
>
  <text
    transform="translate({0} {rTicks[0] * circleScale -
      2 * $sizeTotalRScale(rTicks[0]) -
      30})"
  >
    Size in feet
  </text>
  <g
    class="total-r-scale"
    transform="translate(0 {-2 * (rTicks.slice(-1)[0] * circleScale)})"
  >
    {#each rTicks as tick, i}
      <line
        x1="0"
        y1={rTicks[0] * circleScale - 2 * $sizeTotalRScale(tick)}
        x2={rTicks[0] * circleScale + 15}
        y2={rTicks[0] * circleScale - 2 * $sizeTotalRScale(tick)}
      />
      <text
        class="tick"
        transform="translate({rTicks[0] * circleScale + 18} {rTicks[0] *
          circleScale -
          2 * $sizeTotalRScale(tick)})"
      >
        {commaFormat(tick)}
      </text>
      <circle
        cx="0"
        cy={rTicks[0] * circleScale - $sizeTotalRScale(tick)}
        r={$sizeTotalRScale(tick)}
      />
    {/each}
  </g>
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
    font-size: 0.85rem;
  }

  text.tick {
    font-size: 0.8rem;
  }

  .total-r-scale circle {
    fill: none;
    stroke: var(--prehistoricGreen);
    stroke-width: 0.1rem;
  }

  .size-pending circle {
    fill: none;
    stroke: var(--prehistoricGreen);
    stroke-width: 0.18rem;
    stroke-linecap: round;
    stroke-dasharray: 3px 5px;
  }
</style>
