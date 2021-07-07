<script lang="ts">
	import { onDestroy } from 'svelte';
	import DisplayArea from '../shared/displayArea.svelte';

	// cps count
	let cps = 0;
	let best = 0;
	let clicks = 0;
	let cp1s = 0; // cliks every 1 second

	// "each 1s cps counter"
	let timerEnded = true;
	const startTimer = () => {
		clicks = 0;
		setTimeout(endTimer, 1000);
	};
	const endTimer = () => {
		cp1s = clicks;
		if (!timerEnded) {
			startTimer();
		}
	};

	// on:click handler
	export const onClick = () => {
		// append a new click to cps count
		cps++;
		clicks++;

		// set a timeout of 1s to remove the click after a 1s
		setTimeout(() => cps--, 1000);

		// start the "each 1s counter"
		if (timerEnded) {
			timerEnded = false;
			startTimer();
		}
	};

	// reactive values
	$: best = best < cps ? cps : best;

	// Result display config
	let items = [
		{ title: 'cps', color: '#bc001c' },
		{ title: 'clicks/s', color: '#004077' },
		{ title: 'best', color: '#B87D00' }
	];

	// clear intervals on destroy
	onDestroy(() => {
		timerEnded = true;
	});
</script>

<DisplayArea {items} vals={[cps, cp1s, best]} />
