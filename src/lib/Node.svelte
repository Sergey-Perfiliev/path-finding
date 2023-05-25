<script>
	export let isStart
	export let isEnd
	export let isShortest
	export let isVisited
</script>

<div class="node" class:isStart class:isEnd class:isVisited class:isShortest />

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
