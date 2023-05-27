export const dijkstra = (grid, startNode, finishNode) => {
	// get unvisited nodes
	const unvisitedNodes = getNodes(grid)

	// update start node distance
	// Infinity -> 0
	startNode.distance = 0

	const visitedNodes = new Set()

	// visit all unvisited nodes
	while (visitedNodes.size !== unvisitedNodes.length) {
		const node = getNodeWithMinDistance(unvisitedNodes, visitedNodes)

		// no nodes to visit
		if (node.distance === Infinity) return visitedNodes

		// mark as visited
		visitedNodes.add(node)

		// find finish node
		if (node === finishNode) return visitedNodes

		const edges = getEdges(grid, node)
		for (let edge of edges) {
			if (edge.isWall) continue

			// should not check visited node twice
			if (visitedNodes.has(edge)) continue

			// update edges
			edge.distance = node.distance + 1
			edge.prevNode = node
		}
	}
}

// reconfigure grid
// from 2d array to 1d array
const getNodes = (grid) => {
	return [].concat(...grid)
}

// get neighbors of current node
const getEdges = (grid, node) => {
	const { rowIdx, colIdx } = node
	const edges = []

	if (rowIdx > 0) edges.push(grid[rowIdx - 1][colIdx])
	if (rowIdx < grid.length - 1) edges.push(grid[rowIdx + 1][colIdx])
	if (colIdx > 0) edges.push(grid[rowIdx][colIdx - 1])
	if (colIdx < grid[rowIdx].length - 1) edges.push(grid[rowIdx][colIdx + 1])

	return edges
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

// get node with minimum distance from unvisited array
const getNodeWithMinDistance = (unvisitedNodes, visitedNodes) => {
	let currMinDistance = Infinity
	let minNode = null

	for (let node of unvisitedNodes) {
		if (visitedNodes.has(node)) continue
		if (node.distance <= currMinDistance) {
			minNode = node
			currMinDistance = node.distance
		}
	}

	return minNode
}
