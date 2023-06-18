<script>
	import { themeStore, toggleTheme } from '../store/themeStore'
	import Dropdown from './Dropdown.svelte'

	$: {
		document.documentElement.setAttribute('data-theme', $themeStore)
	}

	export let currentAlgorithm
	export let items
	export let visualize
	export let clearBoard
	export let clearVisualization
</script>

<div class="header__wrapper">
	<header class="header">
		<h1 class="header__logo">Path finding</h1>
		<ul class="header__algo-list">
			<Dropdown bind:currentAlgorithm {items} />
		</ul>
		<div class="header__buttons">
			<button on:click={visualize} class="button button--primary"
				>Find path</button
			>
			<button class="button button--secondary" on:click={clearBoard}
				>clear board</button
			>
			<button class="button button--secondary" on:click={clearVisualization}
				>clear visualization</button
			>
			<button class="button button--theme" on:click={toggleTheme}>
				{$themeStore === 'dark' ? 'light' : 'dark'}
			</button>
		</div>
	</header>
</div>

<style lang="scss">
	.header__wrapper {
		position: relative;

		display: flex;
		flex: 0 1 auto;
		padding: 1rem;
	}

	.header {
		display: flex;
		align-items: center;
		margin: 0 auto;

		& > *:not(:last-child) {
			margin-right: 1rem;
		}

		&__algo-list {
			list-style-type: none;
			margin: 0;
			padding: 0;
			overflow: hidden;
			background-color: var(--bg-color-secondary);
			border-radius: 8px;
		}

		&__logo {
			position: absolute;
			left: 2rem;
			font-size: 2rem;
			color: var(--font-color);
		}
	}

	.header__buttons {
		display: flex;
		align-items: center;

		& > *:not(:last-child) {
			margin-right: 1rem;
		}
	}

	.button {
		&--primary {
			color: var(--color-dark);
			background-color: var(--color-secondary);
		}

		&--secondary {
			color: var(--font-color-secondary);
			background-color: var(--bg-color-secondary);
		}

		&--theme {
			width: 100px;
			color: var(--color-theme);
		}
	}
</style>
