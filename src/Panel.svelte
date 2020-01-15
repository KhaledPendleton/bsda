<script>
	import { pannable } from './pannable.js';
	import { spring } from 'svelte/motion';

	const coords = spring({ x: 0, y: 0 }, {
		stiffness: 0.2,
		damping: 0.4
	});

	function onPanstart() {
		coords.stiffness = coords.damping = 1;
	}

	function onPanmove(event) {
		coords.update($coords => ({
			x: $coords.x + event.detail.dx,
			y: $coords.y + event.detail.dy
		}));
	}

	function onPanend(event) {
		coords.stiffness = 0.2;
		coords.damping = 0.4;
    }
    
    $: style = `transform: translate(${$coords.x}px, ${$coords.y}px)`;
</script>

<style>
	.panel {
		--width: 100px;
		--height: 100px;
		width: var(--width);
        height: var(--height);
        position: absolute;
		left: calc(50% - var(--width) / 2);
		top: calc(50% - var(--height) / 2);
		border-radius: 4px;
		background-color: #ff3e00;
		cursor: move;
	}
</style>

<div class="panel"
	use:pannable
	on:panstart={onPanstart}
	on:panmove={onPanmove}
	on:panend={onPanend}
	{style}
></div>