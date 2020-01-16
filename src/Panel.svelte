<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { spring } from 'svelte/motion';
    
    import { stackLevel } from './stores.js';
    import { stackable } from './stackable.js';
    import { pannable } from './pannable.js';

    export let text;

    let zIndex;

    function getCurrentStackLevel() {
        return $stackLevel;
    }

    function getNextStackLevel() {
        stackLevel.set($stackLevel + 1);
        return $stackLevel;
    }

    const dispatch = createEventDispatcher();
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

    function onStack(event) {
        const { target } = event.detail;
        const style = window.getComputedStyle(target);

        if (parseInt(style.zIndex) !== getCurrentStackLevel()) {
            zIndex = getNextStackLevel();
        }
    }

    function onCloseClick(event) {
        dispatch('close', {});
    }

    onMount(() => {
        zIndex = getNextStackLevel();
    });
    
    $: style = `
        transform: translate(${$coords.x}px, ${$coords.y}px);
        z-index: ${zIndex}`;
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
    
    .panel:nth-child(2) { background-color: blue; }
    .panel:nth-child(3) { background-color: green; }
    .panel:nth-child(4) { background-color: purple; }
    .panel:nth-child(5) { background-color: silver; }
</style>

<div class="panel"
    use:pannable
    use:stackable
	on:panstart={onPanstart}
	on:panmove={onPanmove}
    on:panend={onPanend}
    on:stack={onStack}
	{style}
>
    <button on:click={onCloseClick}>close</button>
    <p>{text}</p>
</div>