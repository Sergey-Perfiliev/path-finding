import { getEdges } from './helpers'

export const aStart = (grid, startNode, finishNode) => {
	startNode.g = 0
	startNode.f = 0

	const openSet = [startNode]
	const closedSet = []

	while (openSet.length > 0) {
		const [node, lowestIdx] = getClosesNode(openSet)

		if (node === finishNode) return closedSet

		openSet.splice(lowestIdx, 1)
		closedSet.push(node)

		const edges = getEdges(grid, node)
		for (let edge of edges) {
			if (edge.isWall) continue
			if (closedSet.includes(edge)) continue

			const g = node.g + 1

			if (!openSet.includes(edge)) {
				openSet.push(edge)
			} else if (g <= edge.g) {
				continue
			}

			edge.g = g
			edge.h = getHeuristicDistance(edge, finishNode)
			edge.f = edge.g + edge.h
			edge.prevNode = node
		}
	}

	return closedSet
}

const getClosesNode = (openSet) => {
	let lowestIdx = 0

	for (let i = 0; i < openSet.length; ++i) {
		if (openSet[i].f < openSet[lowestIdx].f) {
			lowestIdx = i
		}
	}

	return [openSet[lowestIdx], lowestIdx]
}

// The Manhattan Distance Heuristic
const getHeuristicDistance = (currentNode, finishNode) => {
	// h = |x_start - x_destination| + |y_start - y_destination|
	return (
		Math.abs(currentNode.rowIdx - finishNode.rowIdx) +
		Math.abs(currentNode.colIdx - finishNode.colIdx)
	)
}
