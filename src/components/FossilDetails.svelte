<script>
  // an event (= balloon + shiny circle)
  import loadData from '../utils/loadData';
  import { fossilDatapoints } from '../stores/elements';
  import { onMount } from "svelte";
  import { uniq, sortBy } from 'lodash';
  import {select} from "d3";

  let data;
  let uniqueNames, uniqueCretaceousNames, uniqueTriassicNames, sortedCretaceousNames, sortedJurassicNames, sortedTriassicNames;
  let sortedCretaceousFilter, sortedJurassicFilter, sortedTriassicFilter;
  let jurassicFilter, triassicFilter, cretaceousFilter;
  let allNames;

  onMount(async () => {

    // load the dataset and add runtime variables
    data = (await loadData())
            .map((d) => ({
              ...d
            }));
        })

$: if ($fossilDatapoints && $fossilDatapoints.originaltriassic && $fossilDatapoints.originaljurassic && $fossilDatapoints.originalcretaceous && data) {



          allNames = data[0].dinoNames
          uniqueNames = uniq($fossilDatapoints.originaljurassic.map((d) => d.name));
          sortedJurassicNames = sortBy(uniqueNames.map((d) => d)).join(' | ');


          jurassicFilter = allNames.map((d, i) => 
          [allNames[i],
          $fossilDatapoints.originaljurassic.filter(d =>    d.name.includes(allNames[i]))]
          );
          sortedJurassicFilter = sortBy(jurassicFilter, [function(d) { return d[1]; }]).reverse();
             

          triassicFilter = allNames.map((d, i) => 
          [allNames[i],
          $fossilDatapoints.originaltriassic.filter(d => d.name.includes(allNames[i]))]
          );

          sortedTriassicFilter = sortBy(triassicFilter, [function(d) { return d[1]; }]).reverse();
          uniqueTriassicNames = uniq($fossilDatapoints.originaltriassic.map((d) => d.name));
          sortedTriassicNames = sortBy(uniqueTriassicNames.map((d) => d)).join(' | ');

          cretaceousFilter = allNames.map((d, i) => 
          [allNames[i],
          $fossilDatapoints.originalcretaceous.filter(d => d.name.includes(allNames[i]))]
          );

          sortedCretaceousFilter = sortBy(cretaceousFilter, [function(d) { return d[1]; }]).reverse();
          uniqueCretaceousNames = uniq($fossilDatapoints.originalcretaceous.map((d) => d.name));
          sortedCretaceousNames = sortBy(uniqueCretaceousNames.map((d) => d)).join(' | ');

        }
    

function removeAllFossils() {

$fossilDatapoints['cretaceous'] = [];
$fossilDatapoints['triassic'] = [];
$fossilDatapoints['jurassic'] = [];

reDraw();
return $fossilDatapoints;

}

function addAllFossils() {

  addFossils('cretaceous');
  addFossils('triassic');
  addFossils('jurassic');

}

function addFossils(fossilEra) {


let originalEra = 'original' + fossilEra

$fossilDatapoints[fossilEra] = $fossilDatapoints[originalEra];
reDraw();
return $fossilDatapoints;

}

function addDino(dino, fossilEra) { 
  
  removeAllFossils()
  reDraw();
  
  $fossilDatapoints[fossilEra] = dino;
  reDraw();
  return $fossilDatapoints;

}



  function reDraw() {

  let locations = select('#points');
  var elements = locations.selectAll("points.arc");

  elements.each(function(d, i) {
  var node = select(this);
  this.remove();

  })

}

function showMoreDetails () {
  let section = document.getElementById("fossil-flex");
  section.style.height = '100%';

  let showButton = document.getElementById("flex-show");
  showButton.remove();
}


</script>


<div class="choice-controls">
  Dinosaur Fossil Sites:<br />
    <button class="choice-controls-unselectall" on:click|stopPropagation={removeAllFossils}>remove all</button>
    <button class="choice-controls-unselectall" on:click|stopPropagation={addAllFossils}>add all</button>
