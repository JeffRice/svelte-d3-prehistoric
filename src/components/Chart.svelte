<script>
    import { scaleLinear, interpolateMagma  } from 'd3';
	import { csv, min, max, forceSimulation, forceX, forceY, forceManyBody, forceCenter, forceCollide } from 'd3';
	import { select, selectAll } from 'd3-selection';
    import ChartXAxis from './ChartXAxis.svelte';
    import ChartYAxis from './ChartYAxis.svelte';
    import ChartDatapoint from './ChartDatapoint.svelte';
    import { beforeUpdate, afterUpdate } from 'svelte';
    import { tick } from 'svelte';

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

    $: if(xScale) {
   //     arrangeLabels()
    }

    afterUpdate(() => {

       // setTimeout(arrangeLabels(), 200);
        
        arrangeLabels()
	});


    function arrangeLabels() {
        var svg = select(".scatter-chart")
    
  var move = 1;
  while(move > 0) {
    move = 0;
    svg.selectAll(".place-label")
       .each(function() {
         var that = this,
             a = this.getBoundingClientRect();
             let z = getTransformation(select(this).attr("transform"))
			 console.log('label transform', z);
	//		 console.log(z.translateX);


			// if(!typeof(z.translateX === NaN)){

            
         svg.selectAll(".place-label")
            .each(function() {
            //    console.log('78', select(this).attr("transform"));
            //    console.log('789', select(that).attr("transform"));

                if(select(that).attr("transform") === 'translate(undefined)' || select(this).attr("transform") === 'translate(undefined)'){
         //           console.log('exit')
                    return
                }

                if(select(that).attr("transform") === 'NaN)'){
        //            console.log('exit')
                    return
                }
                else {                if(this != that) {
                    if(select(that).attr("transform") === 'NaN'){
         //               console.log('exit')
                    return
                }
                var b = this.getBoundingClientRect();
                if((Math.abs(a.left - b.left) * 2 < (a.width + b.width)) &&
                
                   (Math.abs(a.top - b.top) * 2 < (a.height + b.height))) {
                  // overlap, move labels
                  console.log('overLa APPP ')
                  var dx = (Math.max(0, a.right - b.left) +
                           Math.min(0, a.left - b.right)) * 0.01,
                      dy = (Math.max(1, a.bottom - b.top) +
                           Math.min(1, a.top - b.bottom)) * 0.02,
                      tt = getTranslation(select(this).attr("transform")),
                      to = getTranslation(select(that).attr("transform"));
                  move += Math.abs(dx) + Math.abs(dy);

         //         console.log(this, 'this | that ', that)
         //        console.log('to', to)
         //         console.log('tt', tt)
                
                  to.translated = [ (to[0] + dx), (to[1] + dy) ];
                  tt.translated = [ (tt[0] - dx), (tt[1] - dy) ];

          //        console.log('to', to)
          //        console.log('tt', tt)

         //         console.log(totest, '|', tttest)
                  select(this).attr("transform", "translate(" + tt.translated + ")");
                  select(that).attr("transform", "translate(" + to.translated + ")");
                  a = this.getBoundingClientRect();

         //         console.log(this, 'this | that ', that)
                }
              }
            
            }


              
                



            });

     //   } //end type check
                       
       });
  }
}

function getTranslation(transform) {
  // Create a dummy g for calculation purposes only. This will never
  // be appended to the DOM and will be discarded once this function 
  // returns.
  var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  
  // Set the transform attribute to the provided string value.
  g.setAttributeNS(null, "transform", transform);
  
  // consolidate the SVGTransformList containing all transformations
  // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
  // its SVGMatrix. 
  var matrix = g.transform.baseVal.consolidate().matrix;
  
  // As per definition values e and f are the ones for the translation.
  return [matrix.e, matrix.f];
}


function getTransformation(transform) {
  // Create a dummy g for calculation purposes only. This will never
  // be appended to the DOM and will be discarded once this function 
  // returns.
  var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  
  // Set the transform attribute to the provided string value.
  g.setAttributeNS(null, "transform", transform);
  
  // consolidate the SVGTransformList containing all transformations
  // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
  // its SVGMatrix. 
  var matrix = g.transform.baseVal.consolidate().matrix;
  
  // Below calculations are taken and adapted from the private function
  // transform/decompose.js of D3's module d3-interpolate.
  var {a, b, c, d, e, f} = matrix;   // ES6, if this doesn't work, use below assignment
  // var a=matrix.a, b=matrix.b, c=matrix.c, d=matrix.d, e=matrix.e, f=matrix.f; // ES5
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * 180 / Math.PI,
    skewX: Math.atan(skewX) * 180 / Math.PI,
    scaleX: scaleX,
    scaleY: scaleY
  };
}

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

    /* svg {
        background: red;
    } */
</style>
