<script>
  // a case tooltip (event = case)
  import { width, panelHeight, controlsHeight } from "../stores/dimensions";
  import { tooltip } from "../stores/eventSelections";
  import { fade, slide } from "svelte/transition";
  import { timeFormat } from "d3";
  import { extractHostname, removeSpace } from "../utils/misc";
  import { textSearchFilter } from "../stores/filters";
  import { images } from "../inputs/dataPaths";

  import EventTooltipCross from "./EventTooltipCross.svelte";

  const offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };
  const contentOffset = -20;

  const attributionTf = timeFormat("%B %d, %Y");
  const activityTf = timeFormat("%B %Y");

  let elem;
  let tWidth, tHeight;
  let side;
  let left, top, contentTop;
  let scrollWrapper;
  let paragraphs;

  let scoreQuestionsExpanded = false;

  function highlight(s) {
    if (!$textSearchFilter || $textSearchFilter === "") return s;
    return s.replace(
      new RegExp($textSearchFilter.toLowerCase().split(" or ").join("|"), "gi"),
      (match) => `<span class="highlighted">${match}</span>`
    );
  }

  $: if (showTooltip) {
    scoreQuestionsExpanded = false;

    side = $width - $tooltip.tp.x < $width / 2 ? "left" : "right";

    top = $tooltip.tp.fy - offset.top;

    // adjust for the difference between mouse hover point and balloon center
    const balloonPos = $tooltip.e.pageY;

    // the regular tooltip offset to the balloon
    contentTop = contentOffset;

    // if the tooltip hits the lower page boundary
    if (
      balloonPos + contentTop + tHeight - window.pageYOffset >
      window.innerHeight
    ) {
      // console.log('lower')
      contentTop -=
        balloonPos + tHeight - window.pageYOffset - window.innerHeight;
    }

    // if the tooltip hits the upper page boundary
    if (balloonPos + contentTop - window.pageYOffset < $controlsHeight) {
      // console.log('upper')
      contentTop -=
        balloonPos + contentTop - window.pageYOffset - $controlsHeight - 50;
    }

    // // if the tooltip hits the upper border of the SVG
    if ($tooltip.tp.fy + contentTop < $controlsHeight) {
      // console.log('border')
      contentTop -= $tooltip.tp.fy + contentTop - $controlsHeight;
    }

    if (side === "left") {
      left = $tooltip.tp.x - tWidth + offset.left;
    } else if (side === "right") {
      left = $tooltip.tp.x - offset.left;
    }

    if (scrollWrapper) scrollWrapper.scrollTo(0, 0);

    // translate tooltip content to html
    let tooltipText = $tooltip.tp.tooltipContent;
    paragraphs = tooltipText.split("<p>");
    let numberOfParagraphs = paragraphs.length;
    //   console.log(paragraphs[0],paragraphs[1],paragraphs[2] );
    //    console.log(numberOfParagraphs);
  }

  $: showTooltip = $tooltip && $tooltip.tp && $tooltip.tp.show;
</script>

