<script lang="ts">
	import { currentTab, aboutTab } from './../stores/tab';
	import InTimeTest from './../lib/inTimeTest.svelte';
	import TimedTest from './../lib/timedTest.svelte';
	import TestArea from './subComponents/testArea.svelte';
	import ResultDisplay from './subComponents/resultDisplay.svelte';
	import About from './about.svelte';

	let test: TimedTest | InTimeTest;
	let popUpShown = false;
	let cps = 0;
	let mouseBtn: 'right' | 'left' = 'left';

	// mouse right clicks handler
	const onRClick = () => {
		if (mouseBtn === 'right') {
			test.onClick();
		}
	};

	// mouse left clicks handler
	const onLClick = () => {
		if (mouseBtn === 'left') {
			test.onClick();
		}
	};

	// change test mouse btn
	const changeBtn = (ev: InputEvent) => {
		if ((ev.target as HTMLInputElement).checked) {
			mouseBtn = 'right';
		} else {
			mouseBtn = 'left';
		}
	};

	// TimedTest onEnd functions
	const togglePopUp = (_cps: number) => {
		cps = _cps;
		popUpShown = true;
	};

	// close the popUp when changing tabs
	$: {
		$currentTab;
		popUpShown = false;
		$aboutTab = false;
	}
</script>

<div class="display">
	{#key $currentTab}
		{#if $currentTab != 0}
			<TimedTest testTime={Number($currentTab)} onEnd={togglePopUp} bind:this={test} />
		{:else}
			<InTimeTest bind:this={test} />
		{/if}
	{/key}
</div>
<div class="test-area">
	<TestArea on:click={onLClick} on:contextmenu={onRClick} on:change={changeBtn} />
</div>
{#if $currentTab && popUpShown}
	<ResultDisplay bind:shown={popUpShown} {cps} />
{/if}
{#if $aboutTab}
	<About />
{/if}

<style>
	:global(main) {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(9, 1fr);
		height: 100%;
		background: #242a2c;
	}
	.display {
		grid-row: 1/4;
		grid-column: 1/5;
	}
	:global(.test-area) {
		grid-row: 4/10;
		grid-column: 1/5;
	}
</style>
