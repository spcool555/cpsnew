<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import DisplayArea from '../shared/displayArea.svelte';

	// requied props
	export let testTime: number;
	export let onEnd: Function = () => {};

	// cps count
	let cps = 0;
	let clicks = 0;

	// timer stuff
	let remTime = 0;
	let updateDelay: number = getContext('updateDelay');
	let startTime: number;
	let timerEnded = true;
	let remTimeInterval: NodeJS.Timeout;
	let timer: NodeJS.Timeout;

	// get the remaining time fuction
	const updateRemTime = () => {
		remTime = !timerEnded ? testTime - (Date.now() - startTime) / 1000 : 0;
	};

	// start timer function
	const startTimer = () => {
		// some resets
		timerEnded = false;
		clicks = 0;

		// start a new remTimeInterval & timeout
		remTimeInterval = setInterval(updateRemTime, updateDelay);
		startTime = Date.now();

		timer = setTimeout(endTimer, testTime * 1000);
	};

	// end timer function
	const endTimer = () => {
		timerEnded = true;

		// clear remTimeInterval to prevent memory issues?
		clearInterval(remTimeInterval);

		// update rem time & cps to make sure everything is right
		updateRemTime();
		cps = clicks / testTime;

		onEnd(cps);
	};

	// reactive values
	$: cps = clicks / (testTime - remTime) || 0;

	// on:click handler
	export const onClick = () => {
		// start the timer if is not started
		if (timerEnded) {
			startTimer();
		}
		// append a click
		clicks++;
	};

	// Result display config
	let items = [
		{ title: 'clicks/s', color: '#bc001c' },
		{ title: 'clicks', color: '#73950F' },
		{ title: 'remTime', color: '#004077' }
	];

	// clear intervals on destroy
	onDestroy(() => {
		clearInterval(remTimeInterval);
		clearTimeout(timer);
	});
</script>

<DisplayArea {items} vals={[cps, clicks, remTime]} />
