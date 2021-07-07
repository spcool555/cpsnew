<script lang="ts">
	export let shown = false;
	export let bg = '#101516';
</script>

<div class="pop-up" class:active={shown} style="background: {bg};">
	<div class="header">
		<!-- svelte-ignore a11y-missing-attribute -->
		<a role="button" class="close-btn" on:click={() => (shown = false)}>X</a>
	</div>
	<slot name="display" />
</div>

<style>
	.pop-up {
		grid-row: 1/10;
		grid-column: 1/5;
		position: relative;
		display: none;
		margin: 0.5em;
		color: #f4f1ec;
		border: 2px solid #ddd;
		/* user-select: none;  */
	}
	.header {
		display: flex;
		justify-content: flex-end;
	}
	.close-btn {
		font-size: 1.5em;
		color: red;
		margin: 0.2em;
		font-weight: bold;
	}
	.active {
		display: block;
	}
</style>
