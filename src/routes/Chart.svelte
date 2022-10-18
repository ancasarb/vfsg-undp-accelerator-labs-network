<script>
	import Rows from './../components/Rows.svelte';

	import { color, padding, display } from './../metadata.js';
	import { getCountsByRegionAndEnergySource, getEnergySourcesSortedByTotalProjects } from '../transform';
	import { scaleBand, scaleLinear } from 'd3';
	import { find, max, uniq } from 'lodash';

	import XAxis from './../components/XAxis.svelte';
	import YAxis from './../components/YAxis.svelte';
	import Gridlines from './../components/Gridlines.svelte';
	import Legend from '../components/Legend.svelte';
	import Title from '../components/Title.svelte';

	export let data;

	const dimensions = {
		width: 1300,
		height: 725,
		margin: {
			top: 195,
			left: 250,
			bottom: 25,
			right: 300
		},
		rowHeight: 100
	};

	dimensions.innerWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;

	const regionAccessor = (d) => d.region;
	const energySourceAccessor = (d) => d['energy_source'];
	const projectsAccessor = (d) => d.projects;
	const countriesAccessor = (d) => d.countries;

	$: regionEnergySourceData = getCountsByRegionAndEnergySource(data);

	$: energySources = getEnergySourcesSortedByTotalProjects(data);
	$: regions = uniq(regionEnergySourceData.map(regionAccessor)).sort();
	$: maxProjects = max(
		regionEnergySourceData.map(energySourceAccessor).flat().map(projectsAccessor)
	);

	$: xScale = scaleBand().domain(energySources).rangeRound([0, dimensions.innerWidth]).padding(0.5);
	$: yScale = scaleLinear().domain([0, maxProjects]).range([100, 10]);

	$: chartRows = regions.map((region) => {
		const items = energySourceAccessor(find(regionEnergySourceData, { region: region })).map(
			(item) => {
				const energySource = energySourceAccessor(item);
				return {
					key: energySource,
					projects_value: projectsAccessor(item),
					countries_value: countriesAccessor(item),
					groups: [item.products, item.prototypes]
				};
			}
		);

		return {
			color: color[region],
			items: items
		};
	});
</script>

<svg width={dimensions.width} height={dimensions.height}>
	<Title chartDimensions={dimensions} />

	<XAxis
		chartDimensions={dimensions}
		labels={energySources.map((e) => {
			return {
				label: e,
				xPosition: xScale(e),
				padding: padding[e]
			};
		})}
	/>

	<Gridlines chartDimensions={dimensions} xPositions={energySources.map(xScale)} />

	<YAxis chartDimensions={dimensions} labels={regions.map((r) => display[r])} rowYScale={yScale} />
	<Rows
		chartDimensions={dimensions}
		{chartRows}
		{xScale}
		{yScale}
		xAccessor={(item) => item.key}
		yAccessor={(item) => item.projects_value}
		additionalDataAccessor={(item) => item.countries_value}
		groupDataAccessor={(item) => item.groups}
	/>

	<Legend chartDimensions={dimensions} />
</svg>
