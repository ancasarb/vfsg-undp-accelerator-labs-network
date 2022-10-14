<script>
	import textures from 'textures';
	import { select } from 'd3';
	import { getTexture } from '../metadata';

	export let chartRows;
	export let chartDimensions;

	export let xScale;
	export let yScale;

	export let xAccessor;
	export let yAccessor;
	export let additionalDataAccessor;
	export let groupDataAccessor;

	const barWidth = 20;
	const additionalDataLineHeight = 3;
	const additionalDataLineLeftMargin = 1.5;

	const groupsTextures = [
		getTexture('#02aad1'),
		getTexture('#8e4784'),
		getTexture('#f59421'),
		getTexture('#e00102'),
		getTexture('#36978e')
	];

	let group;
	$: {
		groupsTextures.map((t) => select(group).call(t));
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
				{@const groups = [
					{
						x: x - barWidth / 2 - barWidth / 2 - 2,
						y: yScale(groupDataAccessor(item)[0]),
						fill: groupsTextures[i].url()
					},
					{ x: x + barWidth / 2 + 2, y: yScale(groupDataAccessor(item)[1]), fill: 'white' }
				]}

				<rect
					x={x - barWidth / 2}
					{y}
					width={barWidth}
					height={chartDimensions.rowHeight - y}
					fill={row.color}
				/>

				{#each groups as group}
					<rect
						x={group.x}
						y={group.y}
						width={barWidth / 2}
						height={chartDimensions.rowHeight - group.y}
						stroke={row.color}
						fill={group.fill}
						stroke-width={0.5}
					/>
				{/each}

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
				x2={chartDimensions.width - 20 - chartDimensions.margin.right}
				y2={chartDimensions.rowHeight}
				stroke="black"
			/>
		</g>
	{/each}
</g>
