<script>
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';

    export let x;
    export let y;

    const tX = tweened(null, { duration: 800, easing: cubicOut });
    const tY = tweened(null, { duration: 600, easing: cubicOut });

    $: tX.set(x);
    $: tY.set(y);
</script>
<g transform="translate(-30 {$tY})">
    <!--
    <rect style="fill: #69b3a2" stroke="black" x={$tX} y={$tY}, width=60 height={2000}></rect>

   -->
   
   
   
</g>

<g transform="translate({$tX} {$tY})">
     <circle cx="0" cy="0" r="10" />

</g>
