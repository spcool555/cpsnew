<button on:click on:contextmenu|preventDefault>Click Here!</button>
<div class="change-btn">
	<input id="ms-btn-toggle" type="checkbox" on:change />
	<label role="button" for="ms-btn-toggle">
		<img src="./assets/images/mlc-min.png" alt="MB" width="28" height="52" />
	</label>
</div>

<style>
	:global(.test-area) {
		display: grid;
		grid-template-columns: 10fr 2fr;
		height: 100%;
	}
	button {
		background: #383f43;
		border: #3d4448 solid 2em;
		border-radius: 20px;
		margin: 2.5% 20%;
		margin-right: 0%;
		color: #f4f1ec;
	}
	button:active {
		background: #3a4245;
	}
	.change-btn {
		justify-self: center;
		display: block;
	}
	input {
		display: none;
	}
	label {
		margin-top: 3em;
		display: block;
	}
	input:checked + label img {
		transform: rotateY(180deg);
	}

	@media (max-width: 1080px) {
		:global(.test-area) {
			grid-template-columns: 10fr 1fr;
		}
		button {
			margin-left: 10%;
		}
	}
</style>
