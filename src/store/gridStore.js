import { writable } from 'svelte/store'

export const gridStore = writable([])

export const setVisited = (rowIdx, colIdx) => {
	gridStore.update((val) => {
		val[rowIdx][colIdx].visited = true
		return val
	})
}
