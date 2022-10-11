import { filter, groupBy, uniqBy } from 'lodash';

export function getCountsByRegion(data) {
	return Object.entries(groupBy(data, 'region')).map((regionEntry) => {
		const [region, elementsInRegion] = regionEntry;

		const energySourceData = Object.entries(groupBy(elementsInRegion, 'energy_source')).map(
			(energySourceEntry) => {
				const [energySource, elementsWithEnergySource] = energySourceEntry;

				return {
					energy_source: energySource,
					projects: elementsWithEnergySource.length,
					countries: uniqBy(elementsWithEnergySource, 'mapper').length,
					prototypes: filter(elementsWithEnergySource, (item) => item.prototype === 'x').length,
					products: filter(elementsWithEnergySource, (item) => item.product === 'x').length,
					none: filter(
						elementsWithEnergySource,
						(item) => item.product === '' && item.prototype === ''
					).length
				};
			}
		);

		return {
			region: region,
			energy_source: energySourceData
		};
	});
}

export const regionMetadata = [
	{
		color: '#02aad1',
		region: 'Regional Bureau for Africa (RBA)',
		display: ['Regional Bureau for', 'Africa (RBA)']
	},
	{
		color: '#8e4784',
		region: 'Regional Bureau for Arab States (RBAS)',
		display: ['Regional Bureau for', 'Arab States (RBAS)']
	},
	{
		color: '#f59421',
		region: 'Regional Bureau for Asia and Pacific (RBAP)',
		display: ['Regional Bureau for', 'Asia and Pacific (RBAP)']
	},
	{
		color: '#e00102',
		region: 'Regional Bureau for Europe and the Commonwealth of Independent States (RBEC)',
		display: ['Regional Bureau for Europe', 'and the Commonwealth of', 'Independent States (RBEC)']
	},
	{
		color: '#36978e',
		region: 'Regional Bureau for Latin American Countries (RBLAC)',
		display: ['Regional Bureau for', 'Latin American Countries', '(RBLAC)']
	}
];

export const energySourceMetadata = [
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
