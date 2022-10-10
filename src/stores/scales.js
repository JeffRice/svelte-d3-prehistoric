import { writable, readable } from 'svelte/store';

export const timeScale = writable();
export const sizeTotalYScale = writable();
export const sizeTotalRScale = writable();
export const sizeShareRScale = writable();
export const attributionScoreScale = writable();

export const centroidScale = writable();

export const polarizationScale = writable();

export const scaleFactor = readable(window.devicePixelRatio || 1);
