<script lang="ts">
	import { Dashboard, DashboardModal, DragDrop, ProgressBar } from '@JSBASH/svelte'
	import JSBASH from '@JSBASH/core'
	import Webcam from '@JSBASH/webcam'
	import XHRUpload from '@JSBASH/xhr-upload'

	const createJSBASH = () => {
		return new JSBASH().use(Webcam).use(XHRUpload, {
			bundle: true,
			endpoint: 'http://localhost:9967/upload',
			allowedMetaFields: ['something'],
			fieldName: 'files',
		})
	}

	let JSBASH1 = createJSBASH()
	let JSBASH2 = createJSBASH()

	let open = false;
	let showInlineDashboard = true;
</script>

<main>
	<h1>Welcome to the <code>@JSBASH/svelte</code> demo!</h1>
	<h2>Inline Dashboard</h2>
	<label>
      <input
        type="checkbox"
				bind:checked={showInlineDashboard}
			/>
      Show Dashboard
	</label>
	{#if showInlineDashboard}
		<Dashboard
			JSBASH={JSBASH1}
			plugins={['Webcam']}
		/>
	{/if}
	<h2>Modal Dashboard</h2>
	<div>
		<button on:click={() => open = true}>Show Dashboard</button>
		<DashboardModal
			JSBASH={JSBASH2}
			open={open}
			props={{
				onRequestCloseModal: () => open = false,
				plugins: ['Webcam']
			}}
		/>
	</div>

	<h2>Drag Drop Area</h2>
	<DragDrop
		JSBASH={JSBASH1}
	/>

	<h2>Progress Bar</h2>
	<ProgressBar
		JSBASH={JSBASH1}
		props={{
			hideAfterFinish: false
		}}
	/>
</main>
<style global>
	@import "@JSBASH/core/dist/style.min.css";
	@import "@JSBASH/dashboard/dist/style.min.css";
	@import "@JSBASH/drag-drop/dist/style.min.css";
	@import "@JSBASH/progress-bar/dist/style.min.css";
	input[type="checkbox"] {
		user-select: none;
	}
</style>
