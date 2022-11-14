<script>
  // an event (= balloon + shiny circle)
  import loadData from '../utils/loadData';
  import { fossilDatapoints } from '../stores/elements';
  import { onMount } from "svelte";
  import loadTriassicFossils from '../utils/loadTriassicFossils';
  import loadJurassicFossils from '../utils/loadJurassicFossils';
  import loadCretaceousFossils from '../utils/loadCretaceousFossils';
  import { uniq } from 'lodash';
  import {select} from "d3";

  let data, triassicFossilData, jurassicFossilData, cretaceousFossilData;
  let map1, map2, map3, map4, uniqueNames, uniqueCretaceousNames, uniqueTriassicNames;
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
            map2 = jurassicFossilData.filter(d => d.name.includes(''));
            console.log('jurassicFossilData mapped: ', map2)




            uniqueNames = uniq(map2.map((d) => d.name)).join(' | ');


            
            allNames = data[0].dinoNames

            jurassicFilter = allNames.map((d, i) => 
            
            jurassicFossilData.filter(d => d.name.includes(allNames[i]))
           );

           triassicFilter = allNames.map((d, i) => 
            
            triassicFossilData.filter(d => d.name.includes(allNames[i]))
           );
            map3 = triassicFossilData.filter(d => d.name.includes(''));
            uniqueTriassicNames = uniq(map3.map((d) => d.name)).join(' | ');

           cretaceousFilter = allNames.map((d, i) => 
            
           cretaceousFossilData.filter(d => d.name.includes(allNames[i]))
           );
           map4 = cretaceousFossilData.filter(d => d.name.includes(''));
            uniqueCretaceousNames = uniq(map4.map((d) => d.name)).join(' | ');


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
{#if (map1)}

  <h3>Triassic Dinosaur Fossils</h3>
  {#each map1 as fossilDatapoint}
    <span>{fossilDatapoint.name}</span>
  {/each}

{/if}

{#if (jurassicFilter && cretaceousFilter && triassicFilter && allNames)}

<section class="fossil-wrap">
    <h3 class="Cretaceous">Cretaceous Dinosaur Fossils</h3>
  {#each cretaceousFilter as fossilDatapoint, i}
    {#if (fossilDatapoint.length)}
      <section class="fossil-names">{allNames[i]} ({fossilDatapoint.length})
        <button on:click={() => addDino(fossilDatapoint, 'cretaceous')}>
            Find {allNames[i]} fossils
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
        <button on:click={() => addDino(fossilDatapoint, 'jurassic')}>
            Find {allNames[i]} fossils
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
        <button on:click={() => addDino(fossilDatapoint, 'triassic')}>
            Find {allNames[i]} fossils
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

{#if (map2)}


<h3>Unique Cretaceous Dinosaur Fossils</h3>
{uniqueCretaceousNames}

<h3>Unique Jurassic Dinosaur Fossils</h3>
{uniqueNames}

<h3>Unique Triassic Dinosaur Fossils</h3>
{uniqueTriassicNames}


<!--
    <h3>All Jurassic Dinosaur Fossils</h3>
  {#each map2 as fossilDatapoint}
 
    <span>{fossilDatapoint.name}</span>

  {/each}
-->

{/if}





<style>
    .fossil-names{
        padding: 1rem;
    }
    .fossil-wrap{
        padding: 1rem;
    }
    .fossil-flex {
        display: flex;
    }
    .Cretaceous {
    color: #486848;
    }
    .Jurassic {
    color: #2d7381;
    }
    .Triassic {
    color: #6c4870;
    }
</style>
