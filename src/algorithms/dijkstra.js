import { gridStore } from '../store/gridStore'

export const dijkstra = (grid, startNode, finishNode) => {
	console.log(gridStore)
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
	const { row, col } = node
	const edges = []

	if (row > 0) edges.push(grid[row - 1][col])
	if (row < grid.length - 1) edges.push(grid[row + 1][col])
	if (col > 0) edges.push(grid[row][col - 1])
	if (col < grid[row].length - 1) edges.push(grid[row][col + 1])

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
