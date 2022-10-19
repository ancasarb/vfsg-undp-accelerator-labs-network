<script>
	import load from '../routes/api/api';
	import Linkable from '../components/Linkable.svelte';
</script>

<main>
	<Linkable link="/energysources" color="Linen"
		><h1>View project distribution across countries, regions, and energy sources</h1></Linkable
	>

	<Linkable link="/sdgs" color="WhiteSmoke"
		><h1>
			View project distribution across countries, regions, and sustainable development goals
		</h1></Linkable
	>
</main>

<style>
	main {
		font-family: 'Inter', sans-serif;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
</style>