</div>
<section id="fossil-flex">
{#if (sortedCretaceousFilter && sortedTriassicFilter && sortedJurassicFilter)}

<section class="fossil-wrap">
    <h3 class="Cretaceous">Cretaceous Dinosaur Fossils</h3>
  {#each sortedCretaceousFilter as fossilDatapoint, i}
    {#if (fossilDatapoint[1].length)}
      <section class="fossil-names">{fossilDatapoint[0]} ({fossilDatapoint[1].length})<br />
        <button class="CretaceousButton" on:click={() => addDino(fossilDatapoint[1], 'cretaceous')}>
            Plot {fossilDatapoint[0]} fossils
        </button><br />
        <input id="collapsible-Cretaceous-{i}" class="toggle" type="checkbox">
        <label for="collapsible-Cretaceous-{i}" class="lbl-toggle top">View Locations</label>
        <div class="collapsible-content">
      {#each fossilDatapoint[1] as newTest, i}
      <p> Dinosaur Name: {newTest.name}, Coords:({newTest.x}, {newTest.y})</p>
      <p>    Max Age: {newTest.maxAge}, Min Age: {newTest.minAge}</p>
      <hr />
      {/each}
    </div>
      </section>
    {/if}
  {/each}
</section>
<section class="fossil-wrap">
  <h3 class="Jurassic">Jurassic Dinosaur Fossils</h3>
  {#each sortedJurassicFilter as fossilDatapoint, i}
    {#if (fossilDatapoint[1].length)}
      <section class="fossil-names">{fossilDatapoint[0]} ({fossilDatapoint[1].length})<br />
        <button class="JurassicButton" on:click={() => addDino(fossilDatapoint[1], 'jurassic')}>
            Plot {fossilDatapoint[0]} fossils
        </button><br />
        <input id="collapsible-Jurassic-{i}" class="toggle" type="checkbox">
        <label for="collapsible-Jurassic-{i}" class="lbl-toggle top">View Locations</label>
        <div class="collapsible-content">
      {#each fossilDatapoint[1] as newTest, i}
      <p> Dinosaur Name: {newTest.name}, Coords:({newTest.x}, {newTest.y})</p>
      <p>    Max Age: {newTest.maxAge}, Min Age: {newTest.minAge}</p>
      <hr />
      {/each}
    </div>
      </section>
    {/if}
  {/each}
</section>
<section class="fossil-wrap">
  <h3 class="Triassic">Triassic Dinosaur Fossils</h3>
  {#each sortedTriassicFilter as fossilDatapoint, i}
  {#if (fossilDatapoint[1].length)}
  <section class="fossil-names">{fossilDatapoint[0]} ({fossilDatapoint[1].length})<br />
        <button class="TriassicButton" on:click={() => addDino(fossilDatapoint[1], 'triassic')}>
            Plot {fossilDatapoint[0]} fossils
        </button><br />
        <input id="collapsible-Triassic-{i}" class="toggle" type="checkbox">
        <label for="collapsible-Triassic-{i}" class="lbl-toggle top">View Locations</label>
        <div class="collapsible-content">
        {#each fossilDatapoint[1] as newTest, i}
      <p> Dinosaur Name: {newTest.name}, Coords:({newTest.x}, {newTest.y})</p>
      <p>    Max Age: {newTest.maxAge}, Min Age: {newTest.minAge}</p>
      <hr />
      {/each}
    </div>
      </section>
    {/if}
  {/each}
</section>
{/if}

</section>

<button 
on:click|stopPropagation={showMoreDetails}
id="flex-show">Fossils Continued... <i class="arrow down"></i></button>

{#if (sortedCretaceousNames && sortedJurassicNames && sortedTriassicNames)}

<section class="unique-fossils">

  <section class="fossil-wrap">
    <h3 class="Cretaceous">Unique Cretaceous Dinosaur Names ({uniqueCretaceousNames.length})</h3>
    <input id="collapsible-Cretaceous-unique" class="toggle" type="checkbox">
    <label for="collapsible-Cretaceous-unique" class="lbl-toggle top">View All Fossil Names</label>
    <div class="collapsible-content">
    {sortedCretaceousNames}
    </div>
  </section>
  
  <section class="fossil-wrap">
    <h3 class="Jurassic">Unique Jurassic Dinosaur Names ({uniqueNames.length})</h3>
    <input id="collapsible-Jurassic-unique" class="toggle" type="checkbox">
    <label for="collapsible-Jurassic-unique" class="lbl-toggle top">View All Fossil Names</label>
    <div class="collapsible-content">
    {sortedJurassicNames}
    </div>
  </section>
  
  
  <section class="fossil-wrap">
    <h3 class="Triassic">Unique Triassic Dinosaur Names ({uniqueTriassicNames.length})</h3>
    <input id="collapsible-Triassic-unique" class="toggle" type="checkbox">
    <label for="collapsible-Triassic-unique" class="lbl-toggle top">View All Fossil Names</label>
    <div class="collapsible-content">
    {sortedTriassicNames}
    </div>
  </section>

</section>

{/if}
<div class="separator thicker"></div>




<style>

    section {
        text-align: center;
    }
    .fossil-names{
        padding: 1rem;
    }
    .fossil-wrap{
        padding: 1rem;
    }
    .unique-fossils {
        padding: 1rem;
    }
    #fossil-flex {
        display: flex;
        height: 550px;
        overflow: hidden;
    }
    .Cretaceous {
    color: var(--prehistoricDarkGreen);
    text-decoration: underline;
    }
    .Jurassic {
    color: #44acc1;
    text-decoration: underline;
    }
    .Triassic {
    color: #6c4870;
    text-decoration: underline;
    }
    button {
    align-self: flex-end;
    min-width: 100px;
    height: 1.7rem;
    max-height: 1.7rem;
    margin: 0.3rem 0.3rem 0;
    padding: 0.1rem 0.3rem;
    font-family: var(--font-02);
    font-size: .8rem;
    font-weight: 400;
    line-height: 1.3rem;
    border-radius: 3px;
    outline: none;
    overflow: hidden;
    transition: all .2s ease;
    }

    .choice-controls{
      font-family: var(--font-02);
    }


    .CretaceousButton {
    color: var(--prehistoricDarkGreen);
    background-color: var(--bg);
    border: 2px solid var(--prehistoricGreen);
    }

    .CretaceousButton:hover {
    color: var(--bg);
    background-color: var(--prehistoricGreen);
    cursor: pointer;
  }

  .JurassicButton {
    color: #44acc1;
    background-color: var(--bg);
    border: 2px solid #44acc1;
    }

    .JurassicButton:hover {
    color: var(--bg);
    background-color: #44acc1;
    cursor: pointer;
  }

  .TriassicButton {
    color: #6c4870;
    background-color: var(--bg);
    border: 2px solid #6c4870;
    }

    .TriassicButton:hover {
    color: var(--bg);
    background-color: #6c4870;
    cursor: pointer;
  }

  .arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

</style>
