import { getEdges, getNodes } from './helpers'

export const dijkstra = (grid, startNode, finishNode) => {
	// get unvisited nodes
	const unvisitedNodes = getNodes(grid)

	// update start node distance
	// Infinity -> 0
	startNode.distance = 0

	// set to track all visited nodes
	const visitedNodes = new Set()

	// visit all unvisited nodes
	while (visitedNodes.size !== unvisitedNodes.length) {
		const node = getNodeWithMinDistance(unvisitedNodes, visitedNodes)

		// no nodes to visit
		if (node.distance === Infinity) return Array.from(visitedNodes)

		// mark as visited
		visitedNodes.add(node)

		// find finish node
		if (node === finishNode) return Array.from(visitedNodes)

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
