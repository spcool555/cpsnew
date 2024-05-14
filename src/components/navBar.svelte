<script lang="ts">
	import { currentTab } from './../stores/tab';
	export let dropDown = true;

	let showDropDown = false;
	let preSetTests = [1, 5, 10, 30, 60, 100];
	let testValue: number;

	// move timed tests outside drop down if !dropDown
	const moveTests = (node: HTMLElement, move: boolean) => {
		if (!move) {
			const nav = node.parentNode.parentNode;
			const children = [...node.children];

			for (const child of children) {
				nav.appendChild(child);
			}
			nav.removeChild(node.parentNode);
		}
	};

	// switch tab calc func
	const calcTab = (val: number | string) => {
		// switch test value type
		let nVal = typeof val === 'number' ? String(val) : Number(val);
		return ($currentTab !== val ? val : nVal) ?? calcTab(0);
	};

	// close the dropdown if current tab changed
	$: {
		$currentTab;
		showDropDown = false;
	}
</script>

<ul class="navbar-nav">
	<!-- svelte-ignore a11y-missing-attribute -->
	<li><a role="button" on:click={() => ($currentTab = calcTab(0))}>In-Time Test</a></li>
	<li class="drop-down">
		<!-- svelte-ignore a11y-missing-attribute -->
		<a role="button" class="drop-down-toggle" on:click={() => (showDropDown = !showDropDown)}
			>Timed Tests</a
		>
		<ul class="drop-down-menu" use:moveTests={dropDown} class:active={showDropDown}>
			<!-- svelte-ignore a11y-missing-attribute -->
			{#each preSetTests as val}
				<li><a role="button" on:click={() => ($currentTab = calcTab(val))}>{val} sec test</a></li>
			{/each}
			<li class="custom-test">
				<label for="ct">Custom Test</label>
				<form on:submit|preventDefault={() => ($currentTab = calcTab(testValue))}>
					<input id="ct" min="1" type="number" bind:value={testValue} max="2147483" />
					<br />
					<button type="submit">Go</button>
				</form>
			</li>
		</ul>
	</li>
</ul>

<style>
	.navbar-nav {
		display: flex;
		flex-direction: column;
		height: 100%;
		color: #f4f1ec;
		background: #353b3f;
		justify-content: space-evenly;
		text-align: center;
	}
	.navbar-nav li {
		height: 100%;
		list-style: none;
	}
	a {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #586267;
		font-size: 1.125em;
	}
	a:hover {
		background: #495257;
	}
	.custom-test {
		padding: 1em 0;
		background: #586267;
	}
	form {
		margin: 0 5%;
	}
	input {
		text-align: center;
		border: none;
		width: 100%;
		height: 1.5em;
		margin: 0.2em 0;
		background: #f4f1ec;
	}
	input:focus-visible {
		outline: none;
	}
	button {
		width: 100%;
		background: #f4f1ec;
		border: #f4f1ec solid 2px;
	}

	@media (max-width: 620px) {
		.navbar-nav {
			background: #1a1f21;
			padding-bottom: 0.2em;
		}
		a {
			padding: 2% 0;
		}
		.navbar-nav li {
			margin: 0.25em 0;
		}
		.navbar-nav > li {
			margin: 0.125em 1em;
		}
		.drop-down-menu {
			display: none;
		}
		.drop-down-menu.active {
			display: block;
		}
		.drop-down-toggle {
			padding: 2% 0;
			margin-bottom: 0.2em;
			display: block;
		}
	}
</style>
