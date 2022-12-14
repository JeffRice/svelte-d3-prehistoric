<script>
  // the time scale brush / zoom
  import { onMount } from "svelte";
  import { timeScale } from "../stores/scales";
  import { panelHeight, margin } from "../stores/dimensions";
  import { brushable } from "../actions/brushable";
  import { originalTimeDomain } from "../stores/filters";

  let x = 0;
  let fx = 0;
  let fy = 0;
  let width = 0;
  let fWidth = 0;
  let fHeight = 0;
  let resetText;

  let invisible = true;

  function resetBrush() {
    x = fx = $timeScale.range()[0];
    fy = $margin.top;
    width = fWidth = $timeScale.range()[1] - $timeScale.range()[0];
    fHeight = ($panelHeight - $margin.top) * 1.05;
  }

  function resetTimeDomain() {
    if ($originalTimeDomain) {
      $timeScale.domain($originalTimeDomain);
      $originalTimeDomain = null;
      $timeScale = $timeScale;
    }
  }

  function handleBrushStart(e) {
    invisible = false;
    width = 0;
  }

  function handleBrush(e) {
    width = e.detail.width;
    x = e.detail.x;
  }

  function handleBrushEnd(e) {
    invisible = true;

    const { x1, x2 } = e.detail;
    if (!x1 || !x2 || isNaN(x1) || isNaN(x2) || Math.abs(x2 - x1) < 10) return;

    if (!$originalTimeDomain) $originalTimeDomain = [...$timeScale.domain()];

    $timeScale.domain([$timeScale.invert(x1), $timeScale.invert(x2)]);
    $timeScale = $timeScale;

    resetBrush();
  }

  function handleKeyUp(e) {
    if (e.keyCode === 27) {
      resetTimeDomain();
      return;
    }

    if ($originalTimeDomain !== null && (e.keyCode === 37 || e.keyCode == 39)) {
      const prevDomain = [...$timeScale.domain()];
      const diff = Math.floor(0.25 * (prevDomain[1] - prevDomain[0]));
      if (e.keyCode === 37) {
        $timeScale.domain([
          new Date(prevDomain[0] - diff),
          new Date(prevDomain[1] - diff),
        ]);
      } else if (e.keyCode === 39) {
        $timeScale.domain([
          new Date(prevDomain[0] - -diff),
          new Date(prevDomain[1] - -diff),
        ]);
      }
      $timeScale = $timeScale;
    }
  }

  function handleResetButtonClick() {
    resetTimeDomain();
  }

  onMount(() => {
    resetBrush();
  });
</script>

<svelte:window on:keyup={handleKeyUp} />

<g class="brush disable-select">
  <rect
    class="brush-area"
    class:invisible
    {x}
    y={$panelHeight - 40}
    {width}
    height={80}
    rx="3"
    ry="3"
  />
  <rect
    class="brush-catcher"
    x={fx}
    y={$panelHeight - 40}
    width={fWidth}
    height={fHeight}
    use:brushable
    on:brushstart={handleBrushStart}
    on:brush={handleBrush}
    on:brushend={handleBrushEnd}
  />
</g>
{#if $originalTimeDomain}
  <g
    class="reset-brush"
    transform="translate({$timeScale.range()[0] -
      ($margin.left - 45)} {$panelHeight + 60})"
    on:click={handleResetButtonClick}
  >
    <rect
      x="-3"
      y="-15"
      width={resetText ? resetText.getComputedTextLength() + 6 : 0}
      height="20"
      rx="3"
      ry="3"
    />
    <text class="disable-select" bind:this={resetText}>Reset time scale</text>
  </g>
{/if}

<style>
  .brush-area {
    visibility: visible;
    fill: var(--prehistoricLightGreen);
    opacity: 0.5;
    pointer-events: none;
  }

  .brush-catcher {
    visibility: hidden;
    fill: black;
    pointer-events: all;
    cursor: ew-resize;
    height: 150px;
  }

  .invisible {
    visibility: hidden;
  }

  .reset-brush {
    cursor: pointer;
  }

  .reset-brush rect {
    fill: var(--prehistoricDarkGreen);
    stroke: var(--prehistoricDarkGreen);
    stroke-width: 0.15rem;
    transition: fill 200ms ease;
  }

  .reset-brush:hover rect {
    fill: var(--bg);
  }

  .reset-brush text {
    font-family: var(--font-02);
    font-size: 0.9rem;
    fill: var(--bg);
    transition: fill 200ms ease;
  }

  .reset-brush:hover text {
    fill: var(--prehistoricDarkGreen);
  }
</style>
