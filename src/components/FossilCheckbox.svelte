<script>
  // custom checkbox
  export let id;
  export let checked = false;
  export let fossilera = "";
  export let added = "";
</script>

<input
  type="checkbox-{fossilera}"
  id="checkbox-{id}"
  class:checked
  {fossilera}
  {added}
  on:click|stopPropagation
/>
<label for="checkbox-{id}" class="choice-entry-name">
  <slot />
</label>

<style>
  label {
    display: inline-block;
    width: 100%;
    padding-left: 1.5rem;
    cursor: pointer;
    pointer-events: all;
  }

  input[type="checkbox-jurassic"] {
    display: none;
    pointer-events: all;
  }

  input[type="checkbox-jurassic"] + label::before {
    display: block;
    width: 15px;
    height: 15px;
    margin-top: 3px;
    margin-right: 0.4rem;
    border: 2px solid var(--jurassic);
    border-radius: 3px;
    background-color: var(--bg);
    content: "";
    position: absolute;
    left: 0.5rem;
  }

  input[type="checkbox-jurassic"].checked + label::before {
    box-shadow: inset 0px 0px 0px 3px var(--bg);
    background-color: var(--jurassic);
  }

  input[type="checkbox-cretaceous"] {
    display: none;
    pointer-events: all;
  }

  input[type="checkbox-cretaceous"] + label::before {
    display: block;
    width: 15px;
    height: 15px;
    margin-top: 3px;
    margin-right: 0.4rem;
    border: 2px solid var(--cretaceous);
    border-radius: 3px;
    background-color: var(--bg);
    content: "";
    position: absolute;
    left: 0.5rem;
  }

  input[type="checkbox-cretaceous"].checked + label::before {
    box-shadow: inset 0px 0px 0px 3px var(--bg);
    background-color: var(--cretaceous);
  }

  input[type="checkbox-triassic"] {
    display: none;
    pointer-events: all;
  }

  input[type="checkbox-triassic"] + label::before {
    display: block;
    width: 15px;
    height: 15px;
    margin-top: 3px;
    margin-right: 0.4rem;
    border: 2px solid var(--triassic);
    border-radius: 3px;
    background-color: var(--bg);
    content: "";
    position: absolute;
    left: 0.5rem;
  }

  input[type="checkbox-triassic"].checked + label::before {
    box-shadow: inset 0px 0px 0px 3px var(--bg);
    background-color: var(--triassic);
  }
</style>
