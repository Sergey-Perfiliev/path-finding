import { writable } from 'svelte/store'

export const themeStore = writable('dark')

export const toggleTheme = () => {
	themeStore.update((currentTheme) =>
		currentTheme === 'light' ? 'dark' : 'light'
	)
}
