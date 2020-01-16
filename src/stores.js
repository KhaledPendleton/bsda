import { writable } from 'svelte/store';

export const openPanels = writable([]);
export const stackLevel = writable(0);