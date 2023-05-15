<script>
	let options = ['dijkstra']
	let method
</script>

<header>
	<h1>Path finding</h1>
	<select
		bind:value={method}
		name="path-finding_method"
		id="path-fiding_method"
	>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
	<button>search</button>
	<button>clear board</button>
</header>

<section>
	<div class="board">Board</div>
</section>
