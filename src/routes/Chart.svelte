<script>
	import Rows from './../components/Rows.svelte';

	import { regionMetadata, energySourceMetadata } from './../transform.js';
	import { getCountsByRegionAndEnergySource, getTotalProjects } from '../transform';
	import { scaleBand, scaleLinear } from 'd3';
	import { find, max, orderBy, uniq } from 'lodash';

	import XAxis from './../components/XAxis.svelte';
	import YAxis from './../components/YAxis.svelte';
	import Gridlines from './../components/Gridlines.svelte';

	export let data;

	const dimensions = {
		width: 1000,
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

	$: regionEnergySourceData = getCountsByRegionAndEnergySource(data);
	$: totalProjects = getTotalProjects(data);

	$: energySources = orderBy(totalProjects, 'total_projects', ['desc']).map(energySourceAccessor);
	$: regions = uniq(regionEnergySourceData.map(regionAccessor)).sort();
	$: maxProjects = max(regionEnergySourceData.map(energySourceAccessor).flat().map(projectsAccessor));

	$: xScale = scaleBand().domain(energySources).rangeRound([0, dimensions.innerWidth]).padding(0.5);
	$: yScale = scaleLinear().domain([0, maxProjects]).range([100, 10]);

	$: chartRows = regions.map((region) => {
		const items = energySourceAccessor(find(regionEnergySourceData, { region: region })).map((item) => {
			const energySource = energySourceAccessor(item);
			return {
				key: energySource,
				projects_value: projectsAccessor(item),
				countries_value: countriesAccessor(item),
				splits: [
					{ key: 1, value: item.products },
					{ key: 2, value: item.prototypes }
				]
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
		yAccessor={(item) => item.projects_value}
		additionalDataAccessor={(item) => item.countries_value}
		splitsDataAccessor={(item) => item.splits}
	/>
</svg>
