<script>
  // an event (= balloon + shiny circle)
  import loadData from '../utils/loadData';
  import { fossilDatapoints } from '../stores/elements';
  import { onMount } from "svelte";
  import loadTriassicFossils from '../utils/loadTriassicFossils';
  import loadJurassicFossils from '../utils/loadJurassicFossils';
  import { uniq } from 'lodash';

  let data, triassicFossilData, jurassicFossilData;
  let map1, map2, uniqueNames;
  let triassicTracker = [];
  let infoTest;
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




        })

        $: if (data) {
            console.log('dinoNames: ', data[0].dinoNames)


        }


        $: if ($fossilDatapoints.originaltriassic && triassicFossilData) {

            

            console.log('triassicFossilData: ', triassicFossilData)
            map1 = triassicFossilData.filter(d => d.name.includes('Plateosaurus'));
            console.log('map1: ', map1)
        }

        $: if ($fossilDatapoints.originaljurassic && jurassicFossilData && data) {
            console.log('jurassicFossilData: ', jurassicFossilData)
            map2 = jurassicFossilData.filter(d => d.name.includes(''));
            console.log('jurassicFossilData mapped: ', map2)




            uniqueNames = uniq(map2.map((d) => d.name)).join(' | ');

            
            allNames = data[0].dinoNames

             infoTest = allNames.map((d, i) => 
            
              jurassicFossilData.filter(d => d.name.includes(allNames[i]))
             );
             console.log('infoTest: ', infoTest)
        }
        

  if ($fossilDatapoints) {
  //  console.log($fossilDatapoints)


  }



</script>

{#if (map1)}

  <h3>Triassic Dinosaur Fossils</h3>
  {#each map1 as fossilDatapoint}
    <span>{fossilDatapoint.name}</span>
  {/each}

{/if}

{#if (infoTest && allNames)}

    <h3>Infotest Jurassic Dinosaur Fossils</h3>
  {#each infoTest as fossilDatapoint, i}
    {#if (fossilDatapoint.length)}
      <section class="fossil-names">{allNames[i]} ({fossilDatapoint.length})
      {#each infoTest[i] as newTest, i}
      <p> Dinosaur Name: {newTest.name}, Coords:({newTest.x}, {newTest.y})</p>
      <p>    Max Age: {newTest.maxAge}, Min Age: {newTest.minAge}</p>
      {/each}
      </section>
    {/if}
  {/each}

  <h3>Jurassic Dinosaur Fossils</h3>
  {uniqueNames}
{/if}


{#if (map2)}

    <h3>Jurassic Dinosaur Fossils</h3>
  {#each map2 as fossilDatapoint}
 
    <span>{fossilDatapoint.name}</span>

  {/each}

  <h3>Jurassic Dinosaur Fossils</h3>
  {uniqueNames}
{/if}




<style>
    .fossil-names{
        float: left;
    }
</style>
