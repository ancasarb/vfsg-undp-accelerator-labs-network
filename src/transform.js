import { filter, groupBy, orderBy, uniqBy } from 'lodash';

export function getCountsByRegionAndEnergySource(data) {
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

export function getEnergySourcesSortedByTotalProjects(data) {
	let totalProjectsByEnergySource = Object.entries(groupBy(data, 'energy_source')).map((energySourceEntry) => {
		const [energySource, elementsWithEnergySource] = energySourceEntry;

		return {
			energy_source: energySource,
			total_projects: elementsWithEnergySource.length
		};
	});

	return orderBy(totalProjectsByEnergySource, 'total_projects', ['desc']).map((d) => d['energy_source']);
}
