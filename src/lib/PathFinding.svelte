<script>
	import { onMount } from 'svelte'
	import { dijkstra, getPath } from '../algorithms/dijkstra'
	import {
		gridStore,
		setShortest,
		setVisited,
		setWall,
	} from '../store/gridStore'
	import Dropdown from './Dropdown.svelte'
	import Node from './Node.svelte'

	let items = ['dijkstra', 'A*']
	let method = items[0]

	const COLS = 20
	const ROWS = 10

	const NODE_WIDTH = '32px'
	const NODE_HEIGHT = '32px'

	const START_POS = { col: 5, row: 5 }
	const FINISH_POS = { col: 15, row: 5 }

	const visualize = async () => {
		const startNode = $gridStore[START_POS.row][START_POS.col]
		const finishNode = $gridStore[FINISH_POS.row][FINISH_POS.col]

		const visitedNodes = dijkstra($gridStore, startNode, finishNode)
		for (let node of visitedNodes) {
			const { row, col } = node

			await new Promise((resolve) => setTimeout(resolve, 20))
			setVisited(row, col)
		}

		const pathNodes = getPath(finishNode)
		for (let node of pathNodes) {
			const { row, col } = node

			await new Promise((resolve) => setTimeout(resolve, 20))
			setShortest(row, col)
		}
	}

	const clearBoard = () => {
		initializeGrid()
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
					isShortest: false,
					distance: Infinity,
					isVisited: false,
					isWall: false,
					prevNode: null,
				})
			}
			gridData.push(row)
		}

		$gridStore = gridData
	}

	let isWallMode = false

	const onMouseEnter = (rowIdx, colIdx) => {
		if (!isWallMode) return
		setWall(rowIdx, colIdx)
	}

	const onMouseDown = (rowIdx, colIdx) => {
		isWallMode = true
		setWall(rowIdx, colIdx)
	}

	const onMouseUp = () => {
		isWallMode = false
	}

	onMount(() => {
		initializeGrid()
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
		{#each $gridStore as gRow}
			{#each gRow as { isStart, isEnd, isVisited, isShortest, isWall, row, col }}
				<Node
					{isStart}
					{isEnd}
					{isVisited}
					{isShortest}
					{isWall}
					{onMouseDown}
					{onMouseEnter}
					{onMouseUp}
					rowIdx={row}
					colIdx={col}
				/>
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