{#if showTooltip}
  <div
    class="tooltip"
    style="left: {left}px; top: {top}px;"
    bind:clientWidth={tWidth}
    on:click|stopPropagation
    on:mouseover|stopPropagation
  >
    <EventTooltipCross {tWidth} {offset} {side} />
    <div
      class="mouse-catcher"
      style="width: {tWidth}px;
                 height: {Math.max(
        10,
        Math.abs(contentTop) - $tooltip.tp.rSizeTot + 25
      )}px;
                 position: absolute;
                 top: {contentTop - 10}px;"
    />
    <div
      class="mouse-catcher"
      style="width: {tWidth}px;
                 height: {Math.abs(tHeight - Math.abs(contentTop))}px;
                 position: absolute;
                 top: {$tooltip.tp.rSizeTot + 5}px;"
    />
    <div
      class="content"
      bind:this={elem}
      bind:clientHeight={tHeight}
      style="top: {contentTop}px; margin: 0px {$tooltip.tp.rSizeTot / 3 +
        offset.left}px;"
    >
      <div class="scroll-wrapper" bind:this={scrollWrapper}>
        <div class="title title-bg">
          <section class="era-labels">
            <span class="title-header">{$tooltip.tp.name}</span>

            {#if $tooltip.tp.periodEra === "Cretaceous"}
              <span class="tag-label Cretaceous"> Cretaceous </span>
            {/if}
            {#if $tooltip.tp.periodEra === "Jurassic"}
              <span class="tag-label Jurassic"> Jurassic </span>
            {/if}
            {#if $tooltip.tp.periodEra === "Triassic"}
              <span class="tag-label Triassic"> Triassic </span>
            {/if}
            {#if $tooltip.tp.periodEra === "Paleogene"}
              <span class="tag-label Paleogene"> Paleogene </span>
            {/if}
            {#if $tooltip.tp.periodEra === "Neogene"}
              <span class="tag-label Neogene"> Neogene </span>
            {/if}
            {#if $tooltip.tp.periodEra === "Permian"}
              <span class="tag-label Permian"> Permian </span>
            {/if}
            {#if $tooltip.tp.periodEra === "Carboniferous"}
              <span class="tag-label Carboniferous"> Carboniferous </span>
            {/if}
          </section>

          <div class="title-top">
            <section class="dino-stats">
              <div class="stats-item">
                <span><strong>Length:</strong> {$tooltip.tp.size} ft</span>
              </div>
              <div class="stats-item">
                <span><strong>Weight:</strong> {$tooltip.tp.weight} lbs</span>
              </div>
              <div class="stats-item">
                <span
                  ><strong>Min Date:</strong> {$tooltip.tp.startDate} MYA</span
                >
              </div>
              <div class="stats-item">
                <span><strong>Max Date:</strong> {$tooltip.tp.endDate} MYA</span
                >
              </div>
              <div class="stats-item">
                <span><strong>Diet:</strong> {$tooltip.tp.diet}</span>
              </div>
              <div class="stats-item">
                <span
                  ><strong>Region:</strong>
                  {$tooltip.tp.disinformantNation}</span
                >
              </div>
            </section>
          </div>

          <div class="image">
            <img
              src="{images}{removeSpace($tooltip.tp.name.toLowerCase())}.jpg"
              alt={$tooltip.tp.name}
            />
          </div>
        </div>

        {#if $tooltip.tp.tooltipContent}
          <div class="description">
            {#if $tooltip.tp.periodEra}
              <div class="tt-image">
                <img
                  class="image"
                  src="{images}{$tooltip.tp.periodEra}.jpg"
                  alt={$tooltip.tp.periodEra}
                />
              </div>
            {/if}
            <!-- Just for styling the fist paragraph and image differently-->
            <p>{@html highlight(paragraphs[0])}</p>

            {#each paragraphs as paragraph, i}
              {#if i > 0}
                <div class="image">
                  <img
                    src="{images}{removeSpace(
                      $tooltip.tp.name.toLowerCase()
                    )}{i}.jpg"
                    alt={$tooltip.tp.name}
                  />
                </div>
                <p>{@html highlight(paragraph)}</p>
              {/if}
            {/each}
            {#if $tooltip.tp.extraImage === "yes"}
              <div class="image">
                <img
                  src="{images}{$tooltip.tp.name.toLowerCase()}3.jpg"
                  alt={$tooltip.tp.name}
                />
              </div>
            {/if}
          </div>
        {/if}

        <div class="link">
          Wiki Link:
          <a href={$tooltip.tp.wikiURL} target="_blank" class="no-float"
            >{$tooltip.tp.name}</a
          >
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
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
      0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
      0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
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

  .scroll-wrapper::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  .scroll-wrapper::-webkit-scrollbar:horizontal {
    height: 7px;
  }

  .scroll-wrapper::-webkit-scrollbar:vertical {
    width: 12px;
  }

  .scroll-wrapper::-webkit-scrollbar-thumb {
    background-color: var(--prehistoricDarkGreen);
  }

  .scroll-wrapper > div {
    width: 100%;
    padding: 0.5rem 1rem;
  }

  h2,
  h3 {
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

  .title-header {
    color: var(--text-black);
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
  }

  @media (min-width: 1000px) {
    .title-header {
      font-size: 2.1rem;
    }
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
    color: var(--paleogene);
  }
  .Neogene {
    color: var(--neogene);
  }
  .Permian {
    color: var(--permian);
  }
  .Carboniferous {
    color: var(--carboniferous);
  }

  .tag-label {
    border-radius: 1rem;
    padding: 0.5rem;
    background-color: #577863;
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

  li.card,
  a {
    float: left;
    margin: 0.1rem 0.2rem 0.1rem 0;
    padding: 0.1rem 0.3rem;
    font-size: 0.8rem;
    color: var(--text-black);
    border: none;
    border-radius: 0.2rem;
    background-color: var(--prehistoricGreen);
    cursor: pointer;
    user-select: none;
    transition: background-color 200ms ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07);
  }

  .size ul {
    display: flex;
  }

  a {
    text-decoration: none;
  }

  a:hover,
  li.card:hover {
    background-color: var(--prehistoricLightGreen);
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

  .dino-stats {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 0.3rem;
    flex-direction: column;
    align-items: center;
    grid-template-rows: repeat(2, 1fr);
    margin-left: 16px;
    margin-bottom: 16px;
  }

  .era-labels {
    margin-bottom: 1rem;
  }

  .stats-item {
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
