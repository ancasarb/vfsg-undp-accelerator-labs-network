import { groupBy, uniqBy } from 'lodash';

export function getCountsByEnergySource(data) {
	return Object.entries(groupBy(data, 'energy_source')).map((energySourceEntry) => {
		const [energySource, elementsWithEnergySource] = energySourceEntry;

		const regionData = Object.entries(groupBy(elementsWithEnergySource, 'region')).map(
			(regionEntry) => {
				const [region, elementsInRegion] = regionEntry;

				return {
					region: region,
					projects: elementsInRegion.length,
					countries: uniqBy(elementsInRegion, 'mapper').length
				};
			}
		);

		return {
			energy_source: energySource,
			region: regionData
		};
	});
}

export function getCountsByRegion(data) {
	return Object.entries(groupBy(data, 'region')).map((regionEntry) => {
		const [region, elementsInRegion] = regionEntry;

		const energySourceData = Object.entries(groupBy(elementsInRegion, 'energy_source')).map(
			(energySourceEntry) => {
				const [energySource, elementsWithEnergySource] = energySourceEntry;

				return {
					energy_source: energySource,
					projects: elementsWithEnergySource.length,
					countries: uniqBy(elementsWithEnergySource, 'mapper').length
				};
			}
		);

		return {
			region: region,
			energy_source: energySourceData
		};
	});
}

export const metadata = [
	{
		color: '#02aad1',
		region: 'Regional Bureau for Africa (RBA)',
		display: ['Regional Bureau for', 'Africa (RBA)']
	},
	{
		color: '#013466',
		region: 'Regional Bureau for Arab States (RBAS)',
		display: ['Regional Bureau for', 'Arab States (RBAS)']
	},
	{
		color: '#f59421',
		region: 'Regional Bureau for Asia and Pacific (RBAP)',
		display: ['Regional Bureau for', 'Asia and Pacific (RBAP)']
	},
	{
		color: '#e00100',
		region: 'Regional Bureau for Europe and the Commonwealth of Independent States (RBEC)',
		display: ['Regional Bureau for Europe', 'and the Commonwealth of', 'Independent States (RBEC)']
	},
	{
		color: '#990002',
		region: 'Regional Bureau for Latin American Countries (RBLAC)',
		display: ['Regional Bureau for', 'Latin American Countries', '(RBLAC)']
	}
];

export const energySourcePadding = [
	{ energySource: 'N/A', padding: 45 },
	{ energySource: 'Chemical', padding: 75 },
	{ energySource: 'Household application', padding: 150 },
	{ energySource: 'Hydro', padding: 60 },
	{ energySource: 'Mechanical', padding: 90 },
	{ energySource: 'Non-renewable', padding: 110 },
	{ energySource: 'Renewable general', padding: 135 },
	{ energySource: 'Solar', padding: 55 },
	{ energySource: 'Solar / Thermal', padding: 110 },
	{ energySource: 'Thermal', padding: 70 },
	{ energySource: 'Wind', padding: 55 }
];
