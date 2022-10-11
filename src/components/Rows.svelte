<script>
	import { find } from 'lodash';

	export let chartRows;
	export let chartDimensions;

	export let xScale;
	export let yScale;

	export let xAccessor;
	export let yAccessor;
	export let yAvgAccessor;
	export let additionalDataAccessor;
	export let splitsDataAccessor;

	const avgLineWidth = 24;
	const barWidth = 20;
	const additionalDataLineHeight = 3;
	const additionalDataLineLeftMargin = 1.5;
</script>

<g>
	{#each chartRows as row, i}
		<g
			transform={`translate(${chartDimensions.margin.left},${
				chartDimensions.margin.top + chartDimensions.rowHeight * i
			})`}
		>
			{#each row.items as item}
				{@const x = xScale(xAccessor(item))}
				{@const y = yScale(yAccessor(item))}
				{@const yAvg = yScale(yAvgAccessor(item))}
				{@const ySplit1 = yScale(find(splitsDataAccessor(item), { key: 1 }).value)}
				{@const ySplit2 = yScale(find(splitsDataAccessor(item), { key: 2 }).value)}

				<rect
					x={x - barWidth / 2}
					{y}
					width={barWidth}
					height={chartDimensions.rowHeight - y}
					fill={row.rowColor}
				/>

				<line
					x1={x - barWidth / 2 - 7.5}
					y1={ySplit1}
					x2={x - barWidth / 2 - 7.5}
					y2={chartDimensions.rowHeight}
					stroke={row.rowColor}
					stroke-width="2"
				/>

				<rect
					x={x - barWidth / 2 - 4}
					y={ySplit2}
					width={2}
					height={chartDimensions.rowHeight - ySplit2}
					stroke={row.rowColor}
					fill="white"
					stroke-width={0.5}
				/>

				<line
					x1={x - avgLineWidth / 2}
					y1={yAvg}
					x2={x + avgLineWidth / 2}
					y2={yAvg}
					class="average-line"
				/>

				{#each [...Array(additionalDataAccessor(item)).keys()] as index}
					{@const additionalDataX =
						x - barWidth / 2 + index * additionalDataLineHeight + additionalDataLineLeftMargin}
					<line x1={additionalDataX} y1={y - 5} x2={additionalDataX} y2={y} stroke="black" />
				{/each}
			{/each}
		</g>
		<g transform={`translate(0, ${chartDimensions.margin.top + chartDimensions.rowHeight * i})`}>
			<line
				x1={chartDimensions.margin.left}
				y1={chartDimensions.rowHeight}
				x2={chartDimensions.width - 50}
				y2={chartDimensions.rowHeight}
				class="baseline"
			/>
		</g>
	{/each}
</g>

<style>
	.average-line,
	.baseline {
		stroke: black;
	}
</style>
