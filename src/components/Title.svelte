<script>
	export let chartDimensions;
    export let title;
</script>

<text
	x={chartDimensions.margin.left + chartDimensions.innerWidth / 2}
	y={chartDimensions.height - 4}
	>{title}</text
>

<style>
	text {
		font-size: 16px;
		font-weight: bold;
		text-anchor: middle;
	}
</style>
