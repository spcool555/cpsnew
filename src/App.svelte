<script lang="ts">
	import NavBar from './components/navBar.svelte';
	import MainTab from './components/mainTab.svelte';
	import Footer from './components/footer.svelte';
	import Header from './components/header.svelte';
	import { setContext } from 'svelte';

	let windowWidth: number;
	setContext('updateDelay', $$props.updateDelay);
</script>

<svelte:window bind:innerWidth={windowWidth} />

<header>
	<Header navBar={windowWidth < 620}>
		<NavBar />
	</Header>
</header>
{#if windowWidth > 620}
	<nav>
		<NavBar dropDown={false} />
	</nav>
{/if}
<main>
	<MainTab />
</main>
<footer>
	<Footer />
</footer>

<style global>
	* {
		margin: 0;
		padding: 0;
		-webkit-tap-highlight-color: transparent;
	}
	*[role='button'],
	button {
		user-select: none;
		cursor: pointer;
	}
	a {
		color: inherit;
	}
	body {
		height: 100vh;
		display: grid;
		grid-gap: 1px;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(11, 1fr);
		background: #202529;
	}
	header {
		grid-column: 1/6;
		grid-row: 1/2;
	}
	nav {
		grid-column: 1/2;
		grid-row: 2/11;
	}
	main {
		position: relative;
		grid-column: 2/6;
		grid-row: 2/11;
	}
	footer {
		grid-column: 1/6;
		grid-row: 11/12;
	}
	@media (max-width: 620px) {
		main {
			grid-column: 1/6;
		}
	}
</style>
