<script lang="ts">
	import PopUp from './../shared/popUp.svelte';
	import { aboutTab } from './../stores/tab';

	// some response params types
	type response = {
		login: string;
		html_url: string;
		avatar_url: string;
	};

	// github contributors promise
	async function getContributors() {
		const res = await fetch(`https://api.github.com/repos/rynidja/cps-tester/contributors`);
		const contributors: response[] = await res.json();

		if (res.ok) {
			return contributors;
		} else {
			throw new Error();
		}
	}
</script>

<PopUp bind:shown={$aboutTab} bg="#080c0d">
	<div class="about-Pu" slot="display">
		<section class="about">
			<h3>About :</h3>
			<p>
				The main idea that led to this website is the "In-Time CPS Test" which we couldn't find in
				other websites. So we decided to make it and get some web developement experience with it.
			</p>
		</section>
		<section class="dev-stuff">
			<h3>Developement :</h3>
			<p>
				The project started as a <a href="https://python.org">python</a> app written with
				<a href="https://github.com/hoffstadt/DearPyGui"> dearpygui</a>
				then as a dynamic website written with <a href="https://flask.palletsprojects.com">flask</a>
				and <a href="https://brython.info">brython</a>, basicly it was meant to be fully written in
				<a href="https://python.org">python</a>
				but considering the slowness of brython and the lack of free dynamic websites hosting services
				we decided to continue as a static website with pure html and javascript. After a couple of months
				we decided to do it using <a href="https://svelte.dev">svelte</a> and
				<a href="https://www.typescriptlang.org/">typescript</a> and here it is!
			</p>
		</section>
		<section class="faqs">
			<h3>FAQs :</h3>
			<p class="q">There is so may cps testing tools, so why did u create this app</p>
			<p class="a">As we said above, there isn't any in time cps testers in the web.</p>
			<br />
			<p class="q">What is the max timed cps test</p>
			<p class="a">It is: ((2^31 -1) /1000) s or 2,147,483 seconds or about 24.8 days 😲!</p>
			<br />
		</section>
		<section class="contributors-list">
			<h3>Contributors :</h3>
			<div class="contributors">
				{#await getContributors()}
					Loading contributors...
				{:then contributors}
					{#each contributors as contributor}
						<a href={contributor.html_url}>
							<img
								class="c-img"
								src={contributor.avatar_url}
								alt={contributor.login}
								width="52"
								height="52"
							/>
						</a>
					{/each}
				{:catch}
					Failed to load contributors.
				{/await}
			</div>
		</section>
	</div>
</PopUp>

<style>
	section {
		margin: 1em;
		font-size: 1.05rem;
		text-align: center;
	}
	h3 {
		margin-bottom: 0.5em;
	}
	.q::before {
		content: 'Q: ';
		font-size: large;
	}
	.q::after {
		content: ' ?';
		font-size: large;
	}
	.a::before {
		content: 'A: ';
		font-size: large;
	}
	.contributors {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.contributors a {
		margin: 0.2rem;
	}
	.c-img {
		border-radius: 50%;
	}
	@media (max-width: 635px) {
		.dev-stuff {
			display: none;
		}
	}
</style>
