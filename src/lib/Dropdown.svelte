<script>
	import { clickOutside } from '../utils/clickOutside'

	export let items
	export let currentAlgorithm

	$: isDropOpen = false

	const toggleDropDown = () => {
		isDropOpen = !isDropOpen
	}
	const closeDropDown = () => {
		isDropOpen = false
	}

	// drop content item click
	const setCurrentAlgorithm = (e) => {
		currentAlgorithm = e.target.textContent
		closeDropDown()
	}
</script>

<li class="dropdown" use:clickOutside on:click_outside={closeDropDown}>
	<a
		href="#"
		class="dropbtn"
		class:active={isDropOpen}
		on:click={toggleDropDown}>Algorithm</a
	>
	{#if isDropOpen}
		<div class="dropdown-content">
			{#each items as item, idx}
				<a href="#" on:click={setCurrentAlgorithm}>{item}</a>
			{/each}
		</div>
	{/if}
</li>

<style>
	li {
		float: left;
	}

	li a {
		display: inline-block;
		color: white;
		text-align: center;
		padding: 0.6em 1.2em;
		text-decoration: none;
		transition: background-color 0.25s;
	}

	li a:hover,
	.dropdown:hover .dropbtn {
		background-color: #646cff;
	}

	.active {
		color: #242424;
		background-color: #a3c7fa !important;
	}

	li.dropdown {
		display: inline-block;
	}

	.dropdown-content {
		display: block;
		position: absolute;
		background-color: #f9f9f9;
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 1;
		border-radius: 8px;
	}

	.dropdown-content a {
		color: black;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
		text-align: left;
		border-radius: 8px;
	}

	.dropdown-content a:hover {
		border-radius: 8px;
		background-color: #f1f1f1;
	}
</style>
