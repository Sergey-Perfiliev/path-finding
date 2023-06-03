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
/>

<style>
	.node {
		display: block;
		width: 32px;
		height: 32px;
		border: 1px solid #ffffff;
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
			background-color: #646cff;
		}

		to {
			background-color: #a3c7fa;
		}
	}

	@keyframes pathAnimation {
		from {
			background-color: #52b396;
		}

		to {
			background-color: #646cff;
		}
	}
</style>
