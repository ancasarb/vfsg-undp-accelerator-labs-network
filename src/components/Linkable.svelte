<script>
	export let link;
</script>
{#if link}
	<a href={link} class="cursor-pointer"><slot></slot></a>
{:else}
	<slot></slot>
{/if}