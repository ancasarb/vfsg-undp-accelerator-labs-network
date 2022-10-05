<script>
    import load from '../routes/api/api';
	import Chart from './Chart.svelte';

</script>

<main>
    {#await load('/api/undp')}
    <p>loading</p>
{:then data}
    <Chart {data} />
{/await}
</main>

<style>
	main {
		font-family: 'Inter', sans-serif;
	}
</style>