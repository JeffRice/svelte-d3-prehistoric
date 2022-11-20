<script>
    import { scaleLinear, interpolateMagma  } from 'd3';
    import ChartXAxis from './ChartXAxis.svelte';
    import ChartYAxis from './ChartYAxis.svelte';
    import ChartDatapoint from './ChartDatapoint.svelte';


    export let data;
    export let xRange;
    export let yRange;

    const padding = 80;

    let chartWidth;
    let chartHeight;

  //  let jurassicPaint= scaleLinear().domain([0, 40]).range(["#f2caf7","#6c4870"])

 //   let magmaPaint= scaleLinear().domain([0, 5, 10, 15, 20, 25, 30, 35, 40, 45]).range(["#150e38","#1d1147","#251255","#390f6e","#440f76","#52137c","#701f81","#802582","#982d80","#b2357b"])

    let mScale = scaleLinear()
        .domain([-40,160])
        .range([0,1]);

    $: xScale = scaleLinear()
        .domain(xRange)
        .range([padding, chartWidth - padding]);

    $: yScale = scaleLinear()
        .domain(yRange)
        .range([chartHeight - padding, padding]);

    $: renderedData = data.map((d) => {
        
        let magmaStoke = mScale(d.x)
        return {
            x: xScale(d.x),
            y: yScale(d.y),
            name: d.name,
            hoverName: d.hoverName,
            stroke: interpolateMagma(magmaStoke)
    //        stroke: jurassicPaint(d.x)
        };
        
    });

</script>

<div class="chart" bind:clientWidth={chartWidth} bind:clientHeight={chartHeight}>
    {#if (chartWidth)}
        <svg
            class="scatter-chart"
            width={chartWidth}
            height={chartHeight}
            style='overflow: visible;'
        >
            <ChartXAxis
                scale={xScale}
                y={chartHeight - padding}
            />
            <ChartYAxis
                scale={yScale}
                x={padding}
            />
            {#each renderedData as { x, y, name, stroke, hoverName }}
                <ChartDatapoint
                    x={x}
                    y={y}
                    name={name}
                    hoverName={hoverName}
                    stroke={stroke}
                />
            {/each}
        </svg>
    {/if}
</div>

<style>
    .chart {
        flex: 1;
        width: 100%;
        min-width: 400px;
        height: 400px;
    }
</style>
