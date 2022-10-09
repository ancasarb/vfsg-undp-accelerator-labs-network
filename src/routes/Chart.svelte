<script>
	import { metadata, energySourcePadding } from './../transform.js';
	import { getCountsByEnergySource, getCountsByRegion } from '../transform';
	import { axisLeft, extent, scaleBand, scaleLinear, select } from 'd3';
	import { find, max, meanBy, uniq } from 'lodash';

	export let data;

	const dimensions = {
		width: 1200,
		height: 725,
		margin: {
			top: 200,
			left: 250,
			bottom: 0,
			right: 0
		}
	};

	dimensions.innerHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
	dimensions.innerWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;

	const regionAccessor = (d) => d.region;
	const energySourceAccessor = (d) => d['energy_source'];
	const projectsAccessor = (d) => d.projects;
	const countriesAccessor = (d) => d.countries;

	$: regionData = getCountsByRegion(data);
	$: energySources = uniq(data.map(energySourceAccessor)).sort();
	$: regions = uniq(regionData.map(regionAccessor)).sort();
	$: maxProjectCounts = max(regionData.map(energySourceAccessor).flat().map(projectsAccessor));

	$: xScale = scaleBand().domain(energySources).rangeRound([0, dimensions.innerWidth]).padding(0.2);
	$: yScale = scaleLinear().domain([0, maxProjectCounts]).range([100, 10]);

	$: values = energySources.map((es) => {
		return { value: es, x: xScale(es) };
	});

	$: energySourceAverages = getCountsByEnergySource(data).map((item) => {
		return {
			energy_source: energySourceAccessor(item),
			average: meanBy(regionAccessor(item), 'projects')
		};
	});

	let axis0;

	$: {
		let axisGenerator = axisLeft().scale(yScale).tickValues([0, 10, 20, 30, 40]);
		select(axis0).call(axisGenerator);
		select(axis0).select('.domain').attr('stroke-width', 0);
		select(axis0).selectAll('.tick').select('line').attr('stroke-width', 0);
		select(axis0)
			.selectAll('.tick')
			.select('text')
			.attr('fill', '#747170')
			.attr('font-weight', 'bold')
			.attr('text-anchor', 'middle');
	}

	let axis1;

	$: {
		let axisGenerator = axisLeft().scale(yScale).tickValues([0, 10, 20, 30, 40]);
		select(axis1).call(axisGenerator);
		select(axis1).select('.domain').attr('stroke-width', 0);
		select(axis1).selectAll('.tick').select('line').attr('stroke-width', 0);
		select(axis1)
			.selectAll('.tick')
			.select('text')
			.attr('fill', '#747170')
			.attr('font-weight', 'bold')
			.attr('text-anchor', 'middle');
	}

	let axis2;

	$: {
		let axisGenerator = axisLeft().scale(yScale).tickValues([0, 10, 20, 30, 40]);
		select(axis2).call(axisGenerator);
		select(axis2).select('.domain').attr('stroke-width', 0);
		select(axis2).selectAll('.tick').select('line').attr('stroke-width', 0);
		select(axis2)
			.selectAll('.tick')
			.select('text')
			.attr('fill', '#747170')
			.attr('font-weight', 'bold')
			.attr('text-anchor', 'middle');
	}

	let axis3;

	$: {
		let axisGenerator = axisLeft().scale(yScale).tickValues([0, 10, 20, 30, 40]);
		select(axis3).call(axisGenerator);
		select(axis3).select('.domain').attr('stroke-width', 0);
		select(axis3).selectAll('.tick').select('line').attr('stroke-width', 0);
		select(axis3)
			.selectAll('.tick')
			.select('text')
			.attr('fill', '#747170')
			.attr('font-weight', 'bold')
			.attr('text-anchor', 'middle');
	}

	let axis4;

	$: {
		let axisGenerator = axisLeft().scale(yScale).tickValues([0, 10, 20, 30, 40]);
		select(axis4).call(axisGenerator);
		select(axis4).select('.domain').attr('stroke-width', 0);
		select(axis4).selectAll('.tick').select('line').attr('stroke-width', 0);
		select(axis4)
			.selectAll('.tick')
			.select('text')
			.attr('fill', '#747170')
			.attr('font-weight', 'bold')
			.attr('text-anchor', 'middle');
	}
