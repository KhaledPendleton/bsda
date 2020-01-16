export function stackable(node) {
    let zIndex;

    function onClick(event) {
        const data = { detail: { target: node } }
        const stack = new CustomEvent('stack', data);
        node.dispatchEvent(stack);
    }

    node.addEventListener('click', onClick);

    return {
        destroy: () => (node.removeEventListener('click', onClick))
    }
}