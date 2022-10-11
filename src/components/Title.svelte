<script>
    export let chartDimensions;

    const padding = 20;
</script>

<text x={30} y={chartDimensions.margin.top / 2}>Project distribution</text>
<text x={30} y={chartDimensions.margin.top / 2 + padding}>across countries</text>
<text x={30} y={chartDimensions.margin.top / 2 + padding * 2}>regions,</text>
<text x={30} y={chartDimensions.margin.top / 2 + padding * 3}>and energy sources</text>


<style>
    text {
        font-size: 18px;
        font-weight: bold;
        text-anchor:start;
    }
</style>