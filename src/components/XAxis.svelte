<script>
	export let chartDimensions;

	export let labels;

	const xAxisRowWidth = 10;
</script>

<g transform={`translate(${chartDimensions.margin.left})`}>
	{#each labels as l}
		{@const x = l.xPosition}
		<line
			x1={x}
			y1={xAxisRowWidth}
			x2={x}
			y2={chartDimensions.margin.top - 10}
			class="x-axis-line"
		/>
		<rect
			x={-chartDimensions.margin.top + 20}
			y={x - xAxisRowWidth / 2}
			width={l.padding}
			height={xAxisRowWidth}
			transform={`rotate(-90)`}
			class="x-axis-background"
		/>
		<text
			x={-chartDimensions.margin.top + 40}
			y={x + 4}
			class="x-axis-text"
			transform={`rotate(-90)`}>{l.label}</text
		>
		<circle cx={x} cy={chartDimensions.margin.top - 25} r={5} class="x-axis-circle" />
	{/each}
</g>

<style>
	.x-axis-line {
		stroke: #c0bfbf;
	}

	.x-axis-circle {
		fill: white;
		stroke: black;
		stroke-width: 0.5;
	}

	.x-axis-text {
		font-size: 12px;
	}

	.x-axis-background {
		fill: white;
	}
</style>
