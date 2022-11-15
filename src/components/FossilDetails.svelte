<script>
  // an event (= balloon + shiny circle)
  import loadData from '../utils/loadData';
  import { fossilDatapoints } from '../stores/elements';
  import { onMount } from "svelte";
  import loadTriassicFossils from '../utils/loadTriassicFossils';
  import loadJurassicFossils from '../utils/loadJurassicFossils';
  import loadCretaceousFossils from '../utils/loadCretaceousFossils';
  import { uniq, sortBy } from 'lodash';
  import {select} from "d3";

  let data, triassicFossilData, jurassicFossilData, cretaceousFossilData;
  let map1, map2, map3, map4, uniqueNames, uniqueCretaceousNames, uniqueTriassicNames, sortedCretaceousNames, sortedJurassicNames, sortedTriassicNames;
  let triassicTracker = [];
  let jurassicFilter, triassicFilter, cretaceousFilter;
  let allNames;

  onMount(async () => {


    // load the dataset and add runtime variables
    data = (await loadData())
            .map((d) => ({
              ...d,
               search: [d.shortTitle, d.shortDescription, d.platforms, d.methods, d.sourceNation, d.source, d.sourceCategory, d.diet].flat().join('__').toLowerCase(),
              show: false
            }));

    // load the dataset and add runtime variables
    
    triassicFossilData = (await loadTriassicFossils())





    // load the dataset and add runtime variables
    jurassicFossilData = (await loadJurassicFossils())

    // load the dataset and add runtime variables
    cretaceousFossilData = (await loadCretaceousFossils())




        })

        $: if (data) {
            console.log('dinoNames: ', data[0].dinoNames)


        }


        $: if ($fossilDatapoints && triassicFossilData && jurassicFossilData && cretaceousFossilData && data) {
            console.log('jurassicFossilData: ', jurassicFossilData)



            uniqueNames = uniq(jurassicFossilData.map((d) => d.name));
            sortedJurassicNames = sortBy(uniqueNames.map((d) => d)).join(' | ');


            
            allNames = data[0].dinoNames

            jurassicFilter = allNames.map((d, i) => 
            
            jurassicFossilData.filter(d => d.name.includes(allNames[i]))
           );

           triassicFilter = allNames.map((d, i) => 
            
            triassicFossilData.filter(d => d.name.includes(allNames[i]))
           );

            uniqueTriassicNames = uniq(triassicFossilData.map((d) => d.name));
            sortedTriassicNames = sortBy(uniqueTriassicNames.map((d) => d)).join(' | ');

           cretaceousFilter = allNames.map((d, i) => 
            
           cretaceousFossilData.filter(d => d.name.includes(allNames[i]))
           );

              uniqueCretaceousNames = uniq(cretaceousFossilData.map((d) => d.name));
              sortedCretaceousNames = sortBy(uniqueCretaceousNames.map((d) => d)).join(' | ');

   //     console.log(sortedCretaceousNames)


     //       uniqueCretaceousNames = sortBy(uniqueCretaceousNames, ['name']);
            
            

             console.log('infoTest: ', jurassicFilter)
        }
        

  if ($fossilDatapoints) {
  //  console.log($fossilDatapoints)


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

  console.log(fossilDatapoints)

let originalEra = 'original' + fossilEra

$fossilDatapoints[fossilEra] = $fossilDatapoints[originalEra];
reDraw();
return $fossilDatapoints;

}

function addDino(dino, fossilEra) {

 console.log('add dino test ', dino)

// let filteredFossils = jurassicFossilData.filter(d => d.name.includes(dino))

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


</script>


<div class="choice-controls">
    <button class="choice-controls-unselectall" on:click|stopPropagation={removeAllFossils}>remove all</button>
    <button class="choice-controls-unselectall" on:click|stopPropagation={addAllFossils}>add all</button>
</div>
<section class="fossil-flex">

{#if (jurassicFilter && cretaceousFilter && triassicFilter && allNames)}

<section class="fossil-wrap">
    <h3 class="Cretaceous">Cretaceous Dinosaur Fossils</h3>
  {#each cretaceousFilter as fossilDatapoint, i}
    {#if (fossilDatapoint.length)}
      <section class="fossil-names">{allNames[i]} ({fossilDatapoint.length})
        <button class="CretaceousButton" on:click={() => addDino(fossilDatapoint, 'cretaceous')}>
            Plot {allNames[i]} fossils
        </button><br />
        <input id="collapsible-Cretaceous-{i}" class="toggle" type="checkbox">
        <label for="collapsible-Cretaceous-{i}" class="lbl-toggle top">View Locations</label>
        <div class="collapsible-content">
      {#each cretaceousFilter[i] as newTest, i}
      <p> Dinosaur Name: {newTest.name}, Coords:({newTest.x}, {newTest.y})</p>
      <p>    Max Age: {newTest.maxAge}, Min Age: {newTest.minAge}</p>
      {/each}
    </div>
      </section>
    {/if}
  {/each}
</section>
<section class="fossil-wrap">
  <h3 class="Jurassic">Jurassic Dinosaur Fossils</h3>
  {#each jurassicFilter as fossilDatapoint, i}
    {#if (fossilDatapoint.length)}
      <section class="fossil-names">{allNames[i]} ({fossilDatapoint.length})
        <button class="JurassicButton" on:click={() => addDino(fossilDatapoint, 'jurassic')}>
            Plot {allNames[i]} fossils
        </button><br />
        <input id="collapsible-Jurassic-{i}" class="toggle" type="checkbox">
        <label for="collapsible-Jurassic-{i}" class="lbl-toggle top">View Locations</label>
        <div class="collapsible-content">
      {#each jurassicFilter[i] as newTest, i}
      <p> Dinosaur Name: {newTest.name}, Coords:({newTest.x}, {newTest.y})</p>
      <p>    Max Age: {newTest.maxAge}, Min Age: {newTest.minAge}</p>
      {/each}
    </div>
      </section>
    {/if}
  {/each}
</section>
<section class="fossil-wrap">
  <h3 class="Triassic">Triassic Dinosaur Fossils</h3>
  {#each triassicFilter as fossilDatapoint, i}
    {#if (fossilDatapoint.length)}
      <section class="fossil-names">{allNames[i]} ({fossilDatapoint.length})
        <button class="TriassicButton" on:click={() => addDino(fossilDatapoint, 'triassic')}>
            Plot {allNames[i]} fossils
        </button><br />
        <input id="collapsible-Triassic-{i}" class="toggle" type="checkbox">
        <label for="collapsible-Triassic-{i}" class="lbl-toggle top">View Locations</label>
        <div class="collapsible-content">
      {#each triassicFilter[i] as newTest, i}
      <p> Dinosaur Name: {newTest.name}, Coords:({newTest.x}, {newTest.y})</p>
      <p>    Max Age: {newTest.maxAge}, Min Age: {newTest.minAge}</p>
      {/each}
    </div>
      </section>
    {/if}
  {/each}
</section>
{/if}
</section>

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





<style>
    .fossil-names{
        padding: 1rem;
    }
    .fossil-wrap{
        padding: 1rem;
    }
    .unique-fossils {
        padding: 1rem;
    }
    .fossil-flex {
        display: flex;
    }
    .Cretaceous {
    color: var(--prehistoricDarkGreen);
    }
    .Jurassic {
    color: #44acc1
    }
    .Triassic {
    color: #6c4870;
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

</style>
