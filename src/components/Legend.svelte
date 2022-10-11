<script>
	import textures from 'textures';
    import { select } from 'd3';

	export let chartDimensions;

	const x = chartDimensions.width - 100 - chartDimensions.margin.right / 2;
	const initialY = chartDimensions.margin.top / 2;

	const padding = 15;

	const barTexture = textures
		.lines()
		.orientation('6/8')
		.stroke('#02aad1')
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

	<rect x={x + 100} y={initialY + 110} width={20} height={70} fill="#02aad1" stroke="#02aad1"/>
	<line x1={x + 110} y1={initialY + 170} x2={x + 110} y2={initialY + 210} stroke="black" />
    <text class="annotation" x={x + 107} y={initialY + 220}>total</text>
    <text class="annotation" x={x + 107} y={initialY + 220 + padding}>no. projects</text>

	<rect x={x + 122} y={initialY + 150} width={10} height={30} stroke="#02aad1" fill="white" />
    <line x1={x + 127} y1={initialY + 165} x2={x + 152} y2={initialY + 165} stroke="black" />
    <text class="annotation" x={x + 190} y={initialY + 168}>no. projects</text>
    <text class="annotation" x={x + 190} y={initialY + 168 + padding}>described as a</text>
    <text class="annotation" x={x + 190} y={initialY + 168 + padding * 2}>prototype</text>
    
	<rect x={x + 88} y={initialY + 140} width={10} height={40} stroke="#02aad1" fill={barTexture.url()} />
    <line x1={x + 70} y1={initialY + 160} x2={x + 95} y2={initialY + 160} stroke="black" />
    <text class="annotation" x={x + 35} y={initialY + 165}>no. projects</text>
    <text class="annotation" x={x + 35} y={initialY + 165 + padding}>described as a</text>
    <text class="annotation" x={x + 35} y={initialY + 165 + padding * 2}>product</text>
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
