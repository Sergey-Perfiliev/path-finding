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
