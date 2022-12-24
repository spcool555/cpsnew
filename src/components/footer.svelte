<script lang="ts">
	import { aboutTab } from './../stores/tab';
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a role="button" on:click={() => ($aboutTab = !$aboutTab)}>About</a>
<p>
	Created by <a href="https://github.com/rynidja">rynidja</a> &copy; {new Date().getFullYear()}
</p>
<a role="button" href="https://github.com/rynidja/cps-tester" class="github">
	<img src="./assets/images/GitHub-min.png" alt="github" width="32" height="32"/>
</a>

<style>
	:global(footer) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #f4f1ec;
		padding: 0 5%;
		background: #17191a;
	}
	.github {
		display: flex;
		align-items: center;
	}
</style>
