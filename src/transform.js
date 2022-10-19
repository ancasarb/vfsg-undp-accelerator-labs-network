import { filter, groupBy, orderBy, uniqBy } from 'lodash';
import { sdgs } from './metadata.js';

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
	let totalProjectsByEnergySource = Object.entries(groupBy(data, 'energy_source')).map(
		(energySourceEntry) => {
			const [energySource, elementsWithEnergySource] = energySourceEntry;

			return {
				energy_source: energySource,
				total_projects: elementsWithEnergySource.length
			};
		}
	);

	return orderBy(totalProjectsByEnergySource, 'total_projects', ['desc']).map(
		(d) => d['energy_source']
	);
}

export function getCountsByRegionAndSDG(data) {
	return Object.entries(groupBy(data, 'region')).map((regionEntry) => {
		const [region, elementsInRegion] = regionEntry;

		const sdgData = sdgs.map((sdg) => {
			const filtered = elementsInRegion.filter(
				(e) =>
					e.sdg1 === sdg.sdg ||
					e.sdg2 === sdg.sdg ||
					e.sdg3 === sdg.sdg ||
					e.sdg4 === sdg.sdg ||
					e.sdg5 === sdg.sdg
			);

			return {
				sdg: sdg.sdg,
				projects: filtered.length,
				countries: uniqBy(filtered, 'mapper').length,
				prototypes: filter(filtered, (item) => item.prototype === 'x').length,
				products: filter(filtered, (item) => item.product === 'x').length,
				none: filter(filtered, (item) => item.product === '' && item.prototype === '').length
			};
		});

		return {
			region: region,
			sdg: sdgData
		};
	});
}

export function getSDGsSortedByTotalProjects(data) {
	const sdgData = sdgs.map((sdg) => {
		const filtered = data.filter(
			(e) =>
				e.sdg1 === sdg.sdg ||
				e.sdg2 === sdg.sdg ||
				e.sdg3 === sdg.sdg ||
				e.sdg4 === sdg.sdg ||
				e.sdg5 === sdg.sdg
		);

		return {
			sdg: sdg,
			total_projects: filtered.length
		};
	});

	return orderBy(sdgData, 'total_projects', ['desc']).map((d) => d.sdg);
}
