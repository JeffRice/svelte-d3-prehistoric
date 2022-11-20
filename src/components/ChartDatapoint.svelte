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

    const tX = tweened(null, { duration: 0, easing: cubicOut });
    const tY = tweened(null, { duration: 0, easing: cubicOut });

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




</script>  
<g transform="translate({$tX} {$tY})" 
on:mouseover={handleEventMouseover}
>
     <circle name={name} hoverName={hoverName} cx="0" cy="0" r="10" stroke={stroke} stroke-width="3" fill="none"
     testy={$tY} testx={$tX}/>
</g>


{#if (name)}
{#if (x <= ($width/2))}
     <!-- label-->
     <g class="centroid-name-label place-label" transform="translate({$tX + 10} {$tY - 20})">
        <text style="transition: opacity 600ms ease;">{hoverName}</text>
     </g>
{/if}

{#if (x > ($width/2))}
     <!-- label-->
     <g class="centroid-name-label place-label" transform="translate({$tX - 100} {$tY - 20})">
        <text style="transition: opacity 600ms ease;">{hoverName}</text>
     </g>
{/if}
{/if}

<style>
  .place-label{
    padding: 6px;
  }
</style>
