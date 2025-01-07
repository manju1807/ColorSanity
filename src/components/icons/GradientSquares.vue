<!-- GradientSquares.vue -->
<template>
  <svg :width="width" :height="height" :viewBox="`0 0 ${viewBoxWidth} ${viewBoxHeight}`" fill="none"
    xmlns="http://www.w3.org/2000/svg" :style="{ transform: `scale(${scale})` }">
    <g :clip-path="'url(#clip0)'">
      <rect :width="viewBoxWidth" :height="viewBoxHeight" fill="none" />

      <!-- Top Left Square -->
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="-2" y="64" width="389" height="390">
        <rect x="192.455" y="64.425" width="275" height="275" rx="8" transform="rotate(45 192.455 64.425)"
          :fill="maskFill" />
      </mask>
      <g mask="url(#mask0)">
        <rect v-for="(color, index) in blueGradient" :key="'blue-' + index" :x="gradientRects[index].x"
          :y="gradientRects[index].y" :width="275" :height="69"
          :transform="`rotate(-45 ${gradientRects[index].x} ${gradientRects[index].y})`" :fill="color" />
      </g>

      <!-- Top Right Square -->
      <mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="353" y="-3" width="390" height="390">
        <rect x="548.129" y="-2.75" width="275" height="275" rx="8" transform="rotate(45 548.129 -2.75)"
          :fill="maskFill" />
      </mask>
      <g mask="url(#mask1)">
        <rect v-for="(color, index) in greenGradient" :key="'green-' + index" :x="topRightRects[index].x"
          :y="topRightRects[index].y" :width="275" :height="69"
          :transform="`rotate(-45 ${topRightRects[index].x} ${topRightRects[index].y})`" :fill="color" />
      </g>

      <!-- Bottom Left Square -->
      <mask id="mask2" mask-type="alpha" maskUnits="userSpaceOnUse" x="209" y="275" width="390" height="390">
        <rect x="403.879" y="275.85" width="275" height="275" rx="8" transform="rotate(45 403.879 275.85)"
          :fill="maskFill" />
      </mask>
      <g mask="url(#mask2)">
        <rect v-for="(color, index) in redGradient" :key="'red-' + index" :x="bottomLeftRects[index].x"
          :y="bottomLeftRects[index].y" :width="275" :height="69"
          :transform="`rotate(-45 ${bottomLeftRects[index].x} ${bottomLeftRects[index].y})`" :fill="color" />
      </g>

      <!-- Bottom Right Square -->
      <mask id="mask3" mask-type="alpha" maskUnits="userSpaceOnUse" x="565" y="208" width="390" height="390">
        <rect x="759.554" y="208.675" width="275" height="275" rx="8" transform="rotate(45 759.554 208.675)"
          :fill="maskFill" />
      </mask>
      <g mask="url(#mask3)">
        <rect v-for="(color, index) in purpleGradient" :key="'purple-' + index" :x="bottomRightRects[index].x"
          :y="bottomRightRects[index].y" :width="275" :height="69"
          :transform="`rotate(-45 ${bottomRightRects[index].x} ${bottomRightRects[index].y})`" :fill="color" />
      </g>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect :width="viewBoxWidth" :height="viewBoxHeight" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<script lang="ts">
export default {
	name: "GradientSquares",
	props: {
		width: {
			type: [Number, String],
			default: 954,
		},
		height: {
			type: [Number, String],
			default: 666,
		},
		scale: {
			type: Number,
			default: 1,
		},
		maskFill: {
			type: String,
			default: "#00FFFF",
		},
		// Custom gradients can be provided
		customBlueGradient: {
			type: Array,
			default: null,
		},
		customGreenGradient: {
			type: Array,
			default: null,
		},
		customRedGradient: {
			type: Array,
			default: null,
		},
		customPurpleGradient: {
			type: Array,
			default: null,
		},
	},
	data() {
		return {
			viewBoxWidth: 954,
			viewBoxHeight: 666,
			defaultBlueGradient: ["#000040", "#0000BF", "#4040FF", "#BFBFFF"],
			defaultGreenGradient: ["#004000", "#00BF00", "#40FF40", "#BFFFBF"],
			defaultRedGradient: ["#400000", "#BF0000", "#FF4040", "#FFBFBF"],
			defaultPurpleGradient: ["#1B0040", "#5200BF", "#9240FF", "#DBBFFF"],
			gradientRects: [
				{ x: -2, y: 258.879 },
				{ x: 46.7905, y: 307.67 },
				{ x: 94.8735, y: 355.753 },
				{ x: 143.664, y: 404.543 },
			],
			topRightRects: [
				{ x: 353.675, y: 191.704 },
				{ x: 402.465, y: 240.495 },
				{ x: 450.548, y: 288.578 },
				{ x: 499.339, y: 337.368 },
			],
			bottomLeftRects: [
				{ x: 209.425, y: 470.304 },
				{ x: 258.215, y: 519.095 },
				{ x: 306.298, y: 567.178 },
				{ x: 355.089, y: 615.968 },
			],
			bottomRightRects: [
				{ x: 565.1, y: 403.129 },
				{ x: 613.89, y: 451.92 },
				{ x: 661.973, y: 500.003 },
				{ x: 710.764, y: 548.793 },
			],
		};
	},
	computed: {
		blueGradient() {
			return this.customBlueGradient || this.defaultBlueGradient;
		},
		greenGradient() {
			return this.customGreenGradient || this.defaultGreenGradient;
		},
		redGradient() {
			return this.customRedGradient || this.defaultRedGradient;
		},
		purpleGradient() {
			return this.customPurpleGradient || this.defaultPurpleGradient;
		},
	},
};
</script>
