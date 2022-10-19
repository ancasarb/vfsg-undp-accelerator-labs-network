<script>
	import load from '../api/api';
	import EnergySourcesChart from '../../charts/EnergySourcesChart.svelte';
</script>

<main>
	{#await load('/api/undp')}
		<p>loading</p>
	{:then data}
		<EnergySourcesChart {data} />
	{/await}
</main>

<style>
	main {
		font-family: 'Inter', sans-serif;
	}
</style>