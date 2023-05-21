<script>
	import { onMount } from 'svelte'
	import { gridStore, setVisited } from '../store/gridStore'
	import Dropdown from './Dropdown.svelte'
	import Node from './Node.svelte'

	let items = ['dijkstra', 'test']
	let method = items[0]

	const COLS = 20
	const ROWS = 10

	const NODE_WIDTH = '32px'
	const NODE_HEIGHT = '32px'

	const START_POS = { col: 5, row: 5 }
	const FINISH_POS = { col: 15, row: 5 }

	const visualize = () => {
		console.log('visualize: ', method)
	}

	const clearBoard = () => {
		console.log('clearBoard')
	}

	const initializeGrid = () => {
		const gridData = []
		for (let rowIdx = 0; rowIdx < ROWS; ++rowIdx) {
			const row = []
			for (let colIdx = 0; colIdx < COLS; ++colIdx) {
				row.push({
					col: colIdx,
					row: rowIdx,
					isStart: colIdx === START_POS.col && rowIdx === START_POS.row,
					isEnd: colIdx === FINISH_POS.col && rowIdx === FINISH_POS.row,
					distance: Infinity,
					visited: false,
				})
			}
			gridData.push(row)
		}

		$gridStore = gridData
	}

	onMount(async () => {
		initializeGrid()

		for (let i = 0; i < ROWS; ++i) {
			for (let j = 0; j < COLS; ++j) {
				await new Promise((resolve) => setTimeout(resolve, 50))
				setVisited(i, j)
			}
		}
	})
</script>

<header class="header">
	<h1 class="logo">Path finding</h1>
	<ul style="margin-right: 1rem;">
		<Dropdown bind:method {items} />
	</ul>
	<div style="display: flex; align-items: center;">
		<button on:click={visualize} class="primary" style="margin-right: 1rem;"
			>Find path</button
		>
		<button on:click={clearBoard}>clear board</button>
	</div>
</header>

<main>
	<div>
		Selected algorithm: <b>{method}</b>
	</div>
	<div
		class="board"
		style="grid-template-columns: repeat({COLS}, {NODE_WIDTH});"
	>
		{#each $gridStore as row}
			{#each row as node}
				<Node {...node} />
			{/each}
		{/each}
	</div>
</main>

<style>
	.header {
		display: flex;
		padding: 1rem;
		align-items: center;
	}

	.logo {
		font-size: 2rem;
		margin-right: 1rem;
	}

	main {
		display: grid;
		place-items: center;
	}

	.board {
		display: grid;
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
