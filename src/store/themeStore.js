import { writable } from 'svelte/store'

export const themeStore = writable('light')

export const toggleTheme = () => {
	themeStore.update((currentTheme) =>
		currentTheme === 'light' ? 'dark' : 'light'
	)
}
