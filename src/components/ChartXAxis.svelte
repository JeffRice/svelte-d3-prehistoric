<script>
    export let scale;
    export let y;

    const textOffset = 25;

    $: x0 = scale.range()[0];
    $: x1 = scale.range()[1];

    $: ticks = scale.ticks();
</script>

<g class="axis">
    <line x1={x0} y1={y} x2={x1} y2={y} />
    <text 
    class="label"
    transform="translate({(x0 + x1)/2} {y + 50})"
        >Max Size (Feet)</text>

    <g class="ticks">
        {#each ticks as tick}
            <g
                class="tick"
                transform="translate({scale(tick)} {y + textOffset})"
            >
                <text>
                    {tick}
                </text>
            </g>
        {/each}
    </g>
</g>




<style>
    line {
        stroke: gray;
        stroke-width: 2;
        stroke-linecap: round;
    }

    text {
        fill: gray;
        text-anchor: middle;
        font-size: 18px;
    }

    .label {
        font-size: 20px;   
        text-decoration: underline;
    }
</style>