</script>

<svg width={dimensions.width} height={dimensions.height}>
	<g transform={`translate(${dimensions.margin.left})`}>
		{#each values as item}
			{@const x = item.x}
			{@const value = item.value}
			<line x1={x} y1={10} x2={x} y2={dimensions.margin.top - 10} class="x-axis-line" />
			<rect
				x={-dimensions.margin.top + 20}
				y={x - 5}
				width={find(energySourcePadding, { energySource: value }).padding}
				height={10}
				transform={`rotate(-90)`}
				class="x-axis-background"
			/>
			<text x={-dimensions.margin.top + 40} y={x + 4} class="x-axis-text" transform={`rotate(-90)`}
				>{value}</text
			>
			<circle cx={x} cy={dimensions.margin.top - 25} r={5} class="x-axis-circle" />
		{/each}
	</g>

	<g transform={`translate(${dimensions.margin.left})`}>
		<rect x={-20} y={0} width={20} height={dimensions.height} fill="#f4f4f4" />
		<text x={-dimensions.margin.top + 10} y={-4} class="y-axis-note" transform={`rotate(-90)`}
			>NUMBER OF PROJECTS</text
		>
	</g>

	<g transform={`translate(${dimensions.margin.left},${dimensions.margin.top})`}>
		{#each values as item}
			{@const x = item.x}
			{@const value = item.value}
			<line x1={x} y1={0} x2={x} y2={dimensions.innerHeight} class="grid-line" />
		{/each}
	</g>

	{#each regions as region, i}
		{@const energySources = energySourceAccessor(find(regionData, { region: region }))}
		{@const color = find(metadata, { region: region }).color}
		{@const display = find(metadata, { region: region }).display}

		<g transform={`translate(0, ${dimensions.margin.top + 100 * i})`}>
			{#each display as d, i}
				<text class="y-axis-text" x={150} y={50 + i * 15} fill="black">{d}</text>
			{/each}
			<line
				x1={dimensions.margin.left}
				y1={100}
				x2={dimensions.width - 75}
				y2={100}
				stroke="black"
			/>
		</g>

		<g transform={`translate(${dimensions.margin.left},${dimensions.margin.top + 100 * i})`}>
			{#if i == 0}
				<g bind:this={axis0} />
			{/if}

			{#if i == 1}
				<g bind:this={axis1} />
			{/if}

			{#if i == 2}
				<g bind:this={axis2} />
			{/if}

			{#if i == 3}
				<g bind:this={axis3} />
			{/if}

			{#if i == 4}
				<g bind:this={axis4} />
			{/if}

			{#each energySources as item}
				{@const energySource = energySourceAccessor(item)}
				{@const x = find(values, { value: energySource }).x}
				{@const average = find(energySourceAverages, { energy_source: energySource }).average}
				<rect
					x={x - 5}
					y={yScale(projectsAccessor(item))}
					width={10}
					height={100 - yScale(projectsAccessor(item))}
					fill={color}
				/>
				<line
					x1={x - 10}
					y1={yScale(average)}
					x2={x + 10}
					y2={yScale(average)}
					class="average-line"
				/>
			{/each}
		</g>
	{/each}
</svg>

<style>
	.grid-line {
		stroke-dasharray: 2;
		stroke: #c0bfbf;
		stroke-width: 0.5;
	}

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

	.y-axis-text {
		font-size: 12px;
	}

	.average-line {
		stroke: black;
		stroke-width: 2;
	}

	.y-axis-text {
		text-anchor: middle;
	}

	.y-axis-note {
		fill: #747170;
		font-weight: bold;
	}
</style>
