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
