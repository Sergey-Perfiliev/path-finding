// reconfigure grid
// from 2d array to 1d array
export const getNodes = (grid) => {
	return [].concat(...grid)
}

// return path from start to finish node
export const getPath = (finishNode) => {
	const pathNodes = []
	let currNode = finishNode

	while (currNode !== null) {
		pathNodes.unshift(currNode)
		currNode = currNode.prevNode
	}

	return pathNodes
}

// get neighbors of current node
export const getEdges = (grid, node) => {
	const { rowIdx, colIdx } = node
	const edges = []

	if (rowIdx > 0) edges.push(grid[rowIdx - 1][colIdx])
	if (rowIdx < grid.length - 1) edges.push(grid[rowIdx + 1][colIdx])
	if (colIdx > 0) edges.push(grid[rowIdx][colIdx - 1])
	if (colIdx < grid[rowIdx].length - 1) edges.push(grid[rowIdx][colIdx + 1])

	return edges
}
