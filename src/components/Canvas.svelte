<script>
  // the canvas component holding the world map
  import { width, height, panelHeight, mapHeight } from "../stores/dimensions";
  import {
    bg,
    usaRed,
    usaLightRed,
    usaLightLightRed,
    preGreen,
    preBlue,
    prePurple,
  } from "../utils/colors";
  import { countries, pangeaRegions, projection, geoPath } from "../stores/map";
  import { scaleFactor } from "../stores/scales";
  import { timeScale } from "../stores/scales";
  import {
    select,
    geoGraticule,
    geoNaturalEarth1,
    geoMercator,
    geoPath as d3geoPath,
    scaleLinear,
  } from "d3";
  import { onMount, afterUpdate } from "svelte";
  import { feature } from "topojson";
  import loadJurassicFossils from "../utils/loadJurassicFossils";
  import loadTriassicFossils from "../utils/loadTriassicFossils";
  import loadCretaceousFossils from "../utils/loadCretaceousFossils";
  import { fossilDatapoints, switchValueStore } from "../stores/elements";

  let canvas;
  let worldFeature;
  let worldjson;
  let graticule;
  let triassicFossilSpots;
  let jurassicFossilSpots;
  let cretaceousFossilSpots;
  const worldDataPath = "countries-50m.json";

  onMount(async function () {
    const worldResponse = await fetch(worldDataPath);
    worldjson = await worldResponse.json();
    //  console.log('worldjson: ', worldjson)
    worldFeature = feature(worldjson, worldjson.objects.countries);
    //  console.log('worldFeature: ', worldFeature)

    jurassicFossilSpots = await loadJurassicFossils();
    triassicFossilSpots = await loadTriassicFossils();
    cretaceousFossilSpots = await loadCretaceousFossils();

    $fossilDatapoints.jurassic = jurassicFossilSpots;
    $fossilDatapoints.originaljurassic = jurassicFossilSpots;
    $fossilDatapoints.triassic = triassicFossilSpots;
    $fossilDatapoints.originaltriassic = triassicFossilSpots;
    $fossilDatapoints.cretaceous = cretaceousFossilSpots;
    $fossilDatapoints.originalcretaceous = cretaceousFossilSpots;

    // starting without fossil spots on smaller screens to help mobile users
    if ($width < 1000) {
      $fossilDatapoints["cretaceous"] = [];
      $fossilDatapoints["triassic"] = [];
      $fossilDatapoints["jurassic"] = [];
    }
  });

  //to update the fossil locations on resize
  $: if ($width || $height) {
    reDraw();
  }
  /*
another way to redraw on updates
  afterUpdate(() => {
		// ...the DOM is now in sync with the data
    reDraw(); 
	});
*/

  //main reactive loop
  $: if (
    canvas &&
    $countries &&
    pangeaRegions &&
    worldjson &&
    jurassicFossilSpots &&
    triassicFossilSpots &&
    cretaceousFossilSpots &&
    fossilDatapoints &&
    $switchValueStore
  ) {
    let geoNaturalEarth1projection = geoNaturalEarth1()
      .scale(225 + $width / 25)
      // .scale($width / 1.3 / Math.PI)
      //  .rotate([10, -15])
      .translate([$width / 2, $mapHeight / 2]);

    let testProjection = geoMercator()
      .scale($projection.scale())
      .translate($projection.translate());

    let geoGenerator = d3geoPath().projection($projection).context(ctx);

    let projectionCopy = $projection;

    //initial canvas setup
    canvas.width = $scaleFactor * $width;
    canvas.height = $scaleFactor * $height;
    canvas.style.width = `${$width}px`;
    canvas.style.height = `${$height}px`;

    const ctx = canvas.getContext("2d", { alpha: false });
    ctx.scale($scaleFactor, $scaleFactor);
    ctx.translate(0, $panelHeight);

    ctx.strokeStyle = preGreen;
    ctx.fillStyle = bg;
    ctx.fillRect(0, -$panelHeight, $width, $height);

    $geoPath.context(ctx);

    // console.log(projection)

    // begin fossil adding code
    let container = select("#container")
      .style("width", width + "px")
      .style("height", height + "px");

    let base = select("#map");

    let locations = select("#points");

    let jurassicPaint = scaleLinear()
      .domain([140, 206])
      .range(["#a4e3ef", "#2f9eb3"]);

    function createMap(dataset) {
      var dataBinding = locations
        .selectAll("points.arc")

        .data(dataset)

        .enter()
        .append("points")
        .classed("arc", true)
        .attr("x", function (d) {
          return testProjection([d.y, d.x])[0];
        })
        .attr("y", function (d) {
          return testProjection([d.y, d.x])[1];
        })
        .attr("radius", 4)
        .attr("fillStyle", function (d) {
          return jurassicPaint(d.maxAge);
        });

      drawCanvas();
    }

    let triassicPaint = scaleLinear()
      .domain([199, 247])
      .range(["#f2caf7", "#6c4870"]);

    function createTriassicMap(dataset) {
      locations
        .selectAll("points.arc")

        .data(dataset)
        .enter()
        .append("points")
        .classed("arc", true)
        .attr("x", function (d) {
          return testProjection([d.y, d.x])[0];
        })
        .attr("y", function (d) {
          return testProjection([d.y, d.x])[1];
        })
        .attr("radius", 4)
        .attr("fillStyle", function (d) {
          return triassicPaint(d.maxAge);
        });
      drawCanvas();
    }

    let cretaceousPaint = scaleLinear()
      .domain([60, 150])
      .range(["#aad5a9", "#486848"]);

    function createCretaceousMap(dataset) {
      locations
        .selectAll("points.arc")

        .data(dataset)

        .enter()
        .append("points")
        .classed("arc", true)
        .attr("x", function (d) {
          return testProjection([d.y, d.x])[0];
        })
        .attr("y", function (d) {
          return testProjection([d.y, d.x])[1];
        })
        .attr("radius", 4)
        .attr("fillStyle", function (d) {
          return cretaceousPaint(d.maxAge);
        });

      drawCanvas();
    }

    function drawCanvas() {
      var elements = locations.selectAll("points.arc");
      elements.each(function (d, i) {
        var node = select(this);

        ctx.beginPath();
        ctx.arc(
          node.attr("x"),
          node.attr("y"),
          node.attr("radius"),
          0,
          2 * Math.PI
        );
        ctx.fillStyle = node.attr("fillStyle");
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#fff";
        ctx.stroke();
        ctx.closePath();
      });
    }

    function drawDonut() {
      var elements = locations.selectAll("points.arc");
      elements.each(function (d, i) {
        var node = select(this);

        ctx.beginPath();
        ctx.arc(
          node.attr("x"),
          node.attr("y"),
          node.attr("radius"),
          0,
          2 * Math.PI
        );
        ctx.fillStyle = node.attr("fillStyle");
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = node.attr("fillStyle");
        ctx.stroke();
        ctx.closePath();
      });
    }

    createTriassicMap($fossilDatapoints.triassic);

    createMap($fossilDatapoints.jurassic);

    createCretaceousMap($fossilDatapoints.cretaceous);

    function makeGraticules() {
      let geoGenerator = d3geoPath()
        .projection(geoNaturalEarth1projection)
        .context(ctx);

      // Create and configure the graticule generator (one line every 20 degrees)
      graticule = geoGraticule();
      ctx.beginPath();
      //      ctx.globalAlpha = 0.45;
      ctx.strokeStyle = "#ccc";
      geoGenerator(graticule());
      geoGenerator(graticule.outline());
      ctx.stroke();

      ctx.lineWidth = 2;
      let outline = graticule.outline();
      ctx.beginPath();
      ctx.strokeStyle = "#000";
      geoGenerator(outline);
      ctx.stroke();
    }

    makeGraticules();

    function worldMap() {
      // Current World Map
      ctx.save();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.globalAlpha = 0.35;
      //  worldFeature.features = worldFeature.features.filter((d) => d.properties.name !== 'Antarctica');
      worldFeature.features.forEach($geoPath);

      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }

    worldMap();

    function pangeaMap() {
      //Pangea map
      ctx.strokeStyle = preGreen;
      ctx.globalAlpha = 0.15;
      ctx.lineWidth = 1;
      ctx.beginPath();
      $pangeaRegions.forEach($geoPath);
      ctx.fillStyle = preGreen;
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      setTimeout(function () {
        var fadeEffect = setInterval(function () {
          if (ctx.globalAlpha < 0.225) {
            ctx.globalAlpha += 0.015;
            ctx.beginPath();
            $pangeaRegions.forEach($geoPath);
            ctx.fillStyle = preGreen;
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 1.5;
            ctx.stroke();
          } else {
            clearInterval(fadeEffect);
          }
        }, 80);
      }, 1);
    }

    if ($switchValueStore === "on") {
      pangeaMap();
    }
    if ($switchValueStore === "off") {
    }

    function createLegend() {
      ctx.fillStyle = bg;
      ctx.fillRect($width - 220, $mapHeight - 230, 300, 230);
      ctx.strokeStyle = "#000";
      ctx.strokeRect($width - 220, $mapHeight - 230, 300, 230);

      ctx.font = "bold 16px Quicksand";
      ctx.fillStyle = "#000";
      ctx.fillText("Fossil Color Scale", $width - 200, $mapHeight - 211);

      ctx.beginPath();
      ctx.moveTo($width - 200, $mapHeight - 205);
      ctx.lineTo($width - 66, $mapHeight - 205);
      ctx.stroke();

      ctx.font = "16px Quicksand";
      ctx.fillStyle = "#000";
      ctx.fillText("Cretaceous", $width - 200, $mapHeight - 179);
      // ctx.fillStyle = preBlue;

      //gradient
      const gradientCretaceous = ctx.createLinearGradient(
        $width - 200,
        0,
        $width - 25,
        0
      );
      gradientCretaceous.addColorStop(0, "#aad5a9");
      gradientCretaceous.addColorStop(1, "#486848");
      ctx.fillStyle = gradientCretaceous;
      ctx.fillRect($width - 200, $mapHeight - 162, 175, 16);

      //years range
      ctx.fillStyle = "#000";
      ctx.font = "12px Quicksand";
      ctx.fillText("65 mya", $width - 200, $mapHeight - 165);
      ctx.fillText("145 mya", $width - 72, $mapHeight - 165);

      //time era
      ctx.font = "16px Quicksand";
      ctx.fillText("Jurassic", $width - 200, $mapHeight - 110);
      //  ctx.fillStyle = prePurple;

      //gradient
      const gradientJurassic = ctx.createLinearGradient(
        $width - 200,
        0,
        $width - 25,
        0
      );
      gradientJurassic.addColorStop(0, "#a4e3ef");
      gradientJurassic.addColorStop(1, "#2f9eb3");
      ctx.fillStyle = gradientJurassic;
      ctx.fillRect($width - 200, $mapHeight - 93, 175, 16);

      //years range
      ctx.fillStyle = "#000";
      ctx.font = "12px Quicksand";
      ctx.fillText("145 mya", $width - 200, $mapHeight - 96);
      ctx.fillText("201 mya", $width - 72, $mapHeight - 96);

      //time era
      ctx.fillStyle = "#000";
      ctx.font = "16px Quicksand";
      ctx.fillText("Triassic", $width - 200, $mapHeight - 41);

      //gradient
      const gradient = ctx.createLinearGradient(
        $width - 200,
        0,
        $width - 25,
        0
      );
      gradient.addColorStop(0, "#f2caf7");
      gradient.addColorStop(1, "#6c4870");
      ctx.fillStyle = gradient;
      ctx.fillRect($width - 200, $mapHeight - 25, 175, 16);

      //years range
      ctx.fillStyle = "#000";
      ctx.font = "12px Quicksand";
      ctx.fillText("201 mya", $width - 200, $mapHeight - 28);
      ctx.fillText("251 mya", $width - 72, $mapHeight - 28);
    }
    if ($width > 1000) {
      createLegend();
    }
  }
  //end main reactive loop

  function reDraw() {
    let locations = select("#points");
    var elements = locations.selectAll("points.arc");
    elements.each(function (d, i) {
      var node = select(this);
      this.remove();
    });
  }
</script>

<div class="layer" />
<div id="map">
  <canvas bind:this={canvas}>
    <div id="points" />
  </canvas>
</div>

<style>
  canvas {
    position: absolute;
    z-index: 0;
  }
</style>
