export function pannable(node) {
	let x;
    let y;

	function onMousedown(event) {
		x = event.clientX;
        y = event.clientY;
        
        const data = { detail: { x, y } };
        const panstart = new CustomEvent('panstart', data);

        node.dispatchEvent(panstart);
		window.addEventListener('mousemove', onMousemove);
		window.addEventListener('mouseup', onMouseup);
	}

	function onMousemove(event) {
		const dx = event.clientX - x;
		const dy = event.clientY - y;
		x = event.clientX;
        y = event.clientY;
        
        const data = { detail: { x, y, dx, dy } };
        const panmove = new CustomEvent('panmove', data);

		node.dispatchEvent(panmove);
	}

	function onMouseup(event) {
		x = event.clientX;
		y = event.clientY;

        const data = { detail: { x, y } };
        const panend = new CustomEvent('panend', data);

        node.dispatchEvent(panend);
		window.removeEventListener('mousemove', onMousemove);
		window.removeEventListener('mouseup', onMouseup);
	}

	node.addEventListener('mousedown', onMousedown);

	return {
		destroy() {
			node.removeEventListener('mousedown', onMousedown);
		}
	};
}