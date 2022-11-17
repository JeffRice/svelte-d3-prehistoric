<script>
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { hovered, selected } from '../stores/eventSelections';
    import { scaleLinear} from "d3";
    import { width, height, panelHeight, mapHeight } from '../stores/dimensions';

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

  function arrangeLabels() {
        var svg = select(".scatter-chart")
    
  var move = 1;
  while(move > 0) {
    move = 0;
    svg.selectAll(".place-label")
       .each(function() {
         var that = this,
             a = this.getBoundingClientRect();
         svg.selectAll(".place-label")
            .each(function() {
              if(this != that) {
                var b = this.getBoundingClientRect();
                if((Math.abs(a.left - b.left) * 2 < (a.width + b.width)) &&
                   (Math.abs(a.top - b.top) * 2 < (a.height + b.height))) {
                  // overlap, move labels
                  var dx = (Math.max(0, a.right - b.left) +
                           Math.min(0, a.left - b.right)) * 0.01,
                      dy = (Math.max(0, a.bottom - b.top) +
                           Math.min(0, a.top - b.bottom)) * 0.02,
                      tt = getTranslation(select(this).attr("transform")),
                      to = getTranslation(select(that).attr("transform"));
                  move += Math.abs(dx) + Math.abs(dy);

                  console.log(this, 'this | that ', that)
                  console.log('to', to)
                  console.log('tt', tt)
                
                  to.translate = [ to[0] + dx, to[1] + dy ];
                  tt.translate = [ tt[0] - dx, tt[1] - dy ];

                  console.log('to', to)
                  console.log('tt', tt)

         //         console.log(totest, '|', tttest)
                  select(this).attr("transform", "translate(" + tt.translate + ")");
                  select(that).attr("transform", "translate(" + to.translate + ")");
                  a = this.getBoundingClientRect();

                  console.log(this, '|', that)
                }
              }
            });
       });
  }
}


</script>  <!--
<g transform="translate(-30 {$tY})">
  
    <rect style="fill: #69b3a2" stroke="black" x={$tX} y={$tY}, width=60 height={2000}></rect>

   
   
   
   
</g>-->

<g transform="translate({$tX} {$tY})" 
on:mouseover={handleEventMouseover}
>
     <circle name={name} hoverName={hoverName} cx="0" cy="0" r="10" stroke={stroke} stroke-width="3" fill="none"
     testy={$tY} testx={$tX}/>
</g>

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

<style>
  .place-label{
    padding: 6px;
  }
</style>
