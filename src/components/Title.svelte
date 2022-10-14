<script>
	export let chartDimensions;
</script>

<text
	x={chartDimensions.margin.left + chartDimensions.innerWidth / 2}
	y={chartDimensions.height - 4}
	>Project distribution across countries, regions, and energy sources</text
>

<style>
	text {
		font-size: 16px;
		font-weight: bold;
		text-anchor: middle;
	}
</style>
