<script>
	import load from '../routes/api/api';
	import Linkable from '../components/Linkable.svelte';
</script>

<main>
	<Linkable link="/energysources"
		><h1>Project distribution across countries, regions, and energy sources</h1></Linkable
	>

	<Linkable link="/sdgs"
		><h1>
			Project distribution across countries, regions, and sustainable development goals
		</h1></Linkable
	>
</main>

<style>
	main {
		font-family: 'Inter', sans-serif;
	}
</style>
