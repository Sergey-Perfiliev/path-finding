<script>
	import { onMount } from 'svelte'
	import { aStart } from '../algorithms/astar'
	import { dijkstra } from '../algorithms/dijkstra'
	import { getPath } from '../algorithms/helpers'
	import {
		clearVisualization,
		getFinishNode,
		getStartNode,
		gridStore,
		setShortest,
		setVisited,
		setWall,
		updateBoundaryNodePosition,
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

	const NODE_WIDTH = '24px'
	const NODE_HEIGHT = '24px'

	const START_POS = { colIdx: 10, rowIdx: 7 }
	const FINISH_POS = { colIdx: 30, rowIdx: 7 }

	const timeout = async (ms) => {
		await new Promise((resolve) => setTimeout(resolve, ms))
	}

	const visualize = async () => {
		clearVisualization()

		const startNode = getStartNode()
		const finishNode = getFinishNode()

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

			await timeout(10)
			setVisited(rowIdx, colIdx)
		}

		const pathNodes = getPath(finishNode)
		for (let node of pathNodes) {
			const { rowIdx, colIdx } = node

			await timeout(50)
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

	const onMouseEnter = (node) => {
		const { rowIdx, colIdx } = node

		if (!isWallMode) return

		setWall(rowIdx, colIdx)
	}

	const onMouseDown = (node) => {
		const { rowIdx, colIdx, isStart, isEnd } = node

		if (isStart || isEnd) return

		isWallMode = true
		setWall(rowIdx, colIdx)
	}

	const onMouseUp = () => {
		isWallMode = false
	}

	let dragInfo = {
		mode: false,
		position: null,
		boundaryNode: null,
		targetNode: null,
	}

	const onDragMouseDown = (node) => {
		const { isStart, isEnd } = node

		if (!isStart && !isEnd) return

		dragInfo = {
			...dragInfo,
			position: isStart ? 'isStart' : 'isEnd',
			mode: true,
			boundaryNode: node,
		}
	}

	const onDragMouseUp = (node) => {
		if (!dragInfo.mode) return

		dragInfo = {
			...dragInfo,
			mode: true,
			targetNode: node,
		}

		updateBoundaryNodePosition(
			dragInfo.boundaryNode,
			dragInfo.targetNode,
			dragInfo.position
		)
		clearVisualization()
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

<main
	on:mouseup={() => {
		isWallMode = false
		dragInfo.mode = false
	}}
>
	<p class="selected-algorithm">
		Selected algorithm: <b>{currentAlgorithm}</b>
	</p>
	<div class="board-wrapper">
		<div
			class="board"
			style="grid-template-columns: repeat({COLS}, {NODE_WIDTH});"
		>
			{#each $gridStore as row (row)}
				{#each row as node (node)}
					<Node
						{...node}
						{onMouseDown}
						{onMouseEnter}
						{onMouseUp}
						{onDragMouseDown}
						{onDragMouseUp}
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

	.selected-algorithm {
		display: flex;
		color: var(--font-color);
		justify-content: center;
		padding: 1rem 0 0;
	}

	.board-wrapper {
		width: 100%;
		flex: 1 1 auto;
		display: grid;
		place-items: center;
	}

	.board {
		display: grid;
		grid-gap: 2px;
	}
</style>
