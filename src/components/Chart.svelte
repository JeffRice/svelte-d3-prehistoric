<script>
    import { scaleLinear } from 'd3';

    import ChartXAxis from './ChartXAxis.svelte';
    import ChartYAxis from './ChartYAxis.svelte';
    import ChartDatapoint from './ChartDatapoint.svelte';

    export let data;
    export let xRange;
    export let yRange;

    const padding = 80;

    let chartWidth;
    let chartHeight;

    $: xScale = scaleLinear()
        .domain(xRange)
        .range([padding, chartWidth - padding]);

    $: yScale = scaleLinear()
        .domain(yRange)
        .range([chartHeight - padding, padding]);

    $: renderedData = data.map((d) => {
        return {
            x: xScale(d.x),
            y: yScale(d.y)
        };
    });
</script>

<div class="chart" bind:clientWidth={chartWidth} bind:clientHeight={chartHeight}>
    {#if (chartWidth)}
        <svg
            width={chartWidth}
            height=800
        >
            <ChartXAxis
                scale={xScale}
                y={chartHeight - padding}
            />
            <ChartYAxis
                scale={yScale}
                x={padding}
            />
            {#each renderedData as { x, y }}
                <ChartDatapoint
                    x={x}
                    y={y}
                />
            {/each}
        </svg>
    {/if}
</div>

<style>
    .chart {
        flex: 1;
        width: 100%;
        overflow: hidden;
    }

    /* svg {
        background: red;
    } */
</style>
