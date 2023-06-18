<script>
	import { clickOutside } from '../utils/clickOutside'

	export let items
	export let currentAlgorithm

	let isDropOpen = false

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
		class="dropdown__button"
		class:active={isDropOpen}
		on:click={toggleDropDown}>Algorithm</a
	>
	{#if isDropOpen}
		<div class="dropdown__content">
			{#each items as item (item)}
				<a href="#" on:click={setCurrentAlgorithm}>{item}</a>
			{/each}
		</div>
	{/if}
</li>

<style lang="scss">
	.dropdown {
		float: left;

		& a {
			display: inline-block;
			color: white;
			text-align: center;
			padding: 0.6em 1.2em;
			text-decoration: none;
			transition: background-color 0.25s;
		}
	}

	.dropdown__button {
		display: inline-block;

		&:hover {
			background-color: var(--color-primary);
		}

		&.active {
			color: var(--color-dark);
			background-color: var(--color-secondary) !important;
		}
	}

	.dropdown__content {
		display: block;
		position: absolute;
		background-color: #f9f9f9;
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 1;
		border-radius: 8px;

		& a {
			color: black;
			padding: 12px 16px;
			text-decoration: none;
			display: block;
			text-align: left;
			border-radius: 8px;

			&:hover {
				border-radius: 8px;
				color: var(--color-light);
				background-color: var(--color-primary);
			}
		}
	}
</style>
