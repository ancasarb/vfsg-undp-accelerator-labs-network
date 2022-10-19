<script>
	import load from '../api/api';
	import SustainableDevelopmentGoalsChart from '../../charts/SustainableDevelopmentGoalsChart.svelte';

</script>

<main>
	{#await load('/api/undp')}
		<p>loading</p>
	{:then data}
		<SustainableDevelopmentGoalsChart {data} />
	{/await}
</main>

<style>
	main {
		font-family: 'Inter', sans-serif;
	}
</style>
