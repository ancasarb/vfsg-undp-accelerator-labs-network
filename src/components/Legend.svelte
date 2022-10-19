<script>
	import { select } from 'd3';
	import { getTexture } from '../metadata';

	export let chartDimensions;
	export let x = chartDimensions.width - 100 - chartDimensions.margin.right / 2;
	export let y = chartDimensions.margin.top + 100;

	const padding = 15;

	const color = '#5A5A5A';
	const groupTexture = getTexture(color);

	let group;
	$: {
		select(group).call(groupTexture);
	}
</script>

<g bind:this={group}>
	<text class="title" {x} {y}>How to read it?</text>
	{#each ['The energy sources are positioned', 'according to the total number of projects', 'across all regions.'] as note, i}
		<text class="note" {x} y={y + padding * (i + 2)}>{note}</text>
	{/each}

	<rect x={x + 100} y={y + 110} width={20} height={70} fill={color} stroke={color} />
	<line x1={x + 110} y1={y + 170} x2={x + 110} y2={y + 210} stroke="black" />
	{#each ['total', 'no. projects'] as anotation, i}
		<text class="annotation" x={x + 107} y={y + 220 + padding * i}>{anotation}</text>
	{/each}

	<rect x={x + 122} y={y + 150} width={10} height={30} stroke={color} fill="white" />
	<line x1={x + 127} y1={y + 165} x2={x + 152} y2={y + 165} stroke="black" />
	{#each ['no. projects', 'described as a', 'prototype'] as anotation, i}
		<text class="annotation" x={x + 190} y={y + 168 + padding * i}>{anotation}</text>
	{/each}

	<rect x={x + 88} y={y + 140} width={10} height={40} stroke={color} fill={groupTexture.url()} />
	<line x1={x + 70} y1={y + 160} x2={x + 95} y2={y + 160} stroke="black" />
	{#each ['no. projects', 'described as a', 'product'] as anotation, i}
		<text class="annotation" x={x + 35} y={y + 165 + padding * i}>{anotation}</text>
	{/each}

	{#each [...Array(5).keys()] as i}
		{@const dX = x + 100 + i * 3 + 1.5}
		<line x1={dX} y1={y + 105} x2={dX} y2={y + 110} stroke="black" />
	{/each}
	<line x1={x + 115} y1={y + 107.5} x2={x + 155} y2={y + 107.5} stroke="black" />
	{#each ['no. countries', 'from which the', 'projects originate'] as anotation, i}
		<text class="annotation" x={x + 200} y={y + 110 + padding * i}>{anotation}</text>
	{/each}

	{#each ['Note: Some projects have not been', 'categorized either as a prototype', 'or a product.'] as note, i}
		<text class="note" {x} y={y + 300 + padding * i}>{note}</text>
	{/each}
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
