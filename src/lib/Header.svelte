<script>
	import Dropdown from './Dropdown.svelte'

	export let currentAlgorithm
	export let items
	export let visualize
	export let clearBoard
	export let clearVisualization
</script>

<header class="header">
	<h1 class="logo">Path finding</h1>
	<ul style="margin-right: 1rem;">
		<Dropdown bind:currentAlgorithm {items} />
	</ul>
	<div style="display: flex; align-items: center;">
		<button on:click={visualize} class="primary" style="margin-right: 1rem;"
			>Find path</button
		>
		<button on:click={clearBoard} style="margin-right: 1rem;"
			>clear board</button
		>
		<button on:click={clearVisualization}>clear visualization</button>
	</div>
</header>

<style>
	.header {
		flex: 0 1 auto;
		display: flex;
		padding: 1rem;
		align-items: center;
	}

	.logo {
		font-size: 2rem;
		margin-right: 1rem;
	}

	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		overflow: hidden;
		background-color: #1a1a1a;
		border-radius: 8px;
	}

	.primary {
		color: #242424;
		background-color: #a3c7fa !important;
	}
</style>
