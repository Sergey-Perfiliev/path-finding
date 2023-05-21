<script>
	export let col
	export let row

	export let isStart
	export let isEnd

	export let distance
	export let visited
</script>

<div class="node" class:isStart class:isEnd class:isVisited={visited} />

<style>
	.node {
		display: block;
		width: 32px;
		height: 32px;
		border: 1px solid #ffffff;
	}

	.isStart {
		background-color: #52b396;
	}

	.isEnd {
		background-color: #e6365b;
	}

	.isVisited {
		animation: visitedAnimation 1s linear forwards;
	}

	@keyframes visitedAnimation {
		from {
			background-color: #646cff;
		}

		to {
			background-color: #a3c7fa;
		}
	}
</style>
