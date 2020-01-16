<script>
	import { openPanels, panelZIndex } from './stores.js';

	import Panel from './Panel.svelte';

	let uid = 1;

	let panels = [
		{ id: uid++ },
		{ id: uid++ },
		{ id: uid++ },
		{ id: uid++ },
		{ id: uid++ }
	];

	function checkIsOpen(panel) {
		return ($openPanels.filter(p => p === panel).length > 0);
	}

	function open(panel) {
		if (!checkIsOpen(panel)) {
			openPanels.set($openPanels.concat(panel));
		}
	}

	function close(panel) {
		openPanels.update(op => op.filter(p => p !== panel));
	}
</script>

{#each $openPanels as panel (panel.id)}
	<Panel on:close={ () => close(panel) } text={panel.id} />
{/each}

{#each panels as panel (panel.id)}
	<button on:click={() => open(panel)}>open {panel.id}</button>
{/each}