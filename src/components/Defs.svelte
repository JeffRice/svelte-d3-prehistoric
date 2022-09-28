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

<filter id="herbivore_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/herbivore.svg"/>
</filter>

<filter id="tyrannoskull_image" x="0%" y="0%" width="100%" height="100%">
  <feImage xlink:href="/images/tyrannoskull.jpg"/>
</filter>
  
</defs>
