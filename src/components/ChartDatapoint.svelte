<script>
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { hovered, selected } from '../stores/eventSelections';
    import { width, height, panelHeight, mapHeight } from '../stores/dimensions';


    export let x;
    export let y;
    export let name;
    export let hoverName;
    export let stroke;
    export let weight;
    export let size;

    const tX = tweened(null, { duration: 0, easing: cubicOut });
    const tY = tweened(null, { duration: 0, easing: cubicOut });

    $: tX.set(x);
    $: tY.set(y);


  function handleEventMouseover(event) {


    //reset popup content for each datapoint
    let mypopup = document.getElementById("mypopup");
    mypopup.innerHTML = '';


    // to account for the area that is expndable
    let topContentHeight = document.getElementById("expand-content")

    // to adjust for responsive text size changes
    let adjust = 277;

    console.log($width)

// place on right for left half of screen
if (x <= ($width/2)){
mypopup.className="mypopup"
mypopup.style.left = ((event.target.getBoundingClientRect().x) + 20 ) + 'px';
mypopup.style.top = ((window.scrollY + event.target.getBoundingClientRect().y) - topContentHeight.offsetHeight - adjust) + 'px';

}

// place tooltip on left for right half of screen
else {
mypopup.className="popup-right"
mypopup.style.left = ((event.target.getBoundingClientRect().x) - 300 ) + 'px';
mypopup.style.top = ((window.scrollY + event.target.getBoundingClientRect().y) - topContentHeight.offsetHeight - adjust) + 'px';     

}










    //create popup content and append
    let div = document.createElement("div");
    div.innerHTML =

    '<span style="color:' + stroke + ';"><h2>' + hoverName + '</h2><hr class="popup-break" />\n' + 
    '<b>Max Size:</b> ' + size + ' ft <br />\n' + 
    '<b>Max Weight:</b> ' + weight + ' lbs</span>' 

      mypopup.appendChild(div);
      mypopup.style.display = "block";

      // fill color 
      event.target.attributes.fill.value = stroke;


  }

  function handleEventMouseout(event) {
    let mypopup = document.getElementById("mypopup");
    mypopup.style.display = "none";

       // reset fill color 
       event.target.attributes.fill.value = "none";
  }

</script>  


<g transform="translate({$tX} {$tY})" 
on:mouseover={handleEventMouseover}
on:mouseout={handleEventMouseout}
>

       <circle name={name} hoverName={hoverName} cx="0" cy="0" r="10" stroke={stroke} stroke-width="2.5" fill="none"
       testy={$tY} testx={$tX} class="chart-g" id="chart-{hoverName}"/>
  
</g>



{#if (name)}
  {#if (x <= ($width/2))}
       <!-- label-->
       <g class="centroid-name-label place-label" transform="translate({$tX + 10} {$tY - 20})">
          <text class="chart-text" fill={stroke} style="transition: opacity 600ms ease;">{hoverName}</text>
       </g>
  {/if}
  
  {#if (x > ($width/2))}
       <!-- label-->
       <g class="centroid-name-label place-label" transform="translate({$tX - 100} {$tY - 20})">
          <text class="chart-text" fill={stroke} style="transition: opacity 600ms ease;">{hoverName}</text>
       </g>
  {/if}
{/if}



<style>
  .place-label{
    padding: 6px;
  }
  .chart-g{
    position: absolute;
    z-index: 9999;
    pointer-events: all;
  }
  .chart-text{
    position: absolute;
    z-index: -1;
    pointer-events: none;
  }
</style>
