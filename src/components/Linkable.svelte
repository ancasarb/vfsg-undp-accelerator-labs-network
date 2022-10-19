<script>
	export let link;
	export let color;
</script>

{#if link}
	<a href={link} style="--background-color: {color}" class="cursor-pointer"><slot /></a>
{:else}
	<slot />
{/if}

<style>
	a {
		background-color: var(--background-color);
		color: black;
		padding: 1em 1.5em;
		text-decoration: none;
        margin-top:30px;
	}

	a:hover {
		background-color: AliceBlue;
	}

	a:active {
		background-color: HoneyDew;
	}
</style>
