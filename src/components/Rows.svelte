<script>
	import { select, stack } from 'd3';
	import textures from 'textures';
	import { filter } from 'lodash';

	export let chartRows;
	export let chartDimensions;

	export let xScale;
	export let yScale;

	export let xAccessor;
	export let yAccessor;
	export let yAvgAccessor;

	const avgLineLength = 30;
	const barWidth = 20;

	const barTextures = [
		textures.paths().d('crosses').lighter().thicker().thicker(),
		textures.lines().orientation('6/8').lighter().thicker().thicker().stroke('black'),
		textures.paths().d('waves').lighter().thicker().thicker().stroke('black')
	];

	let group;

	$: {
		barTextures.map((t) => select(group).call(t));
	}
</script>

<g bind:this={group}>
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

				<line
					x1={x - avgLineLength / 2}
					y1={yAvg}
					x2={x + avgLineLength / 2}
					y2={yAvg}
					class="average-line"
				/>

				<rect
					x={x - barWidth / 2}
					{y}
					width={barWidth}
					height={chartDimensions.rowHeight - y}
					fill={row.rowColor}
					class="item-value"
				/>

				{#each stack().keys(item.grouped_values.categories)(item.grouped_values.values) as stack, j}
					{@const d = stack[0]}
					<rect
						x={x - barWidth / 2}
						y={yScale(d[1])}
						width={barWidth}
						height={yScale(d[0]) - yScale(d[1])}
						fill={barTextures[j].url()}
					/>
				{/each}
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
