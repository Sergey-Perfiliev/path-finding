<script>
	import { onMount } from 'svelte'
	import { dijkstra, getPath } from '../algorithms/dijkstra'
	import {
		clearVisualization,
		gridStore,
		setShortest,
		setVisited,
		setWall,
	} from '../store/gridStore'
	import Dropdown from './Dropdown.svelte'
	import Node from './Node.svelte'

	const ALGORITHMS = {
		DIJKSTRA: 'dijkstra',
		A_STAR: 'A*',
	}

	let items = [ALGORITHMS.DIJKSTRA, ALGORITHMS.A_STAR]
	let currentAlgorithm = items[0]

	const COLS = 20
	const ROWS = 10

	const NODE_WIDTH = '32px'
	const NODE_HEIGHT = '32px'

	const START_POS = { colIdx: 5, rowIdx: 5 }
	const FINISH_POS = { colIdx: 15, rowIdx: 5 }

	const visualize = async () => {
		clearVisualization()

		const startNode = $gridStore[START_POS.rowIdx][START_POS.colIdx]
		const finishNode = $gridStore[FINISH_POS.rowIdx][FINISH_POS.colIdx]

		let visitedNodes = new Set()

		switch (currentAlgorithm) {
			case ALGORITHMS.DIJKSTRA:
				visitedNodes = dijkstra($gridStore, startNode, finishNode)
				break

			// TODO: A*
			// case ALGORITHMS.A_STAR:
			// 	visitedNodes = aStar($gridStore, startNode, finishNode)
			// 	break

			default:
				break
		}

		for (let node of visitedNodes) {
			const { rowIdx, colIdx } = node

			await new Promise((resolve) => setTimeout(resolve, 20))
			setVisited(rowIdx, colIdx)
		}

		const pathNodes = getPath(finishNode)
		for (let node of pathNodes) {
			const { rowIdx, colIdx } = node

			await new Promise((resolve) => setTimeout(resolve, 20))
			setShortest(rowIdx, colIdx)
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
					colIdx,
					rowIdx,
					isStart: colIdx === START_POS.colIdx && rowIdx === START_POS.rowIdx,
					isEnd: colIdx === FINISH_POS.colIdx && rowIdx === FINISH_POS.rowIdx,
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

<main>
	<div style="display: flex; justify-content: center; padding: 1rem 0 0;">
		Selected algorithm: <b>{currentAlgorithm}</b>
	</div>
	<div
		class="board-wrapper"
		style="width: 100%; flex: 1 1 auto; display: grid; place-items: center;"
	>
		<div
			class="board"
			style="grid-template-columns: repeat({COLS}, {NODE_WIDTH});"
		>
			{#each $gridStore as row}
				{#each row as { isStart, isEnd, isVisited, isShortest, isWall, rowIdx, colIdx }}
					<Node
						{isStart}
						{isEnd}
						{isVisited}
						{isShortest}
						{isWall}
						{onMouseDown}
						{onMouseEnter}
						{onMouseUp}
						{rowIdx}
						{colIdx}
					/>
				{/each}
			{/each}
		</div>
	</div>
</main>

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

	main {
		display: flex;
		flex-flow: column;
		flex: 1 1 auto;
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
