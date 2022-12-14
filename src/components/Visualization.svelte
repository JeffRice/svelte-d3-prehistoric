<script>
  // the visualization wrapper
  // also holds the logic for the force-directed graph simulation
  // also holds filter=>event logic
  // also holds base data loading logic
  import { onMount } from "svelte";
  import loadData from "../utils/loadData";
  import loadMapData from "../utils/loadMapData";
  import loadPangeaData from "../utils/loadPangeaData";
  import { setScales } from "../utils/scales";
  import {
    width,
    height,
    panelHeight,
    minDim,
    maxDim,
    margin,
    controlsHeight,
  } from "../stores/dimensions";
  import {
    timeScale,
    sizeTotalYScale,
    sizeTotalRScale,
  } from "../stores/scales";
  import {
    disinformantNationFilter,
    platformFilter,
    timeperiodFilter,
    sourceFilter,
    dietFilter,
    textSearchFilter,
    originalTimeDomain,
    contextData,
    tagFilter,
  } from "../stores/filters";
  import {
    haveOverlap,
    includesTextSearch,
    preloadImages,
  } from "../utils/misc";
  import { selected } from "../stores/eventSelections";
  import { drawWrapper, fossilDatapoints } from "../stores/elements";

  import { uniq } from "lodash";
  import {
    extent,
    forceSimulation,
    forceX,
    forceY,
    forceManyBody,
    forceCenter,
    forceCollide,
    timeFormat,
  } from "d3";
  import { sortConsistently } from "../utils/misc";
  import { parseUrl } from "../utils/share";

  import ToTop from "./ToTop.svelte";
  import TopVisualContent from "./TopVisualContent.svelte";
  import LoadingInfo from "./LoadingInfo.svelte";
  import Controls from "./Controls.svelte";
  import Svg from "./Svg.svelte";
  import Canvas from "./Canvas.svelte";
  import Info from "./Info.svelte";
  import EventTooltip from "./EventTooltip.svelte";
  import CentroidTooltip from "./CentroidTooltip.svelte";
  import Table from "./Table.svelte";
  import FossilDetails from "./FossilDetails.svelte";
  import ChartWrapper from "./ChartWrapper.svelte";

  const tf = timeFormat("%B %d, %Y");
  const observeDays = 3;

  let data, timePoints;

  onMount(async () => {
    // load the dataset and add runtime variables
    data = (await loadData()).map((d) => ({
      ...d,
      recentlyAdded:
        Math.ceil((new Date() - d.timestamp) / (1000 * 60 * 60 * 24)) <=
        observeDays,
      search: [
        d.name,
        d.timePeriod,
        d.disinformantNation,
        d.tooltipContent,
        d.type,
        d.diet,
      ]
        .flat()
        .join("__")
        .toLowerCase(),
      show: false,
    }));

    // load the map data
    loadMapData();
    loadPangeaData();

    // setup filters
    disinformantNationFilter.init(data, "disinformantNation");
    platformFilter.init(data, "platforms");
    timeperiodFilter.init(data, "periodEra");
    sourceFilter.init(data, "sourceFilter");
    dietFilter.init(data, "diet");
    tagFilter.init(data, "tags");
    preloadImages(data);

    // apply filters from URL
    if (window.location.hash.length > 1) {
      const urlFilters = parseUrl(window.location.hash);
      disinformantNationFilter.applyBoolArray(urlFilters.disinformantNations);
      platformFilter.applyBoolArray(urlFilters.platforms);
      timeperiodFilter.applyBoolArray(urlFilters.methods);
      sourceFilter.applyBoolArray(urlFilters.sources);
      dietFilter.applyBoolArray(urlFilters.diet);
      tagFilter.applyBoolArray(urlFilters.tags);
      contextData.applyBoolArray(urlFilters.contextData);
      $textSearchFilter = urlFilters.textSearch;
    }
  });

  // set the scales
  $: setScales(data, $width, $minDim, $maxDim, $panelHeight, $margin);

  $: if (data) {
    // calculate scaled data points
    const scaledData = data
      .map((d) => {
        return {
          ...d,
          _x: $timeScale(d.testDate),
          _y: $sizeTotalYScale.range()[0],
          //  color: $attributionScoreScale(d.attributionScore),
          size: d.size,
          rSizeTot:
            isNaN(d.size) || d.size === 0
              ? $sizeTotalRScale.range()[0]
              : $sizeTotalRScale(d.size),
          fy: $sizeTotalYScale(Math.max(d.sizeTotal, 6)),
        };
      })
      .sort((a, b) => sortConsistently(a, b, "size", "id"));

    // console.log('scaled data: ', scaledData)

    // for some reason these definitions need to be in here and not in a gobal scope or module
    const simulation = forceSimulation().force(
      "x",
      forceX().x((d) => d._x)
    );

    const simulationCharge = forceSimulation()
      .force(
        "x",
        forceX().x((d) => d._x)
      )
      .force(
        "collide",
        forceCollide()
          .strength(1)
          .radius((d) => $sizeTotalRScale(d.size) * 1)
      );
    //  .force('charge', forceManyBody().strength((d) => -($sizeTotalRScale(d.size) + 10) * 10).distanceMax(500).distanceMin(50));
    simulation.nodes(scaledData).alpha(0.8).tick(300);
    // finally set the global timePoints variable
    simulationCharge
      .nodes(scaledData)
      .alpha(0.8)
      .tick(300)
      .on("end", () => {
        timePoints = scaledData.map((d) => ({
          ...d,
          x: $originalTimeDomain
            ? d.x
            : Math.max(
                $margin.left - (Math.random() * $margin.left) / 4,
                Math.min(
                  $width -
                    $margin.right +
                    ((Math.random() + 2) * $margin.right) / 4,
                  d.x
                )
              ),
        }));
      });
  }

  // translate filter values into show property state
  $: if (timePoints) {
    timePoints = timePoints.map((d) => ({
      ...d,
      show:
        haveOverlap($disinformantNationFilter, d.disinformantNation) &&
        haveOverlap($timeperiodFilter, d.periodEra) &&
        haveOverlap($dietFilter, d.diet) &&
        includesTextSearch($textSearchFilter, d.search),
    }));
  }
