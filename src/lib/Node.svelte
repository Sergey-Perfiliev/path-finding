<script>
	export let isStart
	export let isEnd
	export let isShortest
	export let isVisited

	export let isWall = false

	export let onMouseUp
	export let onMouseEnter
	export let onMouseDown

	export let onDragMouseDown
	export let onDragMouseUp

	export let width = 24
	export let height = 24
</script>

<div
	class="node"
	class:isStart
	class:isEnd
	class:isVisited
	class:isShortest
	class:isWall
	on:mouseup={() => onMouseUp($$props)}
	on:mousedown={() => onMouseDown($$props)}
	on:mouseenter={() => onMouseEnter($$props)}
	on:mouseup={() => onDragMouseUp($$props)}
	on:mousedown={() => onDragMouseDown($$props)}
	style="width: {width}px; height: {height}px"
/>

<style>
	.node {
		display: block;
		box-shadow: 0 0 0 2px var(--border-color);
		border: none;
		outline: none;
	}

	.node.isStart {
		background-color: #52b396 !important;
	}

	.node.isEnd {
		background-color: #e6365b !important;
	}

	.isVisited {
		animation: visitedAnimation 1s linear forwards;
	}

	.isShortest {
		animation: pathAnimation 1s linear forwards;
	}

	.isWall {
		background-color: lightgrey !important;
	}

	@keyframes visitedAnimation {
		from {
			background-color: var(--color-primary);
		}

		to {
			background-color: var(--color-secondary);
		}
	}

	@keyframes pathAnimation {
		from {
			background-color: #52b396;
		}

		to {
			background-color: var(--color-primary);
		}
	}
</style>
