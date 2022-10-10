<script>
	export let chartDimensions;
	
	export let xPositions;
</script>

<g transform={`translate(${chartDimensions.margin.left},${chartDimensions.margin.top})`}>
	{#each xPositions as x}
		<line x1={x} y1={0} x2={x} y2={chartDimensions.height} class="grid-line" />
	{/each}
</g>

<style>
	.grid-line {
		stroke-dasharray: 2;
		stroke: #c0bfbf;
		stroke-width: 0.5;
	}
</style>
