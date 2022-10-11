<script>
	import textures from 'textures';
    import { select } from 'd3';

	export let chartDimensions;

	const x = chartDimensions.width - 100 - chartDimensions.margin.right / 2;
	const initialY = chartDimensions.margin.top;

	const padding = 15;

	const barTexture = textures
		.lines()
		.orientation('6/8')
		.stroke('#5A5A5A')
		.lighter()
		.lighter()
		.thicker()
		.thicker();

	let group;
	$: {
		select(group).call(barTexture);
	}
</script>

<g bind:this={group}>
	<text class="title" {x} y={initialY}>How to read it?</text>
	<text class="note" {x} y={initialY + padding * 2}>The energy sources are positioned</text>
	<text class="note" {x} y={initialY + padding * 3}
		>according to the total number of projects</text
	>
	<text class="note" {x} y={initialY + padding * 4}>across all regions.</text>

	<rect x={x + 100} y={initialY + 110} width={20} height={70} fill="#5A5A5A" stroke="#5A5A5A"/>
	<line x1={x + 110} y1={initialY + 170} x2={x + 110} y2={initialY + 210} stroke="black" />
    <text class="annotation" x={x + 107} y={initialY + 220}>total</text>
    <text class="annotation" x={x + 107} y={initialY + 220 + padding}>no. projects</text>

	<rect x={x + 122} y={initialY + 150} width={10} height={30} stroke="#5A5A5A" fill="white" />
    <line x1={x + 127} y1={initialY + 165} x2={x + 152} y2={initialY + 165} stroke="black" />
    <text class="annotation" x={x + 190} y={initialY + 168}>no. projects</text>
    <text class="annotation" x={x + 190} y={initialY + 168 + padding}>described as a</text>
    <text class="annotation" x={x + 190} y={initialY + 168 + padding * 2}>prototype</text>
    
	<rect x={x + 88} y={initialY + 140} width={10} height={40} stroke="#5A5A5A" fill={barTexture.url()} />
    <line x1={x + 70} y1={initialY + 160} x2={x + 95} y2={initialY + 160} stroke="black" />
    <text class="annotation" x={x + 35} y={initialY + 165}>no. projects</text>
    <text class="annotation" x={x + 35} y={initialY + 165 + padding}>described as a</text>
    <text class="annotation" x={x + 35} y={initialY + 165 + padding * 2}>product</text>

    {#each [...Array(5).keys()] as i}
    {@const addnDataX = x + 100 + i * 3 + 1.5}
        <line x1={addnDataX} y1={initialY + 105} x2={addnDataX} y2={initialY + 110} stroke="black" />
    {/each}
    <line x1={x + 115} y1={initialY + 107.5} x2={x + 155} y2={initialY + 107.5} stroke="black" />
    <text class="annotation" x={x + 200} y={initialY + 110}>no. countries</text>
    <text class="annotation" x={x + 200} y={initialY + 110 + padding}>from which the</text>
    <text class="annotation" x={x + 200} y={initialY + 110 + padding * 2}>projects originate</text>

    <text class="note" x={x} y={initialY + 300}>Note: Some projects have not been</text>
    <text class="note" x={x} y={initialY + 300 + padding}>categorized either as a prototype</text>
    <text class="note" x={x} y={initialY + 300 + padding * 2}>or a product.</text>

</g>

<style>
	.title {
		font-size: 16px;
		fill: black;
		font-weight: bold;
		text-decoration: underline;
	}

	.annotation {
		font-size: 12px;
        text-anchor: middle;
	}

    .note {
		font-size: 12px;
	}
</style>
