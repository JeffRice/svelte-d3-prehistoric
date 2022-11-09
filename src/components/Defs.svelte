<script>
  // SVG <defs> section
  import { width, panelHeight } from '../stores/dimensions';
</script>

<defs>
  <radialGradient cx="50%" cy="-30%" r="75%" id="radial-gradient">
    <stop offset="40%" style="stop-color: var(--bg);" stop-opacity="0.7" />
    <stop offset="100%" style="stop-color: var(--bg);" stop-opacity="0" />
  </radialGradient>

  <radialGradient cx="50%" cy="-30%" r="75%" id="green-radial-gradient">
    <stop offset="40%" style="stop-color: var(--preGreen);" stop-opacity="0.7" />
    <stop offset="100%" style="stop-color: var(--preGreen);" stop-opacity="0" />
  </radialGradient>

  <linearGradient id="bg-gradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" style="stop-color: var(--bg); stop-opacity: 1;" />
    <stop offset={1 / 1.1} style="stop-color: var(--bg); stop-opacity: 1;" />
    <stop offset="1" style="stop-color: var(--bg); stop-opacity: 0;" />
  </linearGradient>

  <linearGradient id="timeline-gradient" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" style="stop-color: var(--bg);" />
    <stop offset="0.05" style="stop-color: var(--dfrlab-gray);" />
    <stop offset="0.95" style="stop-color: var(--dfrlab-gray);" />
    <stop offset="1" style="stop-color: var(--bg);" />
  </linearGradient>

  <marker
    id="arrow"
    viewBox="0 0 10 10"
    refX="5"
    refY="5"
    markerWidth="6"
    markerHeight="6"
    orient="auto-start-reverse"
    style="fill: var(--text-darkgray);">
    <path d="M 0 0 L 10 5 L 0 10 z" />
  </marker>
<!--
  <pattern id="image" patternContentUnits = "objectBoundingBox" height="100%" width="100%">
    <image x="0" y="0" height="100" width="100" preserveAspectRatio = "none" xlink:href="/images/raptor.svg"></image>
  </pattern>
-->
<filter id="mammoth_image" x="0%" y="0%" width="100%" height="100%">
    <feImage xlink:href="/images/mammoth.svg"/>
</filter>

<filter id="raptor_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/raptor.svg"/>
</filter>

<filter id="archelon_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/archelon.png"/>
</filter>

<filter id="argentinosaurus_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/argentinosaurus.png"/>
</filter>

<filter id="argentavis_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/argentavis.png"/>
</filter>

<filter id="basilosaurus_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/basilosaurus.png"/>
</filter>

<filter id="dimetrodon_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/dimetrodon.png"/>
</filter>

<filter id="gastornis_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/gastornis.png"/>
</filter>

<filter id="giganotosaurus_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/giganotosaurus.png"/>
</filter>

<filter id="giraffatitan_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/giraffatitan.png"/>
</filter>

<filter id="herbivore_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/herbivore.svg"/>
</filter>

<filter id="iguanodon_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/iguanodon.png"/>
</filter>

<filter id="meganeura_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/meganeura.png"/>
</filter>

<filter id="megatherium_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/megatherium.png"/>
</filter>

<filter id="muttaburrasaurus_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/muttaburrasaurus.png"/>
</filter>

<filter id="shunosaurus_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/shunosaurus.png"/>
</filter>

<filter id="spinosaurus_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/spinosaur.png"/>
</filter>

<filter id="titanoboa_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/titanoboa.png"/>
</filter>


<filter id="tyrannoskull_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/tyrannoskull.jpg"/>
</filter>

<filter id="trexskull_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/trexskull.png"/>
</filter>

<filter id="aquatic_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/aquatic.svg"/>
</filter>

<filter id="pachycephalosaurus_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/pachycephalosaurus.png"/>
</filter>

<filter id="pterodactyl_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/pterodactyl.svg"/>
</filter>

<filter id="smilodon_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/smilodon.png"/>
</filter>

<filter id="stegosaurus_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/stegosaurus.svg"/>
</filter>

<filter id="ophthalmosaurus_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/ophthalmosaurus.png"/>
</filter>


<filter id="lizard_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/lizard.svg"/>
</filter>

<filter id="mesosaurus_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/mesosaurus.png"/>
</filter>

<filter id="mosasaurus_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/mosasaurus.png"/>
</filter>

<filter id="plateosaurus_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/plateosaurus.png"/>
</filter>

<filter id="smallraptor_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/smallraptor.svg"/>
</filter>

<filter id="seaskeleton_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/seaskeleton.svg"/>
</filter>

<filter id="armored_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/armored.svg"/>
</filter>

<filter id="tyrannosaurskeleton_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/tyrannosaurskeleton.svg"/>
</filter>

<filter id="triceratops_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/triceratops.svg"/>
</filter>

<filter id="talons_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/talons.svg"/>
</filter>



<filter id="duckbilled_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/duckbilled.svg"/>
</filter>




  
</defs>
