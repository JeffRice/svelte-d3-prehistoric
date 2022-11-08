<script>
  import {
    highlightPolarization,
    highlightCib,
    controlsFilter,
    polarizationFilter,
    polarizationDef } from '../stores/filters';
  import { polarizationScale } from '../stores/scales';
  import { copytooltipable } from '../actions/copytooltipable';

  import Checkbox from './Checkbox.svelte';
  import Slider from './Slider.svelte';

  function handleClick() {
        $controlsFilter = !$controlsFilter;
  }
</script>

<ul class="checkboxpanel-wrapper">
  <li>
    <Checkbox id="checkboxpanel-checkbox-controlsFilter"
              checked={$controlsFilter}
              on:click={handleClick}
             >
      <span use:copytooltipable={{content: 'Toggles filter visibility.', showClickMessage: false}}
            style="white-space: nowrap;">
        Show/Hide Filters
      </span>
    </Checkbox>
  </li>
  <!-- <li>
    <Checkbox id="checkboxpanel-checkbox-cib"
              checked={$highlightCib}
              on:click={() => handleClick('cib')}>
      <span use:copytooltipable={{content: 'Some content', showClickMessage: false}}>CIB data filter</span>
    </Checkbox>
  </li> -->
</ul>

<style>
  ul {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0.1rem 0 0.1rem -0.2rem;
    list-style-type: none;
  }

  li {
    position: relative;
  }

  li.polarization-slider {
    margin-bottom: 0.05rem;
  }

  span {
    display: inline-block;
    margin: 2% 0 0 0.5rem;
    font-family: var(--font-02);
    font-size: 0.8rem;
    color: var(--usa-blue);
  }

  .hide {
    visibility: hidden;
  }
</style>
