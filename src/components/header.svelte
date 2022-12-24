<script lang="ts">
	import { currentTab } from './../stores/tab';
	export let navBar = false;

	let title: string;
	let showNav = false;

	$: {
		// change title when current tab changes
		title = $currentTab != 0 ? `${Number($currentTab)} sec CPS Test` : 'In-Time CPS Test';
		// close the nav when current tab or navBar changes
		showNav = navBar ? false : false;
	}
</script>

<div class="header-bar">
	<div class="brand">
		<a href="/">CPS Tester</a>
	</div>
	<h1 class="title">{title}</h1>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a
		role="button"
		class="navbar-toggle"
		on:click={() => (showNav = !showNav)}
		aria-label="toggle navBar"
	>
		<span class="bar" />
		<span class="bar" />
		<span class="bar" />
	</a>
</div>
{#if navBar}
	<nav class="navbar" class:active={showNav}>
		<slot />
	</nav>
{/if}

<style>
	.header-bar {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		align-items: center;
		height: 100%;
		color: #f4f1ec;
		background: #1a1f21;
	}
	.brand {
		text-align: center;
		grid-column: 1/2;
		font-size: 1.75em;
	}
	.brand a {
		text-decoration: none;
		padding-left: 0.2em;
	}
	.title {
		grid-column: 2/6;
		justify-self: center;
		font-size: 1.4em;
	}

	.navbar {
		position: absolute;
		display: none;
		width: 100%;
		z-index: 1;
	}
	.navbar-toggle {
		display: none;
		grid-column: 5/6;
		justify-self: center;
		flex-direction: column;
		justify-content: space-between;
		height: 1.5em;
		width: 2em;
	}
	.bar {
		width: 100%;
		height: 3px;
		background: #f4f1ec;
	}

	@media (max-width: 620px) {
		.brand {
			font-size: 1.5em;
			grid-column: 1/3;
		}
		.title {
			grid-column: 3/5;
			font-size: 1.1em;
			justify-self: start;
			margin-left: -0.5em;
		}
		.navbar-toggle {
			display: flex;
		}
		.navbar.active {
			display: block;
		}
	}
</style>
