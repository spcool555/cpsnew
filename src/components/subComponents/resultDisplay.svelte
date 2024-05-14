<script lang="ts">
	import PopUp from './../../shared/popUp.svelte';
	export let cps: number;
	export let shown = false;

	// activate the retry btn after 500ms
	const btnEnabler = (node: HTMLButtonElement) => {
		// set enable button timeout
		const enableTimeout = setTimeout(() => {
			node.disabled = false;
		}, 800);
		return {
			destroy: () => {
				// clear the enableTimeout on Destroy
				clearTimeout(enableTimeout);
			}
		};
	};
</script>

<PopUp bind:shown>
	<div class="result" slot="display" on:contextmenu|preventDefault>
		<p>Your CPS: {cps.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
		<button class="retry-btn" use:btnEnabler on:click={() => (shown = false)} disabled>Retry</button
		>
	</div>
</PopUp>

<style>
	.result {
		display: flex;
		justify-content: center;
		flex-direction: column;
		text-align: center;
		height: 100%;
	}
	.retry-btn {
		background: #002b8e;
		padding: 1em 5em;
		margin: 5em auto;
		border: none;
		color: #f4f1ec;
	}
	.retry-btn:hover {
		cursor: pointer;
		background: #001c86;
	}
	p {
		font-size: 2em;
	}
</style>
