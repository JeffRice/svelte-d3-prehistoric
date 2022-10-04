import { writable } from 'svelte/store';

export const controlsWrapper = writable();
export const drawWrapper = writable();

export const fossilDatapoints = writable({"cretaceous": [], "jurassic": [], "triassic": [],
                                         "originalcretaceous": [], "originaljurassic": [], "originaltriassic": [], });



export const cretaceous = writable();
export const jurassic = writable();
export const triassic = writable();

export const originalCretaceous = writable();
export const originalJurassic = writable();
export const originalTriassic = writable();