</script>

<ToTop />
<TopVisualContent {data} />
<div id="viz" class="visualization-wrapper" bind:clientWidth={$width}>
  {#if !timePoints}
    <LoadingInfo />
  {/if}
  <div class="sticky-wrapper">
    <div class="controls-wrapper" bind:clientHeight={$controlsHeight}>
      <Controls {timePoints} />
    </div>
    <div
      class="draw-wrapper"
      bind:this={$drawWrapper}
      bind:clientHeight={$height}
    >
      {#if timePoints}
        <Svg {timePoints} />
        <Canvas />
        <Info
          selectedItems={$selected}
          x={2 * $timeScale.range()[0]}
          y={$sizeTotalYScale.range()[1]}
        />
        <EventTooltip />
        <CentroidTooltip />
      {/if}
    </div>
  </div>
  {#if $fossilDatapoints}
    <div class="fossil-wrapper">
      <FossilDetails />
    </div>
  {/if}
  <div class="chart-wrapper">
    <ChartWrapper />
  </div>

  <div class="table-wrapper">
    <Table {timePoints} />
  </div>
  <div />
</div>

<style>
  .visualization-wrapper {
    width: 100%;
    position: relative;
  }

  .controls-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0.5rem 0.5rem 0.5rem;
    position: relative;
    pointer-events: none;
  }

  .sticky-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 180vmin;
    min-height: 1200px;
    max-height: 100vmax;
    margin: 0 0 0 0;
    position: relative;
  }

  .draw-wrapper {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  @media (min-width: 1350px) {
    .controls-wrapper {
      position: sticky;
      top: 0px;
      z-index: 2000;
    }

    .draw-wrapper {
      position: absolute;
      top: 0;
      z-index: 0;
    }
  }

  .table-wrapper {
    width: 100%;
    margin: 2rem 0;
    padding: 0.2rem 1rem;
  }

  .chart-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
</style>
