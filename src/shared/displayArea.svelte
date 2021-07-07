<script lang="ts">
	export let items: { title: string; color: string }[];
	export let vals: number[];
</script>

{#each items as { title, color }, i}
	<div class="card" style="background: {color}">
		{title}:
		<p>{vals[i].toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
	</div>
{/each}

<style>
	:global(.display) {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	.card {
		color: #f4f1ec;
		font-size: 1.5em;
		width: 7em;
		padding: 0.7em 0;
		text-align: center;
		border-radius: 10px;
		margin: 0 0.5em;
	}
	@media (max-width: 620px) {
		:global(.display) {
			flex-direction: column;
			justify-content: space-evenly;
			margin: 0 2.5em;
		}
		.card {
			width: 100%;
			padding: 0.5em 0;
		}
		p {
			display: inline;
		}
	}
</style>
