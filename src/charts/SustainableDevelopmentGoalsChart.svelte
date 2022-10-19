<script>
	import { getCountsByRegionAndSDG, getSDGsSortedByTotalProjects } from '../transform';

	import { sdgs, sdgsPadding } from '../metadata.js';

	import { scaleBand, scaleLinear } from 'd3';
	import { find, max, uniq } from 'lodash';

	import XAxis from '../components/XAxis.svelte';
	import YAxis from '../components/YAxis.svelte';
	import Gridlines from '../components/Gridlines.svelte';
	import Legend from '../components/Legend.svelte';
	import Title from '../components/Title.svelte';
	import Rows from '../components/Rows.svelte';

	import { color, display } from '../metadata.js';

	export let data;

	const dimensions = {
		width: 1520,
		height: 1050,
		margin: {
			top: 350,
			left: 180,
			bottom: 25,
			right: 300
		},
		rowHeight: 120
	};

	dimensions.innerWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;

	const regionAccessor = (d) => d.region;
	const sdgAccessor = (d) => d.sdg;
	const projectsAccessor = (d) => d.projects;
	const countriesAccessor = (d) => d.countries;

	$: regionSDGData = getCountsByRegionAndSDG(data);

	$: regions = uniq(regionSDGData.map(regionAccessor)).sort();
	$: maxProjects = max(regionSDGData.map(sdgAccessor).flat().map(projectsAccessor));

	$: xScaleDomain = getSDGsSortedByTotalProjects(data).map(sdgAccessor);

	$: xScale = scaleBand().domain(xScaleDomain).rangeRound([0, dimensions.innerWidth]).padding(0.5);
	$: yScale = scaleLinear().domain([0, maxProjects]).range([dimensions.rowHeight, 10]);

	$: chartRows = regions.map((region) => {
		const items = sdgAccessor(find(regionSDGData, { region: region })).map((item) => {
			const sdg = sdgAccessor(item);
			return {
				key: sdg,
				projects_value: projectsAccessor(item),
				countries_value: countriesAccessor(item),
				groups: [item.products, item.prototypes]
			};
		});

		return {
			color: color[region],
			items: items
		};
	});
</script>

<svg width={dimensions.width} height={dimensions.height}>
	<Title
		chartDimensions={dimensions}
		title="PROJECT DISTRIBUTION ACROSS COUNTRIES, REGIONS, AND SUSTAINABLE DEVELOPMENT GOALS"
	/>

	<g transform={`translate(0, 70)`}>
		<XAxis
			chartDimensions={dimensions}
			labels={xScaleDomain.map((e) => {
				return {
					label: find(sdgs, { sdg: e }).name + ' (SDG ' + e + ')',
					xPosition: xScale(e),
					padding: sdgsPadding[find(sdgs, { sdg: e }).name]
				};
			})}
		/>
		<Gridlines chartDimensions={dimensions} xPositions={xScaleDomain.map(xScale)} />

		<YAxis
			chartDimensions={dimensions}
			labels={regions.map((r) => display[r])}
			rowYScale={yScale}
			ticks={[0, 15, 30, 45, 60, 75, 90]}
		/>

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

		<Legend
			chartDimensions={dimensions}
			x={dimensions.width - dimensions.margin.right}
			y={dimensions.margin.top - 20}
			notes={[
				'The sustainable development goals are',
				'positioned according to the total number',
				'of projects across all regions.'
			]}
		/>
	</g>
</svg>
