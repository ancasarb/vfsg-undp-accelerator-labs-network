<script>
	import { axisLeft, select } from 'd3';

	export let chartDimensions;

	export let rowYScale;
	export let labels;

	const chartAxis = function (axis) {
		let axisGenerator = axisLeft().scale(rowYScale).tickValues([0, 10, 20, 30, 40]);
		select(axis).call(axisGenerator);
		select(axis).select('.domain').attr('stroke-width', 0);
		select(axis).selectAll('.tick').select('line').attr('stroke-width', 0);
		select(axis)
			.selectAll('.tick')
			.select('text')
			.attr('fill', '#747170')
			.attr('font-weight', 'bold')
			.attr('text-anchor', 'middle');
	};

	$: rowAxis = [null, null, null, null, null];
	$: rowAxis.map((axis) => chartAxis(axis));

	const multipleRowsLabelPadding = 15;
	const rowsAxisWidth = 20;
	const rowAxisPadding = 4;
</script>

<g>
	<g transform={`translate(${chartDimensions.margin.left})`}>
		<rect
			x={-rowsAxisWidth}
			y={0}
			width={rowsAxisWidth}
			height={chartDimensions.height}
			fill="#f4f4f4"
		/>
		<text
			x={-chartDimensions.margin.top}
			y={-rowAxisPadding}
			class="y-axis-title"
			transform={`rotate(-90)`}>NUMBER OF PROJECTS</text
		>
	</g>
	{#each labels as label, i}
		<g transform={`translate(0, ${chartDimensions.margin.top + chartDimensions.rowHeight * i})`}>
			{#each label as d, j}
				{#if i === 3}
					<text
						class="y-axis-text"
						x={chartDimensions.margin.left - 100}
						y={chartDimensions.rowHeight / 2 - 15 + j * multipleRowsLabelPadding}
						fill="black">{d}</text
					>
				{:else}
					<text
						class="y-axis-text"
						x={chartDimensions.margin.left - 100}
						y={chartDimensions.rowHeight / 2 + j * multipleRowsLabelPadding}
						fill="black">{d}</text
					>
				{/if}
			{/each}
			<g transform={`translate(${chartDimensions.margin.left},0)`}>
				<g bind:this={rowAxis[i]} />
			</g>
		</g>
	{/each}
</g>

<style>
	.y-axis-text {
		font-size: 12px;
		text-anchor: middle;
	}

	.y-axis-title {
		fill: #747170;
		font-weight: bold;
	}
</style>
