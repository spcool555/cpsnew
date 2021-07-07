import { writable } from 'svelte/store';

// a number type tha allows 0 "" "0" ...
type num = number | `${number | ''}`;

// session store (needed to not change data when reloading...)
// tutorial: https://www.youtube.com/watch?v=a65aPLz18IM [edited]
export const createNumberSessionStore = (name: string, iVal: num) => {
	// get persist from sesstionStorage
	const persist = sessionStorage.getItem(name);

	// set store value to the persist if it is !NaN or to initial value
	let val = !isNaN(persist as any) ? Math.abs(JSON.parse(persist)) : Math.abs(iVal as number);

	// create the store
	const store = writable(val, () => {
		return store.subscribe((val: num) => {
			// update the sessionStorage when store updates
			sessionStorage.setItem(name, JSON.stringify(val));
		});
	});
	return store;
};
