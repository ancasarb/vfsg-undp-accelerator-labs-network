<script>
	import Rows from './../components/Rows.svelte';
	import { loop_guard } from 'svelte/internal';

	import { regionMetadata, energySourceMetadata } from './../transform.js';
	import { getCountsByEnergySource, getCountsByRegion } from '../transform';
	import { extent, scaleBand, scaleLinear } from 'd3';
	import { find, max, meanBy, uniq } from 'lodash';

	import XAxis from './../components/XAxis.svelte';
	import YAxis from './../components/YAxis.svelte';
	import Gridlines from './../components/Gridlines.svelte';

	export let data;

	const dimensions = {
		width: 1200,
		height: 725,
		margin: {
			top: 200,
			left: 250,
			bottom: 25,
			right: 0
		},
		rowHeight: 100
	};

	dimensions.innerWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;

	const regionAccessor = (d) => d.region;
	const energySourceAccessor = (d) => d['energy_source'];
	const projectsAccessor = (d) => d.projects;
	const countriesAccessor = (d) => d.countries;

	$: regionData = getCountsByRegion(data);
	$: energySourceData = getCountsByEnergySource(data);

	$: energySources = uniq(data.map(energySourceAccessor)).sort();
	$: regions = uniq(regionData.map(regionAccessor)).sort();
	$: maxProjects = max(regionData.map(energySourceAccessor).flat().map(projectsAccessor));

	$: xScale = scaleBand().domain(energySources).rangeRound([0, dimensions.innerWidth]).padding(0.2);
	$: yScale = scaleLinear().domain([0, maxProjects]).range([100, 10]);

	$: energySourceData = energySourceData.map((item) => ({
		...item,
		projects_avg: meanBy(regionAccessor(item), 'projects')
	}));

	$: chartRows = regions.map((region) => {
		const items = energySourceAccessor(find(regionData, { region: region })).map((item) => {
			const energySource = energySourceAccessor(item);
			return {
				key: energySource,
				value: projectsAccessor(item),
				average_value: find(energySourceData, { energy_source: energySource }).projects_avg
			};
		});

		return {
			rowKey: region,
			rowColor: find(regionMetadata, { region: region }).color,
			items: items
		};
	});
</script>

<svg width={dimensions.width} height={dimensions.height}>
	<XAxis
		chartDimensions={dimensions}
		labels={energySources.map((e) => {
			return {
				label: e,
				xPosition: xScale(e),
				padding: find(energySourceMetadata, { energySource: e }).padding
			};
		})}
	/>

	<Gridlines chartDimensions={dimensions} xPositions={energySources.map(xScale)} />

	<YAxis
		chartDimensions={dimensions}
		labels={regions.map((r) => find(regionMetadata, { region: r }).display)}
		rowYScale={yScale}
	/>

	<Rows
		chartDimensions={dimensions}
		{chartRows}
		{xScale}
		{yScale}
		xAccessor={(item) => item.key}
		yAccessor={(item) => item.value}
		yAvgAccessor={(item) => item.average_value}
	/>
</svg>
