import { writable } from 'svelte/store'

export const gridStore = writable([])

export const setVisited = (rowIdx, colIdx) => {
	gridStore.update((val) => {
		val[rowIdx][colIdx].isVisited = true
		return val
	})
}

export const setShortest = (rowIdx, colIdx) => {
	gridStore.update((val) => {
		val[rowIdx][colIdx].isShortest = true
		return val
	})
}

export const setWall = (rowIdx, colIdx) => {
	gridStore.update((val) => {
		val[rowIdx][colIdx].isWall = !val[rowIdx][colIdx].isWall
		return val
	})
}

export const clearVisualization = () => {
	gridStore.update((val) => {
		for (let row of val) {
			for (let node of row) {
				node.isVisited = false
				node.isShortest = false
				node.prevNode = null
				node.distance = Infinity
			}
		}

		return val
	})
}

export const getStoreVal = () => {
	let val
	gridStore.subscribe(($) => (val = $))
	return val || []
}

export const getStartNode = () => {
	for (let row of getStoreVal()) {
		for (let node of row) {
			if (!node.isStart) continue
			return node
		}
	}
}

export const getFinishNode = () => {
	for (let row of getStoreVal()) {
		for (let node of row) {
			if (!node.isEnd) continue
			return node
		}
	}
}

export const updateBoundaryNodePosition = (startNode, targetNode, position) => {
	gridStore.update((val) => {
		val[startNode.rowIdx][startNode.colIdx][position] = false
		val[targetNode.rowIdx][targetNode.colIdx][position] = true
		return val
	})
}
