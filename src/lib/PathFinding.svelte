<script>
	import { onMount } from 'svelte'
	import { aStart } from '../algorithms/astar'
	import { dijkstra } from '../algorithms/dijkstra'
	import { getPath } from '../algorithms/helpers'
	import {
		clearVisualization,
		gridStore,
		setShortest,
		setVisited,
		setWall,
	} from '../store/gridStore'
	import Header from './Header.svelte'
	import Node from './Node.svelte'

	const ALGORITHMS = {
		DIJKSTRA: 'dijkstra',
		A_STAR: 'A*',
	}

	let items = [ALGORITHMS.DIJKSTRA, ALGORITHMS.A_STAR]
	let currentAlgorithm = items[0]

	const COLS = 41
	const ROWS = 15

	const NODE_WIDTH = '32px'
	const NODE_HEIGHT = '32px'

	const START_POS = { colIdx: 10, rowIdx: 7 }
	const FINISH_POS = { colIdx: 30, rowIdx: 7 }

	const visualize = async () => {
		clearVisualization()

		const startNode = $gridStore[START_POS.rowIdx][START_POS.colIdx]
		const finishNode = $gridStore[FINISH_POS.rowIdx][FINISH_POS.colIdx]

		let visitedNodes = []

		switch (currentAlgorithm) {
			case ALGORITHMS.DIJKSTRA:
				visitedNodes = dijkstra($gridStore, startNode, finishNode)
				break

			case ALGORITHMS.A_STAR:
				visitedNodes = aStart($gridStore, startNode, finishNode)
				break

			default:
				break
		}

		for (let node of visitedNodes) {
			const { rowIdx, colIdx } = node

			await new Promise((resolve) => setTimeout(resolve, 10))
			setVisited(rowIdx, colIdx)
		}

		const pathNodes = getPath(finishNode)
		for (let node of pathNodes) {
			const { rowIdx, colIdx } = node

			await new Promise((resolve) => setTimeout(resolve, 10))
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
					// aStar
					f: Infinity,
					g: Infinity,
					h: 0,
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

<Header
	bind:currentAlgorithm
	{visualize}
	{clearBoard}
	{clearVisualization}
	{items}
/>

<main>
	<p style="display: flex; justify-content: center; padding: 1rem 0 0;">
		Selected algorithm: <b>{currentAlgorithm}</b>
	</p>
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
	main {
		display: flex;
		flex-flow: column;
		flex: 1 1 auto;
	}

	.board {
		display: grid;
	}
</style>
