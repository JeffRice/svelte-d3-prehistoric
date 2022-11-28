<script>
  import { controlsFilter } from '../stores/filters';
  import { copytooltipable } from '../actions/copytooltipable';

  import Checkbox from './Checkbox.svelte';


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
        Toggle Filters
      </span>
    </Checkbox>
  </li>
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


  span {
    display: inline-block;
    margin: 2% 0 0 0.5rem;
    font-family: var(--font-02);
    font-size: 0.8rem;
    color: var(--prehistoricDarkGreen);
  }

  .hide {
    visibility: hidden;
  }
</style>
