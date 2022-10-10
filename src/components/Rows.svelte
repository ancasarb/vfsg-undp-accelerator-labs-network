<script>
	export let chartRows;
	export let chartDimensions;

	export let xScale;
	export let yScale;

	export let xAccessor;
	export let yAccessor;
	export let yAvgAccessor;

	const avgLineLength = 20;
	const barWidth = 10;
</script>

<g>
	{#each chartRows as row, i}
		<g transform={`translate(0, ${chartDimensions.margin.top + chartDimensions.rowHeight * i})`}>
			<line
				x1={chartDimensions.margin.left}
				y1={chartDimensions.rowHeight}
				x2={chartDimensions.width - 75}
				y2={chartDimensions.rowHeight}
				class="baseline"
			/>
		</g>

		<g
			transform={`translate(${chartDimensions.margin.left},${
				chartDimensions.margin.top + chartDimensions.rowHeight * i
			})`}
		>
			{#each row.items as item}
				{@const x = xScale(xAccessor(item))}
				{@const y = yScale(yAccessor(item))}
				{@const yAvg = yScale(yAvgAccessor(item))}
				<rect
					x={x - barWidth / 2}
					{y}
					width={barWidth}
					height={chartDimensions.rowHeight - y}
					fill={row.rowColor}
					class="item-value"
				/>
				<line
					x1={x - avgLineLength / 2}
					y1={yAvg}
					x2={x + avgLineLength / 2}
					y2={yAvg}
					class="average-line"
				/>
			{/each}
		</g>
	{/each}
</g>

<style>
	.average-line {
		stroke: black;
		stroke-width: 2;
	}

	.item-value {
		opacity: 0.6;
	}

	.baseline {
		stroke: black;
	}
</style>
