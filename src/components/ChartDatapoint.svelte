<script>
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { hovered, selected } from '../stores/eventSelections';
    import { scaleLinear} from "d3"

    export let x;
    export let y;
    export let name;
    export let hoverName;
    export let stroke;

    const tX = tweened(null, { duration: 800, easing: cubicOut });
    const tY = tweened(null, { duration: 600, easing: cubicOut });

    $: tX.set(x);
    $: tY.set(y);

  function handleEventMouseover(event) {
    console.log('event:', event)
    console.log('event.target: ', event.target)

    $hovered = event.detail;
  }

  function handleEventClick(event) {


    const obj = event.detail;
    if ($selected.map((d) => d.id).includes(obj.id)) {
      selected.remove(obj);
    } else {
      selected.add(obj);
    }
  }


</script>  <!--
<g transform="translate(-30 {$tY})">
  
    <rect style="fill: #69b3a2" stroke="black" x={$tX} y={$tY}, width=60 height={2000}></rect>

   
   
   
   
</g>-->

<g transform="translate({$tX} {$tY})" 
on:click={handleEventClick}
on:mouseover={handleEventMouseover}
>
     <circle name={name} hoverName={hoverName} cx="0" cy="0" r="10" stroke={stroke} stroke-width="3" fill="none"
     testy={$tY}/>

{#if (name !== undefined)}
     <!-- label-->
     <g class="centroid-name-label" transform="translate(10 -20) rotate(-20)">
        <text style="transition: opacity 600ms ease;">{name}</text>
     </g>
{/if}
</g>

