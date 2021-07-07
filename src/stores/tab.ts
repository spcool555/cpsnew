import { createNumberSessionStore } from './utils';
import { writable } from 'svelte/store';

// current tab store
export let currentTab = createNumberSessionStore('tab', 0);

// about tab show store
export let aboutTab = writable(false);
