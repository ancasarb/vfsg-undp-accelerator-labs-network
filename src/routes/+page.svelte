<script>
	import load from '../routes/api/api';
	import EnergySourcesChart from '../charts/EnergySourcesChart.svelte';
	import SustainableDevelopmentGoalsChart from '../charts/SustainableDevelopmentGoalsChart.svelte';
</script>

<main>
	{#await load('/api/undp')}
		<p>loading</p>
	{:then data}
		<EnergySourcesChart {data} />
		<SustainableDevelopmentGoalsChart {data} />
	{/await}
</main>

<style>
	main {
		font-family: 'Inter', sans-serif;
	}
</style>
