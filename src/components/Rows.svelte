<script>
	import { find } from 'lodash';
	import textures from 'textures';
	import { select } from 'd3';

	export let chartRows;
	export let chartDimensions;

	export let xScale;
	export let yScale;

	export let xAccessor;
	export let yAccessor;
	export let additionalDataAccessor;
	export let splitsDataAccessor;

	const barWidth = 20;
	const additionalDataLineHeight = 3;
	const additionalDataLineLeftMargin = 1.5;

	const splitsTextures = [
		textures.lines().orientation('6/8').stroke('#02aad1').lighter().lighter().thicker().thicker(),
		textures.lines().orientation('6/8').stroke('#8e4784').lighter().lighter().thicker().thicker(),
		textures.lines().orientation('6/8').stroke('#f59421').lighter().lighter().thicker().thicker(),
		textures.lines().orientation('6/8').stroke('#e00102').lighter().lighter().thicker().thicker(),
		textures.lines().orientation('6/8').stroke('#36978e').lighter().lighter().thicker().thicker()
	];

	let group;
	$: {
		splitsTextures.map((t) => select(group).call(t));
	}
</script>

<g bind:this={group}>
	{#each chartRows as row, i}
		<g
			transform={`translate(${chartDimensions.margin.left},${
				chartDimensions.margin.top + chartDimensions.rowHeight * i
			})`}
		>
			{#each row.items as item}
				{@const x = xScale(xAccessor(item))}
				{@const y = yScale(yAccessor(item))}
				{@const ySplit1 = yScale(find(splitsDataAccessor(item), { key: 1 }).value)}
				{@const ySplit2 = yScale(find(splitsDataAccessor(item), { key: 2 }).value)}

				<rect
					x={x - barWidth / 2}
					{y}
					width={barWidth}
					height={chartDimensions.rowHeight - y}
					fill={row.rowColor}
				/>

				<rect
					x={x - barWidth / 2 - barWidth / 2 - 2}
					y={ySplit1}
					width={barWidth / 2}
					height={chartDimensions.rowHeight - ySplit1}
					stroke={row.rowColor}
					fill={splitsTextures[i].url()}
					stroke-width={0.5}
				/>

				<rect
					x={x + barWidth / 2 + 2}
					y={ySplit2}
					width={barWidth / 2}
					height={chartDimensions.rowHeight - ySplit2}
					stroke={row.rowColor}
					fill="white"
					stroke-width={0.5}
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
	.baseline {
		stroke: black;
	}
</style>
